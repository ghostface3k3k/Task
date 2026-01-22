import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DepartmentResolver } from './resolvers/department.resolver';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { DepartmentService } from './services/department.service';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      playground: true,
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      },
    }),
  ],
  providers: [DepartmentResolver, EmployeeResolver, DepartmentService],
})
export class AppModule {}
