import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentService, Department, Employee } from '../services/department.service';

@Resolver('Department')
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query('department')
  getDepartment(@Args('id') id: string): Department | null {
    return this.departmentService.getDepartment(id);
  }

  @Query('departments')
  getDepartments(): Department[] {
    return this.departmentService.getAllDepartments();
  }

  @Mutation('updateDepartment')
  updateDepartment(
    @Args('id') id: string,
    @Args('input') input: any
  ): Department | null {
    return this.departmentService.updateDepartment(id, input);
  }

  @Mutation('deleteEmployee')
  deleteEmployee(
    @Args('departmentId') departmentId: string,
    @Args('employeeId') employeeId: string
  ): boolean {
    return this.departmentService.deleteEmployee(departmentId, employeeId);
  }

  @Mutation('addEmployee')
  addEmployee(
    @Args('departmentId') departmentId: string,
    @Args('input') input: any
  ): Employee | null {
    return this.departmentService.addEmployee(departmentId, input);
  }
}
