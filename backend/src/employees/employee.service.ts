import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateEmployeeInput } from './dto/update-employee.input';

@Injectable()
export class EmployeeService {
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
    const allEmployees = [];
    this.departments.forEach((dept) => {
      if (dept.employees) {
        dept.employees.forEach((emp) => {
          allEmployees.push({
            ...emp,
            departmentId: dept.id,
          });
        });
      }
    });
    return allEmployees;
  }

  findOne(id: string) {
    for (const dept of this.departments) {
      if (dept.employees) {
        const employee = dept.employees.find((e) => e.id === id);
        if (employee) {
          return {
            ...employee,
            departmentId: dept.id,
            department: {
              id: dept.id,
              name: dept.name,
            },
          };
        }
      }
    }
    return null;
  }

  update(id: string, input: UpdateEmployeeInput) {
    for (const dept of this.departments) {
      if (dept.employees) {
        const index = dept.employees.findIndex((e) => e.id === id);
        if (index !== -1) {
          dept.employees[index] = {
            ...dept.employees[index],
            ...input,
          };
          return {
            ...dept.employees[index],
            departmentId: dept.id,
          };
        }
      }
    }
    throw new Error('Employee not found');
  }

  delete(id: string) {
    for (const dept of this.departments) {
      if (dept.employees) {
        const initialLength = dept.employees.length;
        dept.employees = dept.employees.filter((e) => e.id !== id);
        if (dept.employees.length < initialLength) {
          return {
            success: true,
            message: 'Employee deleted successfully',
          };
        }
      }
    }
    return {
      success: false,
      message: 'Employee not found',
    };
  }
}
