import { makeAutoObservable } from 'mobx';

import { User } from '@/src/shared/models';

export default class UsersStore {
  private users = new Map<User['email'], User>();
  private currentUser: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addUser(newUser: User) {
    this.users.set(newUser.email, newUser);
  }

  getUser(email: string) {
    return this.users.get(email);
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
