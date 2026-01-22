
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UpdateDepartmentInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    manager?: Nullable<string>;
    location?: Nullable<string>;
    status?: Nullable<boolean>;
}

export interface UpdateEmployeeInput {
    name?: Nullable<string>;
    role?: Nullable<string>;
    contact?: Nullable<string>;
}

export interface IQuery {
    departments(): Department[] | Promise<Department[]>;
    department(id: string): Nullable<Department> | Promise<Nullable<Department>>;
    employees(): Employee[] | Promise<Employee[]>;
    employee(id: string): Nullable<Employee> | Promise<Nullable<Employee>>;
}

export interface IMutation {
    login(email: string, password: string): AuthPayload | Promise<AuthPayload>;
    updateDepartment(id: string, input: UpdateDepartmentInput): Department | Promise<Department>;
    deleteEmployee(departmentId: string, employeeId: string): DeleteResponse | Promise<DeleteResponse>;
    updateEmployee(id: string, input: UpdateEmployeeInput): Employee | Promise<Employee>;
    deleteEmployeeRecord(id: string): DeleteResponse | Promise<DeleteResponse>;
}

export interface Department {
    id: string;
    name: string;
    description: string;
    localization?: Nullable<Localization>;
    code: number;
    manager: string;
    location: string;
    employeesNumber: number;
    status: boolean;
    parentDepartment?: Nullable<Department>;
    createdAt: string;
    employees: Employee[];
}

export interface Employee {
    id: string;
    name: string;
    role: string;
    contact: string;
    departmentId: string;
    department?: Nullable<Department>;
}

export interface Localization {
    name: string;
    description: string;
}

export interface AuthPayload {
    token: string;
    user: User;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface DeleteResponse {
    success: boolean;
    message: string;
}

type Nullable<T> = T | null;
