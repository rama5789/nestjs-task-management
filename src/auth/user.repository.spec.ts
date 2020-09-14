import { Test } from '@nestjs/testing';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from './user.repository';
import { User } from './user.entity';

// mock data
const mockAuthCredentialsDto = { username: 'user1', password: 'Password1' };

// tests
describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully signs up the user', async () => {
      save.mockResolvedValue(undefined);

      expect(save).not.toHaveBeenCalled();
      const resultPromise = userRepository.signUp(mockAuthCredentialsDto);
      await expect(resultPromise).resolves.not.toThrow();
      expect(save).toHaveBeenCalled();
    });

    it('throws conflict exception as username already exists', async () => {
      save.mockRejectedValue({ code: '23505' });

      const resultPromise = userRepository.signUp(mockAuthCredentialsDto);
      await expect(resultPromise).rejects.toThrow(ConflictException);
    });

    it('throws internal server exception for unhandled errors', async () => {
      save.mockRejectedValue({ code: 'Other error codes' });

      const resultPromise = userRepository.signUp(mockAuthCredentialsDto);
      await expect(resultPromise).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('validateUserPassword', () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();

      user = new User();
      user.username = 'user1';
      user.validatePassword = jest.fn();
    });

    it('returns the username as validation is successful', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      expect(userRepository.findOne).not.toHaveBeenCalled();
      expect(user.validatePassword).not.toHaveBeenCalled();
      const result = await userRepository.validateUserPassword(
        mockAuthCredentialsDto,
      );
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toEqual('user1');
    });

    it('returns null as user cannot be found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      const result = await userRepository.validateUserPassword(
        mockAuthCredentialsDto,
      );
      expect(user.validatePassword).not.toHaveBeenCalled();
      // expect(result).toEqual(null);
      expect(result).toBeNull();
    });

    it('returns null as password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);

      const result = await userRepository.validateUserPassword(
        mockAuthCredentialsDto,
      );
      expect(result).toBeNull();
    });
  });

  describe('hashPassword', () => {
    it('calls bcrypt.hash to generate a hash', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('testHash');

      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await userRepository.hashPassword(
        'testPassword',
        'testSalt',
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt');
      expect(result).toEqual('testHash');
    });
  });
});
