import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsDateString()
  dateOfBirth: string;

  @Field()
  @IsNotEmpty()
  position: string;

  @Field({ nullable: true })
  @IsOptional()
  departmentId?: string;
}

@InputType()
export class UpdateEmployeeInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @IsDateString()
  dateOfBirth?: string;

  @Field({ nullable: true })
  position?: string;

  @Field({ nullable: true })
  departmentId?: string;
}
