import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './departments/department.module';
import { EmployeeModule } from './employees/employee.module';

@Module({
  imports: [GraphqlModule, AuthModule, DepartmentModule, EmployeeModule],
})
export class AppModule {}
