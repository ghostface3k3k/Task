import { Injectable } from '@nestjs/common';
import { Department, Employee } from './department.model';
import { UpdateDepartmentInput, UpdateEmployeeInput } from './department.input';
import * as departmentData from '../data/department.json';

@Injectable()
export class DepartmentsService {
  private departments: Department[] = departmentData.departments;

  getDepartments(): Department[] {
    return this.departments;
  }

  getDepartment(id: string): Department | undefined {
    return this.departments.find(dept => dept.id === id);
  }

  getEmployees(): Employee[] {
    const allEmployees: Employee[] = [];
    this.departments.forEach(dept => {
      allEmployees.push(...dept.employees);
    });
    return allEmployees;
  }

  updateDepartment(id: string, input: UpdateDepartmentInput): Department | undefined {
    const deptIndex = this.departments.findIndex(dept => dept.id === id);
    if (deptIndex === -1) {
      return undefined;
    }

    this.departments[deptIndex] = {
      ...this.departments[deptIndex],
      ...input,
      localization: input.localization
        ? { ...this.departments[deptIndex].localization, ...input.localization }
        : this.departments[deptIndex].localization,
    };

    return this.departments[deptIndex];
  }

  deleteEmployee(departmentId: string, employeeId: number): boolean {
    const dept = this.departments.find(d => d.id === departmentId);
    if (!dept) {
      return false;
    }

    const employeeIndex = dept.employees.findIndex(emp => emp.id === employeeId);
    if (employeeIndex === -1) {
      return false;
    }

    dept.employees.splice(employeeIndex, 1);
    dept.employeesNumber = dept.employees.length;
    return true;
  }

  updateEmployee(
    departmentId: string,
    employeeId: number,
    input: UpdateEmployeeInput,
  ): Employee | undefined {
    const dept = this.departments.find(d => d.id === departmentId);
    if (!dept) {
      return undefined;
    }

    const employeeIndex = dept.employees.findIndex(emp => emp.id === employeeId);
    if (employeeIndex === -1) {
      return undefined;
    }

    dept.employees[employeeIndex] = {
      ...dept.employees[employeeIndex],
      ...input,
    };

    return dept.employees[employeeIndex];
  }
}
