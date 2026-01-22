import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDepartmentInput {
  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  nameEn?: string;

  @Field({ nullable: true })
  nameAr?: string;

  @Field({ nullable: true })
  manager?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  status?: string;
}
