import { makeAutoObservable } from 'mobx';

import { User } from '@/src/shared/models';

export default class UsersStore {
  private users = new Map<User['email'], User>();
  private currentUserEmail: User['email'] | null = null;

  constructor() {
    makeAutoObservable(this);
    this.addUser({
      email: 'user@example.com',
      password: 'pass',
      name: 'Иван',
      phone: '9999999999',
    });
  }

  addUser(newUser: User) {
    this.users.set(newUser.email, newUser);
  }

  getUser(email: string) {
    return this.users.get(email);
  }

  setCurrentUserEmail(email: User['email'] | null) {
    this.currentUserEmail = email;
  }

  getCurrentUser() {
    return this.currentUserEmail
      ? this.users.get(this.currentUserEmail)
      : undefined;
  }
}
