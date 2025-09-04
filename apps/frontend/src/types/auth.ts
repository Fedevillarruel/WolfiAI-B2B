export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'OWNER';
  tenant: Tenant;
}

export interface Tenant {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  tenantName: string;
}

export interface LoginData {
  email: string;
  password: string;
}
