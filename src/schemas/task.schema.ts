import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsNotEmpty,
  Length,
  IsEnum,
} from 'class-validator';

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum TaskCategory {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

@Schema({ timestamps: true })
export class Task extends Document {
  @IsString({ message: 'Title must be a string' })
  @Length(3, 100, {
    message: 'Title length must be between 3 and 100 characters',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @Prop({ required: true })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @Length(0, 500, {
    message: 'Description length cannot exceed 500 characters',
  })
  @Prop()
  description?: string;

  @IsBoolean({ message: 'isCompleted must be a boolean value' })
  @Prop({ default: false })
  isCompleted: boolean;

  @IsOptional()
  @IsDate({ message: 'Due date must be a valid date' })
  @Prop()
  dueDate?: Date;

  @IsEnum(TaskPriority, { message: 'Invalid priority value' })
  @Prop({ required: true, default: TaskPriority.Medium })
  priority: TaskPriority;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  users?: User[];

  @IsString({ message: 'Category must be a string' })
  @Prop({ required: true, default: TaskCategory.ToDo })
  category: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
