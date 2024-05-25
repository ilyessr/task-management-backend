import { TaskPriority, TaskCategory } from '@/schemas/task.schema';
import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsMongoId,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsEnum(TaskCategory)
  category: TaskCategory;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsEnum(TaskCategory)
  @IsOptional()
  category?: TaskCategory;
}

export class FindTaskByTitleDto {
  @IsString()
  title: string;
}

export class DeleteTaskDto {
  @IsString()
  @IsMongoId()
  taskId: string;
}
