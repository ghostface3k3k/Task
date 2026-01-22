import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DepartmentService } from './services/department.service';
import { DepartmentResolver } from './resolvers/department.resolver';
import { EmployeeResolver } from './resolvers/employee.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      playground: true,
      introspection: true,
    }),
  ],
  providers: [DepartmentService, DepartmentResolver, EmployeeResolver],
})
export class AppModule {}
