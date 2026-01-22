import { Field, ObjectType, ID } from '@nestjs/graphql';

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
}

@ObjectType()
export class Department {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  localization: string;

  @Field()
  code: string;

  @Field()
  manager: string;

  @Field()
  location: string;

  @Field()
  employeesNumber: number;

  @Field()
  status: string;

  @Field({ nullable: true })
  parentDepartment?: string;

  @Field()
  createdAt: string;

  @Field(() => [Employee])
  employees: Employee[];
}
