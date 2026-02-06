import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class LocalizationInput {
  @Field()
  name: string;

  @Field()
  description: string;
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
}
