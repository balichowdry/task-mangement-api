import { NewTask } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(NewTask)
export class TaskRepository extends Repository<NewTask> {}
