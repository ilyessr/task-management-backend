import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateTaskDto,
  DeleteTaskDto,
  FindTaskByTitleDto,
  UpdateTaskDto,
} from '@/dto/task.dto';
import { Task } from '@/schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return await createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return existingTask;
  }

  async findByTitle(findTaskByTitleDto: FindTaskByTitleDto): Promise<Task[]> {
    return await this.taskModel
      .find({ title: findTaskByTitleDto.title })
      .exec();
  }

  async delete(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
