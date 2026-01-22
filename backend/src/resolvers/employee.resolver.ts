import { Resolver, Query, Args } from '@nestjs/graphql';
import { DepartmentService, Employee } from '../services/department.service';

@Resolver('Employee')
export class EmployeeResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query('employees')
  getEmployees(@Args('departmentId') departmentId: string): Employee[] {
    return this.departmentService.getEmployees(departmentId);
  }
}
