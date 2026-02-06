import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { EmployeeProfile } from './employee.model';

@Resolver(() => EmployeeProfile)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => EmployeeProfile, { nullable: true })
  employee(@Args('id', { type: () => ID }) id: string): EmployeeProfile | undefined {
    return this.employeeService.getEmployee(id);
  }

  @Query(() => [EmployeeProfile])
  employees(): EmployeeProfile[] {
    return this.employeeService.getAllEmployees();
  }
}
