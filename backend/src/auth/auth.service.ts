import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayload } from './auth.model';

@Injectable()
export class AuthService {
  async login(email: string, password: string): Promise<AuthPayload> {
    // Dummy authentication
    if (email === 'admin@hr.com' && password === 'password123') {
      return {
        token: 'dummy-jwt-token-' + Date.now(),
        user: {
          id: '1',
          email: 'admin@hr.com',
          name: 'Admin User',
        },
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
