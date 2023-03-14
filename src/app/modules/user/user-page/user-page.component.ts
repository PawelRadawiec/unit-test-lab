import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserFormComponent } from './components/user-form/user-form.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private modalService: NzModalService) { }

  ngOnInit() {
  }

  create() {
    this.modalService.create({
      nzTitle: 'Create',
      nzContent: UserFormComponent,
      nzFooter: null,
    });
  }
}
