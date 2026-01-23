import { Injectable } from '@nestjs/common';
import * as departmentData from '../data/department.json';
import { Department, Employee } from '../graphql/types/department.type';

interface UpdateDepartmentInput {
  name?: string;
  description?: string;
  manager?: string;
  location?: string;
  status?: boolean;
}

interface UpdateEmployeeInput {
  name?: string;
  role?: string;
  contact?: string;
}

@Injectable()
export class DepartmentService {
  private department: Department = departmentData as Department;

  getDepartment(id: string): Department | null {
    if (id === this.department.id) {
      return this.department;
    }
    return null;
  }

  getDepartments(): Department[] {
    return [this.department];
  }

  updateDepartment(id: string, input: UpdateDepartmentInput): Department | null {
    if (id === this.department.id) {
      this.department = {
        ...this.department,
        ...input,
      };
      return this.department;
    }
    return null;
  }

  deleteEmployee(departmentId: string, employeeId: number): boolean {
    if (departmentId === this.department.id) {
      const index = this.department.employees.findIndex(emp => emp.id === employeeId);
      if (index !== -1) {
        this.department.employees.splice(index, 1);
        this.department.employeesNumber = this.department.employees.length;
        return true;
      }
    }
    return false;
  }

  updateEmployee(
    departmentId: string,
    employeeId: number,
    input: UpdateEmployeeInput,
  ): Employee | null {
    if (departmentId === this.department.id) {
      const employee = this.department.employees.find(emp => emp.id === employeeId);
      if (employee) {
        Object.assign(employee, input);
        return employee;
      }
    }
    return null;
  }
}
