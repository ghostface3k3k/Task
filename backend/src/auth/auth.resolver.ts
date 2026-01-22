import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Mutation(() => LoginResponse)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('role', { nullable: true }) role?: string,
  ) {
    const user = await this.authService.register(email, password, role);
    return this.authService.login(email, password);
  }
}
