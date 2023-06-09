import { ButtonType } from './../../shared/components/button/button.component';
import { UsersActions } from 'src/app/state/user/users.actions';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserFormComponent } from './components/user-form/user-form.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  buttonTypes = ButtonType;

  constructor(private modalService: NzModalService, private store: Store) {}

  ngOnInit() {}

  create() {
    this.modalService.create({
      nzTitle: 'Create',
      nzContent: UserFormComponent,
      nzFooter: null,
    });
  }

  deleteAll() {
    this.modalService.create({
      nzTitle: 'Delete all',
      nzContent: 'Are you sure you want to delete all users?',
      nzOnOk: () => {
        this.store.dispatch(new UsersActions.DeleteAll());
      },
    });
  }
}
