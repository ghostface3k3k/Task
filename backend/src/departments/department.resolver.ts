import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Resolver('Department')
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Query('departments')
  async getDepartments() {
    return this.departmentService.findAll();
  }

  @Query('department')
  async getDepartment(@Args('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Mutation('updateDepartment')
  async updateDepartment(
    @Args('id') id: string,
    @Args('input') input: UpdateDepartmentInput,
  ) {
    return this.departmentService.update(id, input);
  }

  @Mutation('deleteEmployee')
  async deleteEmployee(
    @Args('departmentId') departmentId: string,
    @Args('employeeId') employeeId: string,
  ) {
    return this.departmentService.deleteEmployeeFromDepartment(
      departmentId,
      employeeId,
    );
  }
}
