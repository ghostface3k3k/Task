import { Injectable } from '@nestjs/common';
import { Department, Employee } from './department.model';
import { UpdateDepartmentInput } from './department.input';
import * as data from '../data.json';

@Injectable()
export class DepartmentService {
  private departments: Department[] = (data as any).departments;

  getDepartment(id: string): Department | undefined {
    return this.departments.find((dept) => dept.id === id);
  }

  getDepartmentEmployees(id: string): Employee[] {
    const department = this.getDepartment(id);
    return department?.employees || [];
  }

  updateDepartment(id: string, input: UpdateDepartmentInput): Department | undefined {
    const departmentIndex = this.departments.findIndex((dept) => dept.id === id);
    if (departmentIndex === -1) {
      return undefined;
    }

    this.departments[departmentIndex] = {
      ...this.departments[departmentIndex],
      ...input,
    };

    return this.departments[departmentIndex];
  }

  deleteEmployee(departmentId: string, employeeId: string): boolean {
    const department = this.getDepartment(departmentId);
    if (!department) {
      return false;
    }

    const employeeIndex = department.employees.findIndex((emp) => emp.id === employeeId);
    if (employeeIndex === -1) {
      return false;
    }

    department.employees.splice(employeeIndex, 1);
    department.employeesNumber = department.employees.length;

    return true;
  }
}
