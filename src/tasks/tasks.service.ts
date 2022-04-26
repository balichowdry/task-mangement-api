import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { NewTask } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Repository } from 'typeorm';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  // constructor(
  //   @InjectRepository(TaskRepository)
  //   taskRepository: TaskRepository,
  // ) {}

  private tasks: Task[] = [];
  TaskRepository: any;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filerDto: GetTasksFilterDto): Task[] {
    const { status, search } = filerDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getTasksById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  async createNewTask(createTaskDto: CreateTaskDto): Promise<NewTask> {
    const { title, description } = createTaskDto;

    const task = new NewTask();
    task.title = title;
    task.description = description;
    console.log(description);
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }

  deleteTaskById(id: string): void {
    // const found = this.getTasksById(id);
    // this.tasks = this.tasks.filter((task) => task.id !== found.id);
    const task = new NewTask();
    const result = this.TaskRepository;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTasksById(id);
    task.status = status;
    return task;
  }
}
