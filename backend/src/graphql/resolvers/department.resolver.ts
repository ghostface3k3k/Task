import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { DepartmentService } from '../../services/department.service';
import { Department, Employee } from '../types/department.type';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Query(() => Department, { nullable: true })
  getDepartment(@Args('id', { type: () => ID }) id: string): Department | null {
    return this.departmentService.getDepartment(id);
  }

  @Query(() => [Department])
  getDepartments(): Department[] {
    return this.departmentService.getDepartments();
  }

  @Mutation(() => Department, { nullable: true })
  updateDepartment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: any,
  ): Department | null {
    return this.departmentService.updateDepartment(id, input);
  }

  @Mutation(() => Boolean)
  deleteEmployee(
    @Args('departmentId', { type: () => ID }) departmentId: string,
    @Args('employeeId', { type: () => Int }) employeeId: number,
  ): boolean {
    return this.departmentService.deleteEmployee(departmentId, employeeId);
  }

  @Mutation(() => Employee, { nullable: true })
  updateEmployee(
    @Args('departmentId', { type: () => ID }) departmentId: string,
    @Args('employeeId', { type: () => Int }) employeeId: number,
    @Args('input') input: any,
  ): Employee | null {
    return this.departmentService.updateEmployee(departmentId, employeeId, input);
  }
}
