import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(createTaskDto);
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(id: string) {
    const taskFind = await this.tasksRepository.findOne({ where: { id } });
    if (!taskFind)
      throw new NotFoundException(
        `La tarea con id #${id} no ha sido encontrada o ha sido eliminada`,
      );
    return taskFind;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    const newTask = Object.assign(task, updateTaskDto);

    await this.tasksRepository.update({ id }, newTask);
    return newTask;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.tasksRepository.delete({ id });
    return 'Tarea eliminada con éxito';
  }
}
