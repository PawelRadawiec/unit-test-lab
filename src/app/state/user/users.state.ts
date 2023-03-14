import { User } from './../../models/user.model';
import { Selector, State } from '@ngxs/store';
import { Injectable } from '@angular/core';

export interface UsersState {
  users: User[];
}

@State<UsersState>({
  name: 'users',
  defaults: {
    users: [],
  },
})
@Injectable()
export class UsersState {
    
  @Selector()
  static users(state: UsersState) {
    return state.users;
  }
  
}
