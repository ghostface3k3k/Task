export interface Localization {
  name: string;
  description: string;
}

export interface ParentDepartment {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
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
