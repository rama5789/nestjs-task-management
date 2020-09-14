import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './utils/task-status.enum';

// mock data
const mockUser = { id: 12, username: 'user12' };
const mockTaskRepository = () => ({
  // user-defined
  getTasks: jest.fn(),
  createTask: jest.fn(),

  // pre-defined
  findOne: jest.fn(),
  delete: jest.fn(),
});

// tests
describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      // for sync calls
      // taskRepository.getTasks.mockReturnValue();
      // for async promises
      taskRepository.getTasks.mockResolvedValue('Some Tasks');
      // taskRepository.getTasks.mockRejectedValue();

      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const mockFilters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some Search Query',
      };
      const result = await tasksService.getTasks(mockFilters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('Some Tasks');
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and returns a specific task', async () => {
      const mockTask = {
        id: 1,
        title: 'title1',
        description: 'description1',
      };
      taskRepository.findOne.mockResolvedValue(mockTask);

      expect(taskRepository.findOne).not.toHaveBeenCalled();
      const result = await tasksService.getTaskById(1, mockUser);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
      expect(result).toEqual(mockTask);
    });

    it('throws an error as task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);

      const resultPromise = tasksService.getTaskById(1, mockUser);
      expect(resultPromise).rejects.toThrow(NotFoundException);
      expect(resultPromise).rejects.toThrowError('Task with ID "1" not found');
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.createTask() and returns the result', async () => {
      const createTaskDto = {
        title: 'title1',
        description: 'description1',
      };
      taskRepository.createTask.mockResolvedValue('Some Task');

      expect(taskRepository.createTask).not.toHaveBeenCalled();
      const result = await tasksService.createTask(createTaskDto, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalledWith(
        createTaskDto,
        mockUser,
      );
      expect(result).toEqual('Some Task');
    });
  });

  describe('deleteTask', () => {
    it('calls taskRepository.delete() to delete a task', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });

      expect(taskRepository.delete).not.toHaveBeenCalled();
      await tasksService.deleteTask(1, mockUser);
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: 1,
        userId: mockUser.id,
      });
    });

    it('throws an error as task is not found', () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });

      const resultPromise = tasksService.deleteTask(1, mockUser);
      expect(resultPromise).rejects.toThrow(
        new NotFoundException('Task with ID "1" not found'),
      );
    });
  });

  describe('updateTaskStatus', () => {
    it('updates task status', async () => {
      const save = jest.fn().mockResolvedValue(true);
      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
        save,
      });

      expect(tasksService.getTaskById).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
      const result = await tasksService.updateTaskStatus(
        1,
        TaskStatus.DONE,
        mockUser,
      );
      expect(tasksService.getTaskById).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.DONE);
    });
  });
});
