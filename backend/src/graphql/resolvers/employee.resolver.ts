import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../types/employee.type';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query(() => [Employee])
  getEmployees(): Employee[] {
    return this.employeeService.getEmployees();
  }

  @Query(() => Employee, { nullable: true })
  getEmployee(@Args('id', { type: () => Int }) id: number): Employee | null {
    return this.employeeService.getEmployee(id);
  }
}
