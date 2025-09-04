import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, tenantName } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create tenant and user in a transaction
    const result = await this.prisma.$transaction(async (tx) => {
      // Create tenant
      const tenant = await tx.tenant.create({
        data: {
          name: tenantName,
        },
      });

      // Create user as OWNER of the tenant
      const user = await tx.user.create({
        data: {
          email,
          hashedPassword,
          role: 'OWNER',
          tenantId: tenant.id,
        },
        include: {
          tenant: true,
        },
      });

      return user;
    });

    const payload = { userId: result.id, tenantId: result.tenantId };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: result.id,
        email: result.email,
        role: result.role,
        tenant: result.tenant,
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user with tenant
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        tenant: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, tenantId: user.tenantId };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenant: user.tenant,
      },
      token,
    };
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        tenant: true,
      },
    });
  }
}
