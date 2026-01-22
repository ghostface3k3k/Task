import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Employee } from '../employees/employee.entity';

@ObjectType()
@Entity('departments')
export class Department {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  code: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  manager: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field(() => [Employee], { nullable: true })
  @OneToMany(() => Employee, employee => employee.department)
  employees: Employee[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
