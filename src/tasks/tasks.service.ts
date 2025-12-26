import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enum/TaskStatus.enum';
import { v4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1099135c-c73d-4968-8edd-c9339a27c313',
      title: 'Mi primera tarea',
      description: 'Tengo que hacerla a las 3PM',
      status: TaskStatus.PENDING,
    },
  ];
  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: v4(),
      title: title,
      description: description,
      status: TaskStatus.PENDING,
    };

    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: string) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task)
      throw new NotFoundException(
        `La tarea con id #${id} no ha sido encontrada o ha sido eliminada`,
      );
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);
    const newTask = Object.assign(task, updateTaskDto);

    this.tasks = this.tasks.map((t) => (t.id === id ? newTask : t));
    return newTask;
  }

  remove(id: string) {
    this.findOne(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
