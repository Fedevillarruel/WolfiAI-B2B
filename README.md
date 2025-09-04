# WolfiAI B2B - Copiloto Financiero para PyMEs

Este es un proyecto de aplicación SaaS multi-tenant desarrollado con NestJS (backend) y Next.js (frontend), diseñado para PyMEs argentinas.

## 🚀 Características Principales

- **Multi-Tenant Architecture**: Aislamiento completo de datos entre empresas
- **Row Level Security (RLS)**: Seguridad a nivel de base de datos
- **Autenticación JWT**: Sistema seguro de autenticación
- **Interfaz Moderna**: UI responsiva con Tailwind CSS
- **Arquitectura Escalable**: Preparado para despliegue híbrido (Cloud/On-Premise)

## 🛠️ Stack Tecnológico

### Backend
- **NestJS** - Framework de Node.js
- **Prisma** - ORM con TypeScript
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcrypt** - Hashing de contraseñas

### Frontend
- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **React Hot Toast** - Notificaciones
- **Axios** - Cliente HTTP

### DevOps
- **Docker & Docker Compose** - Contenedorización
- **npm workspaces** - Gestión de monorepo

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- Docker y Docker Compose
- Git

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Fedevillarruel/WolfiAI-B2B.git
   cd WolfiAI-B2B
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Levantar el entorno con Docker**
   ```bash
   docker-compose up -d
   ```

4. **Ejecutar migraciones (primera vez)**
   ```bash
   npm run db:migrate
   ```

5. **Acceder a la aplicación**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Base de datos: localhost:5432

## 📁 Estructura del Proyecto

```
wolfiai-b2b/
├── apps/
│   ├── backend/          # API NestJS
│   │   ├── src/
│   │   │   ├── auth/     # Módulo de autenticación
│   │   │   ├── prisma/   # Servicio de Prisma
│   │   │   └── types/    # Tipos TypeScript
│   │   ├── prisma/       # Schema y migraciones
│   │   └── Dockerfile
│   └── frontend/         # App Next.js
│       ├── src/
│       │   ├── app/      # Pages (App Router)
│       │   ├── components/ # Componentes React
│       │   ├── contexts/ # Contextos React
│       │   ├── lib/      # Utilidades
│       │   └── types/    # Tipos TypeScript
│       └── Dockerfile
├── packages/
│   └── tsconfig/         # Configuración TypeScript compartida
├── docker-compose.yml
└── package.json
```

## 🔐 Seguridad Multi-Tenant

El sistema implementa Row Level Security (RLS) a nivel de PostgreSQL:

- **Aislamiento de datos**: Cada tenant solo puede acceder a sus propios datos
- **Políticas de seguridad**: Configuradas automáticamente en la base de datos
- **Variables de sesión**: Se establecen por request para filtrar consultas

### Flujo de Autenticación

1. Usuario se registra → Se crea Tenant y User
2. Usuario inicia sesión → Se genera JWT con `userId` y `tenantId`
3. Cada request → Middleware establece variables de sesión PostgreSQL
4. Consultas → RLS filtra automáticamente por tenant

## 🗄️ Base de Datos

### Modelos Principales

- **Tenant**: Representa una empresa/organización
- **User**: Usuarios del sistema, asociados a un tenant
- **Role**: OWNER, ADMIN, USER

### Comandos Útiles

```bash
# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:migrate

# Abrir Prisma Studio
npm run db:studio

# Reset de la base de datos
npx prisma migrate reset
```

## 🚢 Despliegue

### Desarrollo
```bash
# Levantar servicios
docker-compose up -d

# Logs del backend
docker-compose logs -f backend

# Logs del frontend
docker-compose logs -f frontend
```

### Producción
- Backend: Build y deploy en servidor con PostgreSQL
- Frontend: Deploy en Vercel/Netlify o servidor estático
- Base de datos: PostgreSQL con SSL y backups

## 🧪 Testing

```bash
# Tests del backend
npm run test --workspace=backend

# Tests E2E
npm run test:e2e --workspace=backend
```

## 📝 Variables de Entorno

### Backend (`apps/backend/.env`)
```bash
DATABASE_URL="postgresql://wolfi:supersecret@localhost:5432/wolfidb"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
```

### Frontend
```bash
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 🔧 Desarrollo

### Comandos de Desarrollo
```bash
# Desarrollo completo
npm run dev

# Solo backend
npm run start:dev --workspace=backend

# Solo frontend
npm run dev --workspace=frontend
```

### Estructura de Rutas Frontend
- `/` - Landing page
- `/login` - Inicio de sesión
- `/register` - Registro
- `/dashboard` - Panel principal (protegido)

### API Endpoints
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión
- `GET /auth/me` - Perfil del usuario autenticado

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte técnico o preguntas:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo

---

**WolfiAI B2B** - Copiloto Financiero para PyMEs en Argentina 🇦🇷
