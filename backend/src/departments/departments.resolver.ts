import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './department.entity';
import { CreateDepartmentInput, UpdateDepartmentInput } from './dto/department.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => Department)
  @UseGuards(JwtAuthGuard)
  createDepartment(@Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput) {
    return this.departmentsService.create(createDepartmentInput);
  }

  @Query(() => [Department])
  @UseGuards(JwtAuthGuard)
  departments() {
    return this.departmentsService.findAll();
  }

  @Query(() => Department)
  @UseGuards(JwtAuthGuard)
  department(@Args('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @Mutation(() => Department)
  @UseGuards(JwtAuthGuard)
  updateDepartment(
    @Args('id') id: string,
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    return this.departmentsService.update(id, updateDepartmentInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  deleteDepartment(@Args('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
