import { Injectable } from '@nestjs/common';
import { EmployeeProfile } from './employee.model';
import * as data from '../data.json';

@Injectable()
export class EmployeeService {
  private employees: EmployeeProfile[] = (data as any).employees;

  getEmployee(id: string): EmployeeProfile | undefined {
    return this.employees.find((emp) => emp.id === id);
  }

  getAllEmployees(): EmployeeProfile[] {
    return this.employees;
  }
}
