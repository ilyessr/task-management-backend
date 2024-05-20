import { TaskPriority } from '@/schemas/task.schema';
import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  isMongoId,
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
