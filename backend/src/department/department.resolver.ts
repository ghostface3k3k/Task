import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department, Employee } from './entities/department.entity';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query(() => Department, { nullable: true })
  getDepartment(@Args('id') id: string): Department | null {
    return this.departmentService.getDepartment(id);
  }

  @Query(() => [Employee])
  getDepartmentEmployees(@Args('id') id: string): Employee[] {
    return this.departmentService.getDepartmentEmployees(id);
  }

  @Mutation(() => Department, { nullable: true })
  updateDepartment(
    @Args('id') id: string,
    @Args('input') input: UpdateDepartmentInput,
  ): Department | null {
    return this.departmentService.updateDepartment(id, input);
  }

  @Mutation(() => Boolean)
  deleteEmployee(
    @Args('departmentId') departmentId: string,
    @Args('employeeId') employeeId: string,
  ): boolean {
    return this.departmentService.deleteEmployee(departmentId, employeeId);
  }
}
