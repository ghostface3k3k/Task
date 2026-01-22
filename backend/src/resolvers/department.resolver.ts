import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Department, Employee } from '../schema/department.schema';
import { UpdateDepartmentInput, AddEmployeeInput } from '../schema/inputs';
import * as DepartmentData from '../data/departments';

@Resolver(() => Department)
export class DepartmentResolver {
  @Query(() => Department, { nullable: true })
  getDepartment(@Args('id', { type: () => ID }) id: string): Department | undefined {
    return DepartmentData.getDepartmentById(id);
  }

  @Query(() => [Department])
  getAllDepartments(): Department[] {
    return DepartmentData.getDepartments();
  }

  @Query(() => [Employee])
  getEmployees(@Args('departmentId', { type: () => ID }) departmentId: string): Employee[] {
    return DepartmentData.getEmployeesByDepartment(departmentId);
  }

  @Mutation(() => Department, { nullable: true })
  updateDepartment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateDepartmentInput
  ): Department | null {
    return DepartmentData.updateDepartment(id, input);
  }

  @Mutation(() => Boolean)
  deleteEmployee(@Args('employeeId', { type: () => ID }) employeeId: string): boolean {
    return DepartmentData.deleteEmployee(employeeId);
  }

  @Mutation(() => Employee, { nullable: true })
  addEmployee(
    @Args('departmentId', { type: () => ID }) departmentId: string,
    @Args('input') input: AddEmployeeInput
  ): Employee | null {
    return DepartmentData.addEmployee(departmentId, input);
  }
}
