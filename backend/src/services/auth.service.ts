import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayload, User } from '../graphql/types/auth.type';

@Injectable()
export class AuthService {
  login(email: string, password: string): AuthPayload {
    // Dummy authentication
    if (email === 'admin@hr.com' && password === 'password123') {
      const user: User = {
        id: '1',
        email: 'admin@hr.com',
        name: 'Admin User',
      };
      return {
        token: 'dummy-jwt-token-' + Date.now(),
        user,
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
