export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DrivingLicense {
  number: string;
  issueDate: string;
  expiryDate: string;
  type: string;
}

export interface MilitaryStatus {
  status: string;
  serviceYears: string;
  rank: string;
}

export interface Profile {
  nationalId: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  maritalStatus: string;
  personalEmail: string;
  mobile: string;
  emergencyContacts: EmergencyContact[];
  address: Address;
  drivingLicense: DrivingLicense;
  militaryStatus: MilitaryStatus;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  contactInfo: string;
  kpi: string;
}

export interface Department {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  manager: string;
  location: string;
  status: string;
  createdAt: string;
  profile: Profile;
  employees: Employee[];
}

export interface UpdateDepartmentInput {
  code?: string;
  nameEn?: string;
  nameAr?: string;
  manager?: string;
  location?: string;
  status?: string;
}
