import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../../services/auth.service';
import { AuthPayload } from '../types/auth.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): AuthPayload {
    return this.authService.login(email, password);
  }
}
