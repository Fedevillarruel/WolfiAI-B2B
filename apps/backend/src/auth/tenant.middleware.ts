import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Only apply tenant isolation for authenticated requests
    const user = req.user as any;
    if (user?.id && user?.tenantId) {
      // Set PostgreSQL session variables for Row Level Security
      await this.prisma.$executeRaw`
        SELECT 
          set_config('app.current_user_id', ${user.id}, false),
          set_config('app.current_tenant_id', ${user.tenantId}, false)
      `;
    }
    next();
  }
}
