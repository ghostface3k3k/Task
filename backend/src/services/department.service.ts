import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface Localization {
  name: string;
  description: string;
}

interface Employee {
  id: number;
  name: string;
  role: string;
  contact: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  localization: Localization;
  code: number;
  manager: string;
  location: string;
  employeesNumber: number;
  status: boolean;
  parentDepartment: any;
  createdAt: string;
  employees: Employee[];
}

interface UpdateDepartmentInput {
  name?: string;
  description?: string;
  localization?: Localization;
  manager?: string;
  location?: string;
  status?: boolean;
}

interface AddEmployeeInput {
  name: string;
  role: string;
  contact: string;
}

@Injectable()
export class DepartmentService {
  private department: Department;

  constructor() {
    this.loadDepartmentData();
  }

  private loadDepartmentData(): void {
    const dataPath = path.join(__dirname, '../data/department.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);
    this.department = data.department;
  }

  private saveDepartmentData(): void {
    const dataPath = path.join(__dirname, '../data/department.json');
    const data = { department: this.department };
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  }

  getDepartment(id: string): Department | null {
    if (this.department.id === id) {
      return this.department;
    }
    return null;
  }

  getAllDepartments(): Department[] {
    return [this.department];
  }

  updateDepartment(id: string, input: UpdateDepartmentInput): Department | null {
    if (this.department.id !== id) {
      return null;
    }

    if (input.name !== undefined) {
      this.department.name = input.name;
    }
    if (input.description !== undefined) {
      this.department.description = input.description;
    }
    if (input.localization !== undefined) {
      this.department.localization = input.localization;
    }
    if (input.manager !== undefined) {
      this.department.manager = input.manager;
    }
    if (input.location !== undefined) {
      this.department.location = input.location;
    }
    if (input.status !== undefined) {
      this.department.status = input.status;
    }

    this.saveDepartmentData();
    return this.department;
  }

  getEmployees(departmentId: string): Employee[] {
    if (this.department.id === departmentId) {
      return this.department.employees;
    }
    return [];
  }

  deleteEmployee(departmentId: string, employeeId: string): boolean {
    if (this.department.id !== departmentId) {
      return false;
    }

    const initialLength = this.department.employees.length;
    this.department.employees = this.department.employees.filter(
      (emp) => emp.id.toString() !== employeeId
    );

    if (this.department.employees.length < initialLength) {
      this.department.employeesNumber = this.department.employees.length;
      this.saveDepartmentData();
      return true;
    }

    return false;
  }

  addEmployee(departmentId: string, input: AddEmployeeInput): Employee | null {
    if (this.department.id !== departmentId) {
      return null;
    }

    // Generate a new ID
    const maxId = Math.max(
      ...this.department.employees.map((emp) => emp.id),
      0
    );
    const newEmployee: Employee = {
      id: maxId + 1,
      name: input.name,
      role: input.role,
      contact: input.contact,
    };

    this.department.employees.push(newEmployee);
    this.department.employeesNumber = this.department.employees.length;
    this.saveDepartmentData();

    return newEmployee;
  }
}
