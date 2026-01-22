import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import {
  Department,
  Employee,
  UpdateDepartmentInput,
  AddEmployeeInput,
} from '../types/department.types';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query(() => Department, { name: 'getDepartment' })
  getDepartment(@Args('id', { type: () => ID }) id: string): Department {
    return this.departmentService.getDepartment(id);
  }

  @Mutation(() => Department)
  updateDepartment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateDepartmentInput,
  ): Department {
    return this.departmentService.updateDepartment(id, input);
  }

  @Mutation(() => Boolean)
  deleteEmployee(
    @Args('departmentId', { type: () => ID }) departmentId: string,
    @Args('employeeId', { type: () => Int }) employeeId: number,
  ): boolean {
    return this.departmentService.deleteEmployee(departmentId, employeeId);
  }

  @Mutation(() => Employee)
  addEmployee(
    @Args('departmentId', { type: () => ID }) departmentId: string,
    @Args('input') input: AddEmployeeInput,
  ): Employee {
    return this.departmentService.addEmployee(departmentId, input);
  }
}
