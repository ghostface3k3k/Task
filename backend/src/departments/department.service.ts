import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentService {
  private departments: any[];

  constructor() {
    this.loadData();
  }

  private loadData() {
    const dataPath = path.join(__dirname, '../data/department.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);
    this.departments = data.departments || [];
  }

  findAll() {
    return this.departments.map((dept) => ({
      ...dept,
      employeesNumber: dept.employees?.length || 0,
    }));
  }

  findOne(id: string) {
    const dept = this.departments.find((d) => d.id === id);
    if (dept) {
      return {
        ...dept,
        employeesNumber: dept.employees?.length || 0,
      };
    }
    return null;
  }

  update(id: string, input: UpdateDepartmentInput) {
    const index = this.departments.findIndex((d) => d.id === id);
    if (index === -1) {
      throw new Error('Department not found');
    }

    this.departments[index] = {
      ...this.departments[index],
      ...input,
    };

    return {
      ...this.departments[index],
      employeesNumber: this.departments[index].employees?.length || 0,
    };
  }

  deleteEmployeeFromDepartment(departmentId: string, employeeId: string) {
    const dept = this.departments.find((d) => d.id === departmentId);
    if (!dept) {
      throw new Error('Department not found');
    }

    const initialLength = dept.employees?.length || 0;
    dept.employees = dept.employees?.filter((e) => e.id !== employeeId) || [];

    if (dept.employees.length === initialLength) {
      return {
        success: false,
        message: 'Employee not found in department',
      };
    }

    return {
      success: true,
      message: 'Employee removed from department successfully',
    };
  }
}
