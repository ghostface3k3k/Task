import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DepartmentResolver } from './resolvers/department.resolver';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { DepartmentService } from './services/department.service';
import { getCorsOrigins } from './config/cors.config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      playground: true,
      introspection: true,
      cors: {
        origin: getCorsOrigins(),
        credentials: true,
      },
    }),
  ],
  providers: [DepartmentResolver, EmployeeResolver, DepartmentService],
})
export class AppModule {}
