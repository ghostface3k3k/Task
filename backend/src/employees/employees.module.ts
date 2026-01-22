import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { Employee } from './employee.entity';
import { Department } from '../departments/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department])],
  providers: [EmployeesResolver, EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
