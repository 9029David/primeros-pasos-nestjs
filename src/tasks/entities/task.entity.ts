import { TaskStatus } from '../enum/TaskStatus.enum';

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
