import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDepartmentInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  localization?: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  manager?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  parentDepartment?: string;
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
