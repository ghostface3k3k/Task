import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { CreateEmployeeInput, UpdateEmployeeInput } from './dto/employee.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation(() => Employee)
  @UseGuards(JwtAuthGuard)
  createEmployee(@Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput) {
    return this.employeesService.create(createEmployeeInput);
  }

  @Query(() => [Employee])
  @UseGuards(JwtAuthGuard)
  employees() {
    return this.employeesService.findAll();
  }

  @Query(() => Employee)
  @UseGuards(JwtAuthGuard)
  employee(@Args('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Mutation(() => Employee)
  @UseGuards(JwtAuthGuard)
  updateEmployee(
    @Args('id') id: string,
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ) {
    return this.employeesService.update(id, updateEmployeeInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  deleteEmployee(@Args('id') id: string) {
    return this.employeesService.remove(id);
  }
}
