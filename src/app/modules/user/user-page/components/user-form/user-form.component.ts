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

  constructor(private fb: FormBuilder, private modalService: NzModalService) {}

  ngOnInit() {
    this.setFromGroup();
  }

  save() {
    // TODO - dispatch action
    this.modalService.closeAll();
  }

  close() {
    this.modalService.closeAll();
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
