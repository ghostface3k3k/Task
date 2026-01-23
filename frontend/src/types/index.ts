export interface Localization {
  name: string;
  description: string;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  contact: string;
  kpi?: string;
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
  parentDepartment?: Department | null;
  createdAt: string;
  employees: Employee[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}
