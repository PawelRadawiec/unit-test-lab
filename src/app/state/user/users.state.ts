import { UsersService } from './../../services/users.service';
import { User } from './../../models/user.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UsersActions } from './users.actions';
import { tap } from 'rxjs';

export interface UsersStateModel {
  users: User[];
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
  },
})
@Injectable()
export class UsersState {
  constructor(private usersService: UsersService) {}

  @Selector()
  static users(state: UsersStateModel) {
    return state.users;
  }

  @Action(UsersActions.List)
  list(ctx: StateContext<UsersStateModel>) {
    return this.usersService.list().pipe(
      tap((users) => {
        ctx.patchState({
          users,
        });
      })
    );
  }
}
