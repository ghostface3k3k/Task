import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DepartmentResolver } from './graphql/resolvers/department.resolver';
import { EmployeeResolver } from './graphql/resolvers/employee.resolver';
import { AuthResolver } from './graphql/resolvers/auth.resolver';
import { DepartmentService } from './services/department.service';
import { EmployeeService } from './services/employee.service';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: true,
      introspection: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.ts'),
      },
    }),
  ],
  providers: [
    DepartmentResolver,
    EmployeeResolver,
    AuthResolver,
    DepartmentService,
    EmployeeService,
    AuthService,
  ],
})
export class AppModule {}
