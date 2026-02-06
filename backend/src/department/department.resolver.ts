import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department, Employee } from './department.model';
import { UpdateDepartmentInput } from './department.input';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query(() => Department, { nullable: true })
  department(@Args('id', { type: () => ID }) id: string): Department | undefined {
    return this.departmentService.getDepartment(id);
  }

  @Query(() => [Employee])
  departmentEmployees(@Args('id', { type: () => ID }) id: string): Employee[] {
    return this.departmentService.getDepartmentEmployees(id);
  }

  @Mutation(() => Department, { nullable: true })
  updateDepartment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateDepartmentInput,
  ): Department | undefined {
    return this.departmentService.updateDepartment(id, input);
  }

  @Mutation(() => Boolean)
  deleteEmployee(
    @Args('departmentId', { type: () => ID }) departmentId: string,
    @Args('employeeId', { type: () => ID }) employeeId: string,
  ): boolean {
    return this.departmentService.deleteEmployee(departmentId, employeeId);
  }
}
