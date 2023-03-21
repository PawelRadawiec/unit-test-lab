import { MockComponents } from 'ng-mocks';
import { UserStateMock } from 'src/app/mocks/state/users-state-mock';
import { NgxsModule } from '@ngxs/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { By } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'nz-table',
  template: `<ng-content></ng-content>`,
})
class NzTableMock implements OnInit {
  @Input() nzData: any;
  data: any;

  ngOnInit() {
    this.data = this.nzData;
  }
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let modalService: any;

  beforeEach(async () => {
    modalService = jasmine.createSpyObj('NzModalService', {
      create: undefined,
    });

    await TestBed.configureTestingModule({
      declarations: [
        UserListComponent,
        NzTableMock,
        MockComponents(NzDividerComponent),
      ],
      providers: [
        {
          provide: NzModalService,
          useValue: modalService,
        },
      ],
      imports: [NgxsModule.forRoot([UserStateMock])],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click edit', () => {
    const user = {
      name: 'Jan',
      surname: 'Nowak',
      email: 'jan@gmail.com',
      age: '12',
      city: 'City',
      id: 1,
    };
    spyOn(component, 'edit').and.callThrough();

    const editIcon = getFirstRow().queryAll(By.css('.table__icon'))[0];
    editIcon.triggerEventHandler('click');

    expect(component.edit).toHaveBeenCalled();
    expect(component['modalService'].create).toHaveBeenCalledOnceWith({
      nzTitle: 'Edit',
      nzContent: UserFormComponent,
      nzComponentParams: { user },
      nzFooter: null,
    });
  });

  it('should click delete', () => {
    spyOn(component, 'delete').and.callThrough();

    const editIcon = getFirstRow().queryAll(By.css('.table__icon'))[1];
    editIcon.triggerEventHandler('click');

    expect(component.delete).toHaveBeenCalled();
    expect(component['modalService'].create).toHaveBeenCalledWith({
      nzTitle: 'Delete',
      nzContent: `Delete Jan Nowak`,
      nzOnOk: jasmine.any(Function),
    });
  });

  it('should render table', () => {
    const table = fixture.debugElement.query(By.css('table'));
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    const rowsData = rows[0].queryAll(By.css('td'));

    expect(table).withContext('table').toBeTruthy();
    expect(rows.length).withContext('should render body rows tr').toEqual(2);

    expect(rowsData?.[0]?.nativeElement?.innerText)
      .withContext('Name')
      .toEqual('Jan');
    expect(rowsData?.[1]?.nativeElement?.innerText)
      .withContext('Surname')
      .toEqual('Nowak');
    expect(rowsData?.[2]?.nativeElement?.innerText)
      .withContext('Email')
      .toEqual('jan@gmail.com');
    expect(rowsData?.[3]?.nativeElement?.innerText)
      .withContext('Age')
      .toEqual('12');
  });

  function getFirstRow() {
    return fixture.debugElement.query(By.css('tbody tr'));
  }
});
