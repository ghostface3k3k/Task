import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface Localization {
  name: string;
  description: string;
}

export interface ParentDepartment {
  id: string;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  contact: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  localization: Localization;
  code: number;
  manager: string;
  location: string;
  employeesNumber: number;
  status: boolean;
  parentDepartment: ParentDepartment | null;
  createdAt: string;
  employees: Employee[];
}

export interface UpdateDepartmentInput {
  name?: string;
  description?: string;
  localization?: Localization;
  manager?: string;
  location?: string;
  status?: boolean;
}

export interface AddEmployeeInput {
  name: string;
  role: string;
  contact: string;
}

@Injectable()
export class DepartmentService {
  private data: { department: Department };
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../data/department.json');
    this.loadData();
  }

  private loadData() {
    try {
      const rawData = fs.readFileSync(this.dataPath, 'utf8');
      this.data = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading department data:', error);
      // Initialize with empty data if file doesn't exist
      this.data = {
        department: {
          id: '1',
          name: '',
          description: '',
          localization: { name: '', description: '' },
          code: 0,
          manager: '',
          location: '',
          employeesNumber: 0,
          status: true,
          parentDepartment: null,
          createdAt: new Date().toISOString(),
          employees: [],
        },
      };
    }
  }

  private saveData() {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error saving department data:', error);
      throw new Error('Failed to save data');
    }
  }

  getDepartment(id: string): Department | null {
    if (this.data.department.id === id) {
      return this.data.department;
    }
    return null;
  }

  getAllDepartments(): Department[] {
    return [this.data.department];
  }

  updateDepartment(id: string, input: UpdateDepartmentInput): Department {
    if (this.data.department.id !== id) {
      throw new Error('Department not found');
    }

    const department = this.data.department;

    if (input.name !== undefined) {
      department.name = input.name;
    }
    if (input.description !== undefined) {
      department.description = input.description;
    }
    if (input.localization) {
      department.localization = {
        ...department.localization,
        ...input.localization,
      };
    }
    if (input.manager !== undefined) {
      department.manager = input.manager;
    }
    if (input.location !== undefined) {
      department.location = input.location;
    }
    if (input.status !== undefined) {
      department.status = input.status;
    }

    this.saveData();
    return department;
  }

  deleteEmployee(departmentId: string, employeeId: string): boolean {
    if (this.data.department.id !== departmentId) {
      throw new Error('Department not found');
    }

    const initialLength = this.data.department.employees.length;
    this.data.department.employees = this.data.department.employees.filter(
      (emp) => emp.id.toString() !== employeeId,
    );

    if (this.data.department.employees.length === initialLength) {
      throw new Error('Employee not found');
    }

    this.data.department.employeesNumber = this.data.department.employees.length;
    this.saveData();
    return true;
  }

  addEmployee(departmentId: string, input: AddEmployeeInput): Employee {
    if (this.data.department.id !== departmentId) {
      throw new Error('Department not found');
    }

    const newEmployee: Employee = {
      id: Date.now(), // Simple ID generation
      name: input.name,
      role: input.role,
      contact: input.contact,
    };

    this.data.department.employees.push(newEmployee);
    this.data.department.employeesNumber = this.data.department.employees.length;
    this.saveData();
    return newEmployee;
  }

  getEmployees(departmentId: string): Employee[] {
    if (this.data.department.id === departmentId) {
      return this.data.department.employees;
    }
    return [];
  }
}
