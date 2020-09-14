/* describe('my test', () => {
  it('returns true', () => {
    expect(true).toEqual(true);
  });
}); */

// feature
class FriendsList {
  friends: Array<string> = [];

  addFriend(name: string): void {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name: string): void {
    // console.log(`${name} is now a friend!`);
  }

  removeFriend(name: string): void {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found!');
    }

    this.friends.splice(idx, 1);
  }

  async findFriend(name: string): Promise<string> {
    return new Promise(resolve => {
      const idx = this.friends.indexOf(name);

      if (idx === -1) {
        throw new Error('Friend not found!');
      }

      resolve(this.friends[idx]);
    });
  }
}

// tests
describe('FriendsList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('Sally');

    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    // mock function
    friendsList.announceFriendship = jest.fn();

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Sally');
    expect(friendsList.announceFriendship).toHaveBeenCalled();
    expect(friendsList.announceFriendship).toHaveBeenCalledTimes(1);
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Sally');
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('Sally');

      expect(friendsList.friends[0]).toEqual('Sally');
      friendsList.removeFriend('Sally');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throws an error as friend does not exist', () => {
      const resultFn = () => friendsList.removeFriend('Sally');

      expect(resultFn).toThrow();
      expect(resultFn).toThrow(Error);
      expect(resultFn).toThrow(new Error('Friend not found!'));
      expect(resultFn).toThrowError('Friend not found!');
    });
  });

  describe('findFriend', () => {
    beforeEach(() => {
      friendsList.addFriend('Sally');
      friendsList.addFriend('Alice');
    });

    it('find a friend from the list', () => {
      const resultPromise = friendsList.findFriend('Alice');
      expect(resultPromise).resolves.toEqual('Alice');
    });

    it('find a friend from the list 2', async () => {
      const result = await friendsList.findFriend('Alice');
      expect(result).toEqual('Alice');
    });

    it('throws an error as friend does not exist', () => {
      const resultPromise = friendsList.findFriend('Kimberly');
      expect(resultPromise).rejects.toThrow(Error);
    });

    it('throws an error as friend does not exist 2', async () => {
      try {
        await friendsList.findFriend('Kimberly');
      } catch (error) {
        expect(error).toEqual(new Error('Friend not found!'));
      }
    });
  });
});
