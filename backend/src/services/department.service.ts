import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {
  Department,
  Employee,
  UpdateDepartmentInput,
  AddEmployeeInput,
} from '../types';

@Injectable()
export class DepartmentService {
  private departments: Map<string, Department> = new Map();
  private employeeIdCounter = 1;

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    try {
      // Try production path first, then fall back to development path
      let dataPath = path.join(__dirname, '../data/department.json');
      
      if (!fs.existsSync(dataPath)) {
        // Development path
        dataPath = path.join(process.cwd(), 'src/data/department.json');
      }
      
      const rawData = fs.readFileSync(dataPath, 'utf-8');
      const data = JSON.parse(rawData);
      
      if (data.department) {
        this.departments.set(data.department.id, data.department);
        
        // Set employee ID counter to max existing ID + 1
        const maxId = Math.max(
          ...data.department.employees.map((emp: Employee) => parseInt(emp.id, 10)),
        );
        this.employeeIdCounter = maxId + 1;
      }
    } catch (error) {
      console.error('Error loading department data');
      console.error('Error details:', error);
      throw new Error('Failed to load department data. Please check if department.json exists and is valid.');
    }
  }

  getDepartment(id: string): Department | null {
    return this.departments.get(id) || null;
  }

  getAllDepartments(): Department[] {
    return Array.from(this.departments.values());
  }

  updateDepartment(id: string, input: UpdateDepartmentInput): Department {
    const department = this.departments.get(id);
    
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    const updatedDepartment = {
      ...department,
      ...input,
      localization: input.localization 
        ? { ...department.localization, ...input.localization }
        : department.localization,
    };

    this.departments.set(id, updatedDepartment);
    return updatedDepartment;
  }

  deleteEmployee(departmentId: string, employeeId: string): boolean {
    const department = this.departments.get(departmentId);
    
    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }

    const employeeIndex = department.employees.findIndex(emp => emp.id === employeeId);
    
    if (employeeIndex === -1) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    department.employees.splice(employeeIndex, 1);
    department.employeesNumber = department.employees.length;
    
    this.departments.set(departmentId, department);
    return true;
  }

  addEmployee(departmentId: string, input: AddEmployeeInput): Employee {
    const department = this.departments.get(departmentId);
    
    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }

    const newEmployee: Employee = {
      id: (++this.employeeIdCounter).toString(),
      ...input,
    };

    department.employees.push(newEmployee);
    department.employeesNumber = department.employees.length;
    
    this.departments.set(departmentId, department);
    return newEmployee;
  }

  getEmployees(departmentId: string): Employee[] {
    const department = this.departments.get(departmentId);
    
    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }

    return department.employees;
  }
}
