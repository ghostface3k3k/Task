import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  code: string;

  @Field({ nullable: true })
  @IsOptional()
  manager?: string;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;
}

@InputType()
export class UpdateDepartmentInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  manager?: string;

  @Field({ nullable: true })
  location?: string;
}
