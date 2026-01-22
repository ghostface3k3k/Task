import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Localization {
  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class ParentDepartment {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
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
  contact: string;

  @Field(() => Int, { nullable: true })
  kpi?: number;
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

  @Field(() => ParentDepartment, { nullable: true })
  parentDepartment?: ParentDepartment;

  @Field()
  createdAt: string;

  @Field(() => [Employee])
  employees: Employee[];
}
