import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentService } from '../services/department.service';
import { UpdateDepartmentInput, AddEmployeeInput } from '../types';

@Resolver('Department')
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query('getDepartment')
  getDepartment(@Args('id') id: string) {
    return this.departmentService.getDepartment(id);
  }

  @Query('getAllDepartments')
  getAllDepartments() {
    return this.departmentService.getAllDepartments();
  }

  @Mutation('updateDepartment')
  updateDepartment(
    @Args('id') id: string,
    @Args('input') input: UpdateDepartmentInput,
  ) {
    return this.departmentService.updateDepartment(id, input);
  }

  @Mutation('deleteEmployee')
  deleteEmployee(
    @Args('departmentId') departmentId: string,
    @Args('employeeId') employeeId: string,
  ) {
    return this.departmentService.deleteEmployee(departmentId, employeeId);
  }

  @Mutation('addEmployee')
  addEmployee(
    @Args('departmentId') departmentId: string,
    @Args('input') input: AddEmployeeInput,
  ) {
    return this.departmentService.addEmployee(departmentId, input);
  }
}
