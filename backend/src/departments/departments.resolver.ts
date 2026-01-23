import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Department, Employee } from './department.model';
import { UpdateDepartmentInput, UpdateEmployeeInput } from './department.input';
import { DepartmentsService } from './departments.service';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Query(() => [Department])
  getDepartments(): Department[] {
    return this.departmentsService.getDepartments();
  }

  @Query(() => Department, { nullable: true })
  getDepartment(@Args('id', { type: () => ID }) id: string): Department | undefined {
    return this.departmentsService.getDepartment(id);
  }

  @Query(() => [Employee])
  getEmployees(): Employee[] {
    return this.departmentsService.getEmployees();
  }

  @Mutation(() => Department, { nullable: true })
  updateDepartment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateDepartmentInput,
  ): Department | undefined {
    return this.departmentsService.updateDepartment(id, input);
  }

  @Mutation(() => Boolean)
  deleteEmployee(
    @Args('departmentId', { type: () => ID }) departmentId: string,
    @Args('employeeId', { type: () => Int }) employeeId: number,
  ): boolean {
    return this.departmentsService.deleteEmployee(departmentId, employeeId);
  }

  @Mutation(() => Employee, { nullable: true })
  updateEmployee(
    @Args('departmentId', { type: () => ID }) departmentId: string,
    @Args('employeeId', { type: () => Int }) employeeId: number,
    @Args('input') input: UpdateEmployeeInput,
  ): Employee | undefined {
    return this.departmentsService.updateEmployee(departmentId, employeeId, input);
  }
}
