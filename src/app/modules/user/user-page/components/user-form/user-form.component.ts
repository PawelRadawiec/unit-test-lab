import { User } from './../../../../../models/user.model';
import { UsersActions } from 'src/app/state/user/users.actions';
import { Store } from '@ngxs/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  formGroup!: FormGroup;
  destroy$ = new Subject<void>();
  showCity: boolean;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private store: Store
  ) {}

  ngOnInit() {
    this.setFromGroup();
    this.countryControl?.valueChanges
      .pipe(startWith(this.countryControl.value), takeUntil(this.destroy$))
      .subscribe((country) => {
        this.showCity = !!country;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  close() {
    this.modalService.closeAll();
  }

  save() {
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
      country: [this.user?.country, Validators.required],
      city: [this.user?.city, Validators.required],
    });
  }

  get countryControl() {
    return this.formGroup?.get('country') as FormControl;
  }
}
