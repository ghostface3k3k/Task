import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class EmergencyContact {
  @Field()
  name: string;

  @Field()
  relationship: string;

  @Field()
  phone: string;
}

@ObjectType()
export class Address {
  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipCode: string;

  @Field()
  country: string;
}

@ObjectType()
export class DrivingLicense {
  @Field()
  number: string;

  @Field()
  issueDate: string;

  @Field()
  expiryDate: string;

  @Field()
  type: string;
}

@ObjectType()
export class MilitaryStatus {
  @Field()
  status: string;

  @Field()
  serviceYears: string;

  @Field()
  rank: string;
}

@ObjectType()
export class Profile {
  @Field()
  nationalId: string;

  @Field()
  title: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  dateOfBirth: string;

  @Field()
  gender: string;

  @Field()
  nationality: string;

  @Field()
  passportNumber: string;

  @Field()
  passportIssueDate: string;

  @Field()
  passportExpiryDate: string;

  @Field()
  maritalStatus: string;

  @Field()
  personalEmail: string;

  @Field()
  mobile: string;

  @Field(() => [EmergencyContact])
  emergencyContacts: EmergencyContact[];

  @Field(() => Address)
  address: Address;

  @Field(() => DrivingLicense)
  drivingLicense: DrivingLicense;

  @Field(() => MilitaryStatus)
  militaryStatus: MilitaryStatus;
}

@ObjectType()
export class Employee {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  contactInfo: string;

  @Field()
  kpi: string;
}

@ObjectType()
export class Department {
  @Field(() => ID)
  id: string;

  @Field()
  code: string;

  @Field()
  nameEn: string;

  @Field()
  nameAr: string;

  @Field()
  manager: string;

  @Field()
  location: string;

  @Field()
  status: string;

  @Field()
  createdAt: string;

  @Field(() => Profile)
  profile: Profile;

  @Field(() => [Employee])
  employees: Employee[];
}
