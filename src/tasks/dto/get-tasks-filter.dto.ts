import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';

// import { TaskStatus } from '../task.model';
import { TaskStatus } from '../utils/task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
