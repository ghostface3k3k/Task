import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';

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

  @Field(() => ParentDepartment, { nullable: true })
  parentDepartment: ParentDepartment | null;

  @Field()
  createdAt: string;

  @Field(() => [Employee])
  employees: Employee[];
}

@InputType()
export class LocalizationInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class ParentDepartmentInput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

@InputType()
export class UpdateDepartmentInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => LocalizationInput, { nullable: true })
  localization?: LocalizationInput;

  @Field(() => Int, { nullable: true })
  code?: number;

  @Field({ nullable: true })
  manager?: string;

  @Field({ nullable: true })
  location?: string;

  @Field(() => Int, { nullable: true })
  employeesNumber?: number;

  @Field({ nullable: true })
  status?: boolean;

  @Field(() => ParentDepartmentInput, { nullable: true })
  parentDepartment?: ParentDepartmentInput | null;
}

@InputType()
export class AddEmployeeInput {
  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  contact: string;
}
