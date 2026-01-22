import { Resolver, Query, Args } from '@nestjs/graphql';
import { DepartmentService } from '../services/department.service';

@Resolver('Employee')
export class EmployeeResolver {
  constructor(private departmentService: DepartmentService) {}

  @Query('employees')
  getEmployees(@Args('departmentId') departmentId: string) {
    return this.departmentService.getEmployees(departmentId);
  }
}
