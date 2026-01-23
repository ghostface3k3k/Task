import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Localization {
  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class Employee {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  contact: string;
}

@ObjectType()
export class Department {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Localization)
  localization: Localization;

  @Field(() => Int)
  code: number;

  @Field()
  manager: string;

  @Field()
  location: string;

  @Field(() => Int)
  employeesNumber: number;

  @Field()
  status: boolean;

  @Field(() => Department, { nullable: true })
  parentDepartment?: Department;

  @Field()
  createdAt: Date;

  @Field(() => [Employee])
  employees: Employee[];
}
