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
  kpi?: number;
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
  parentDepartment?: ParentDepartment;
  createdAt: string;
  employees?: Employee[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface DrivingLicense {
  number: string;
  expiryDate: string;
}

export interface EmployeeProfile {
  id: string;
  nationalId: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  maritalStatus: string;
  email: string;
  mobile: string;
  emergencyContacts: EmergencyContact[];
  address: Address;
  drivingLicense: DrivingLicense;
  militaryStatus: string;
  departmentId: string;
  role: string;
  avatar: string;
}
