import { UsersActions } from 'src/app/state/user/users.actions';
import { Store } from '@ngxs/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
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
    this.store.dispatch(new UsersActions.Create(this.formGroup.getRawValue()));
  }

  setFromGroup() {
    this.formGroup = this.fb.group({
      name: [],
      surname: [],
      email: [],
      age: [],
      city: [],
    });
  }
}
