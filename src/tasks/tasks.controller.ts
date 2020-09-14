import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
// import { Task, TaskStatus } from './task.model';
import { Task } from './task.entity';
import { TaskStatus } from './utils/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetUser } from '../auth/utils/get-user.decorator';
import { User } from '../auth/user.entity';

@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  // TasksController (for DB)
  constructor(private tasksService: TasksService) {}

  // Get Tasks
  @Get()
  // @UsePipes(ValidationPipe)
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `getTasks(): User "${
        user.username
      }" retrieving all Tasks. Filters: ${JSON.stringify(filterDto)}`,
    );

    return this.tasksService.getTasks(filterDto, user);
  }

  // Get a Task by Id
  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `getTaskById(): User "${user.username}" retrieving a specific Task with id "${id}"`,
    );

    return this.tasksService.getTaskById(id, user);
  }

  // Create a new Task
  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `createTask(): User "${
        user.username
      }" creating a new task. Data: ${JSON.stringify(createTaskDto)}`,
    );

    return this.tasksService.createTask(createTaskDto, user);
  }

  // Delete a Task by Id
  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `deleteTask(): User "${user.username}" deleting a specific Task with id "${id}"`,
    );

    return this.tasksService.deleteTask(id, user);
  }

  // Update Task Status by Id
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `updateTaskStatus(): User "${user.username}" updating status of a specific Task with id "${id}" to "${status}"`,
    );

    return this.tasksService.updateTaskStatus(id, status, user);
  }

  // TasksController (for In-Memory)
  /* 
  constructor(private tasksService: TasksService) {}

  // Get Tasks
  @Get()
  // @UsePipes(ValidationPipe)
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    console.log('\nTasksController.getTasks() triggered -->');

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  // Get a Task by Id
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    console.log('\nTasksController.getTaskById() triggered -->');

    return this.tasksService.getTaskById(id);
  }

  // Create a new Task
  // Type - 1 - plain
  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   console.log('\nTasksController.createTask() triggered -->');
  //   console.log('title: ', title);
  //   console.log('description: ', description);

  //   return this.tasksService.createTask({ title, description });
  // }

  // Type - 2 - using Dto
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log('\nTasksController.createTask() triggered -->');
    console.log('createTaskDto: ', createTaskDto);

    return this.tasksService.createTask(createTaskDto);
  }

  // Delete a Task by Id
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    console.log('\nTasksController.deleteTask() triggered -->');

    this.tasksService.deleteTask(id);
  }

  // Update Task Status by Id
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    console.log('\nTasksController.updateTaskStatus() triggered -->');

    return this.tasksService.updateTaskStatus(id, status);
  } 
  */
}
