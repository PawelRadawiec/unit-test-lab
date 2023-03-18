import { User } from './../../../../../models/user.model';
import { UsersActions } from 'src/app/state/user/users.actions';
import { Store } from '@ngxs/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user!: User;
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private store: Store
  ) {}

  ngOnInit() {
    this.setFromGroup();
  }

  close() {
    this.modalService.closeAll();
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const { id } = this.user ?? {};
    const request = { ...this.user, ...this.formGroup.getRawValue() };
    const action = id
      ? new UsersActions.Edit(request)
      : new UsersActions.Create(request);
    this.store.dispatch(action);
  }

  setFromGroup() {
    this.formGroup = this.fb.group({
      name: [this.user?.name, Validators.required],
      surname: [this.user?.surname, Validators.required],
      email: [this.user?.email, Validators.required],
      age: [this.user?.age, Validators.required],
      city: [this.user?.city, Validators.required],
    });
  }
}
