import { Injectable } from '@nestjs/common';
import { Department, Employee } from './entities/department.entity';
import { UpdateDepartmentInput } from './dto/update-department.input';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DepartmentService {
  private departmentData: Department;

  constructor() {
    this.loadData();
  }

  private loadData() {
    const dataPath = path.join(process.cwd(), 'data', 'department.json');
    const data = fs.readFileSync(dataPath, 'utf-8');
    this.departmentData = JSON.parse(data);
  }

  private saveData() {
    const dataPath = path.join(process.cwd(), 'data', 'department.json');
    fs.writeFileSync(dataPath, JSON.stringify(this.departmentData, null, 2));
  }

  getDepartment(id: string): Department | null {
    if (this.departmentData.id === id) {
      return this.departmentData;
    }
    return null;
  }

  getDepartmentEmployees(id: string): Employee[] {
    if (this.departmentData.id === id) {
      return this.departmentData.employees;
    }
    return [];
  }

  updateDepartment(id: string, input: UpdateDepartmentInput): Department | null {
    if (this.departmentData.id === id) {
      Object.assign(this.departmentData, input);
      this.saveData();
      return this.departmentData;
    }
    return null;
  }

  deleteEmployee(departmentId: string, employeeId: string): boolean {
    if (this.departmentData.id === departmentId) {
      const initialLength = this.departmentData.employees.length;
      this.departmentData.employees = this.departmentData.employees.filter(
        (emp) => emp.id !== employeeId,
      );
      if (this.departmentData.employees.length < initialLength) {
        this.saveData();
        return true;
      }
    }
    return false;
  }
}
