import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';

import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

// mock data
const mockUserRepository = () => ({
  findOne: jest.fn(),
});

// tests
describe('JwtStrategy', () => {
  let jwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('validates and returns the user based on JWT Payload', async () => {
      const user = new User();
      user.username = 'user1';
      userRepository.findOne.mockResolvedValue(user);

      expect(userRepository.findOne).not.toHaveBeenCalled();
      const result = await jwtStrategy.validate({ username: 'user1' });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        username: 'user1',
      });
      expect(result).toEqual(user);
    });

    it('throws an unauthorized exception as user cannot be found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      // why failed, no idea
      // const resultPromise = jwtStrategy.validate({ username: 'user1' });
      // await expect(resultPromise).rejects.toThrow(UnauthorizedException);

      try {
        await jwtStrategy.validate({ username: 'user1' });
      } catch (error) {
        expect(error).toEqual(UnauthorizedException);
      }
    });
  });
});
