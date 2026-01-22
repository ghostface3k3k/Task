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
  country: string;

  @Field()
  postalCode: string;
}

@ObjectType()
export class DrivingLicense {
  @Field()
  number: string;

  @Field()
  expiryDate: string;
}

@ObjectType()
export class EmployeeProfile {
  @Field(() => ID)
  id: string;

  @Field()
  nationalId: string;

  @Field()
  title: string;

  @Field()
  firstName: string;

  @Field()
  middleName: string;

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
  maritalStatus: string;

  @Field()
  email: string;

  @Field()
  mobile: string;

  @Field(() => [EmergencyContact])
  emergencyContacts: EmergencyContact[];

  @Field(() => Address)
  address: Address;

  @Field(() => DrivingLicense)
  drivingLicense: DrivingLicense;

  @Field()
  militaryStatus: string;

  @Field()
  departmentId: string;

  @Field()
  role: string;

  @Field()
  avatar: string;
}
