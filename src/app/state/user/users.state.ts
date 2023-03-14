import { UsersService } from './../../services/users.service';
import { User } from './../../models/user.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UsersActions } from './users.actions';
import { tap } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  constructor(
    private usersService: UsersService,
    private modalSerice: NzModalService
  ) {}

  @Selector()
  static users(state: UsersStateModel) {
    return state.users;
  }

  @Action(UsersActions.Create)
  Create(ctx: StateContext<UsersStateModel>, { user }: UsersActions.Create) {
    return this.usersService.create(user).pipe(
      tap((user) => {
        this.modalSerice.closeAll();
        ctx.patchState({
          users: [...ctx.getState().users, user]
        })
      })
    );
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
