import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

// tests
describe('User Entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.password = 'testHash';
    user.salt = 'testSalt';

    bcrypt.hash = jest.fn();
  });

  describe('validatePassword', () => {
    it('returns true as password is valid', async () => {
      bcrypt.hash.mockResolvedValue('testHash');

      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('testPassword');
      expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt');
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      bcrypt.hash.mockResolvedValue('wrongHash');

      const result = await user.validatePassword('wrongPassword');
      expect(result).toEqual(false);
    });
  });
});
