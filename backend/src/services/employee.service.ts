import { Injectable } from '@nestjs/common';
import * as departmentData from '../data/department.json';
import { Employee } from '../graphql/types/employee.type';

@Injectable()
export class EmployeeService {
  private employees: Employee[] = (departmentData as any).employees;

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployee(id: number): Employee | null {
    const employee = this.employees.find(emp => emp.id === id);
    return employee || null;
  }
}
