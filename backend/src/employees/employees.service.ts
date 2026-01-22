import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { Department } from '../departments/department.entity';
import { CreateEmployeeInput, UpdateEmployeeInput } from './dto/employee.input';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  async create(createEmployeeInput: CreateEmployeeInput): Promise<Employee> {
    const employee = this.employeesRepository.create(createEmployeeInput);
    
    if (createEmployeeInput.departmentId) {
      const department = await this.departmentsRepository.findOne({
        where: { id: createEmployeeInput.departmentId },
      });
      if (department) {
        employee.department = department;
      }
    }
    
    return this.employeesRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeesRepository.find({ relations: ['department'] });
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({
      where: { id },
      relations: ['department'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeInput: UpdateEmployeeInput): Promise<Employee> {
    const employee = await this.findOne(id);
    
    if (updateEmployeeInput.departmentId) {
      const department = await this.departmentsRepository.findOne({
        where: { id: updateEmployeeInput.departmentId },
      });
      if (department) {
        employee.department = department;
      }
    }
    
    Object.assign(employee, updateEmployeeInput);
    return this.employeesRepository.save(employee);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.employeesRepository.delete(id);
    return result.affected > 0;
  }
}
