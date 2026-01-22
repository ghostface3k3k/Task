import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentInput, UpdateDepartmentInput } from './dto/department.input';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  async create(createDepartmentInput: CreateDepartmentInput): Promise<Department> {
    const department = this.departmentsRepository.create(createDepartmentInput);
    return this.departmentsRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentsRepository.find({ relations: ['employees'] });
  }

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
      relations: ['employees'],
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: string, updateDepartmentInput: UpdateDepartmentInput): Promise<Department> {
    const department = await this.findOne(id);
    Object.assign(department, updateDepartmentInput);
    return this.departmentsRepository.save(department);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.departmentsRepository.delete(id);
    return result.affected > 0;
  }
}
