import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    // Mock authentication - accepts any email/password
    // In production, this would validate against a database
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        email,
        name: email.split('@')[0],
      },
    };
  }

  async validateToken(token: string): Promise<boolean> {
    // Mock token validation
    return token && token.startsWith('mock-jwt-token');
  }
}
