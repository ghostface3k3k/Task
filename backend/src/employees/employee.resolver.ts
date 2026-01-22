import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeInput } from './dto/update-employee.input';

@Resolver('Employee')
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query('employees')
  async getEmployees() {
    return this.employeeService.findAll();
  }

  @Query('employee')
  async getEmployee(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Mutation('updateEmployee')
  async updateEmployee(
    @Args('id') id: string,
    @Args('input') input: UpdateEmployeeInput,
  ) {
    return this.employeeService.update(id, input);
  }

  @Mutation('deleteEmployeeRecord')
  async deleteEmployeeRecord(@Args('id') id: string) {
    return this.employeeService.delete(id);
  }
}
