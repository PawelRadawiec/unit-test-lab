import { User } from './../../../../../models/user.model';
import { UsersState } from './../../../../../state/user/users.state';
import { UserFormComponent } from './../user-form/user-form.component';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Select, Store } from '@ngxs/store';
import { UsersActions } from 'src/app/state/user/users.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Select(UsersState.users) users$!: Observable<any>;

  constructor(private modalService: NzModalService, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new UsersActions.List());
  }

  edit() {
    this.modalService.create({
      nzTitle: 'Edit',
      nzContent: UserFormComponent,
      nzFooter: null,
    });
  }

  delete() {
    this.modalService.create({
      nzTitle: 'Delete',
      nzContent: 'Delete user',
    });
  }
}
