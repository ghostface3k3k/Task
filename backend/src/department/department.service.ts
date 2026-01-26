import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Department,
  Employee,
  UpdateDepartmentInput,
  AddEmployeeInput,
} from '../types/department.types';

@Injectable()
export class DepartmentService {
  private departments: Map<string, Department> = new Map();

  constructor() {
    // Initialize with static data
    const department: Department = {
      id: '1',
      name: 'Human Resources',
      description: 'Manages employee relations, recruitment, and benefits',
      localization: {
        name: 'الموارد البشرية',
        description: 'إدارة علاقات الموظفين والتوظيف والمزايا',
      },
      code: 1001,
      manager: 'Sarah Johnson',
      location: 'Building A, Floor 3',
      employeesNumber: 5,
      status: true,
      parentDepartment: null,
      createdAt: '2024-01-15T08:00:00.000Z',
      employees: [
        {
          id: 1,
          name: 'John Smith',
          role: 'HR Manager',
          contact: 'john.smith@company.com',
        },
        {
          id: 2,
          name: 'Emily Davis',
          role: 'HR Specialist',
          contact: 'emily.davis@company.com',
        },
        {
          id: 3,
          name: 'Michael Brown',
          role: 'Recruiter',
          contact: 'michael.brown@company.com',
        },
        {
          id: 4,
          name: 'Jessica Wilson',
          role: 'Benefits Coordinator',
          contact: 'jessica.wilson@company.com',
        },
        {
          id: 5,
          name: 'David Martinez',
          role: 'Training Specialist',
          contact: 'david.martinez@company.com',
        },
      ],
    };

    this.departments.set('1', department);
  }

  getDepartment(id: string): Department {
    const department = this.departments.get(id);
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  updateDepartment(id: string, input: UpdateDepartmentInput): Department {
    const department = this.getDepartment(id);

    const updatedDepartment: Department = {
      ...department,
      ...input,
      localization: input.localization
        ? { ...department.localization, ...input.localization }
        : department.localization,
      parentDepartment:
        input.parentDepartment !== undefined
          ? input.parentDepartment
          : department.parentDepartment,
    };

    // Update employeesNumber to match actual employees count
    updatedDepartment.employeesNumber = updatedDepartment.employees.length;

    this.departments.set(id, updatedDepartment);
    return updatedDepartment;
  }

  deleteEmployee(departmentId: string, employeeId: number): boolean {
    const department = this.getDepartment(departmentId);

    const employeeIndex = department.employees.findIndex(
      (emp) => emp.id === employeeId,
    );

    if (employeeIndex === -1) {
      throw new NotFoundException(
        `Employee with ID ${employeeId} not found in department ${departmentId}`,
      );
    }

    department.employees.splice(employeeIndex, 1);
    department.employeesNumber = department.employees.length;

    this.departments.set(departmentId, department);
    return true;
  }

  addEmployee(departmentId: string, input: AddEmployeeInput): Employee {
    const department = this.getDepartment(departmentId);

    // Generate new employee ID
    const maxId =
      department.employees.length > 0
        ? Math.max(...department.employees.map((emp) => emp.id))
        : 0;

    const newEmployee: Employee = {
      id: maxId + 1,
      ...input,
    };

    department.employees.push(newEmployee);
    department.employeesNumber = department.employees.length;

    this.departments.set(departmentId, department);
    return newEmployee;
  }
}
