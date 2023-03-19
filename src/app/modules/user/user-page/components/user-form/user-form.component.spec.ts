import { UsersActions } from 'src/app/state/user/users.actions';
import { InputTextComponent } from './../../../../shared/components/input-text/input-text.component';
import { Actions, NgxsModule, ofActionDispatched } from '@ngxs/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserStateMock } from 'src/app/mocks/state/users-state-mock';
import { MockComponents } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import {
  checkTextInputControl,
  ControlType,
} from 'src/app/helpers/unit-control.helper';

const USER_MOCK = {
  name: 'Name',
  surname: 'Surname',
  age: '12',
  city: 'City',
  email: 'Email',
  id: 1,
};

describe('UserFormComponent', () => {
  let actions$: Observable<any>;
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let modalService: any;

  beforeEach(async () => {
    modalService = jasmine.createSpyObj('NzModalService', {
      closeAll: undefined,
    });

    await TestBed.configureTestingModule({
      declarations: [UserFormComponent, ...MockComponents(InputTextComponent)],
      imports: [ReactiveFormsModule, NgxsModule.forRoot([UserStateMock])],
      providers: [
        {
          provide: NzModalService,
          useValue: modalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    actions$ = TestBed.inject(Actions);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      email: new FormControl(),
      age: new FormControl(),
      city: new FormControl(),
    });
    component.user = { ...USER_MOCK };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render five controls', () => {
    checkTextInputControl('name', fixture);
    checkTextInputControl('surname', fixture);
    checkTextInputControl('email', fixture);
    checkTextInputControl('age', fixture);
    checkTextInputControl('city', fixture);

    const controls = fixture.debugElement.queryAll(
      By.css(ControlType.TEXT_INPUT)
    );
    expect(controls.length).toEqual(5);
  });

  it('should click close', () => {
    spyOn(component, 'close').and.callThrough();

    const closeBtn = fixture.debugElement.queryAll(By.css('button'))[0];
    closeBtn.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component['modalService'].closeAll)
      .withContext('should call modal service closeAll')
      .toHaveBeenCalled();
    expect(component.close).withContext('should call close').toHaveBeenCalled();
  });

  it('should click save and dispatch UsersActions.Edit', (done) => {
    spyOn(component, 'save').and.callThrough();
    actions$.pipe(ofActionDispatched(UsersActions.Edit)).subscribe((action) => {
      expect(action?.user).toEqual(USER_MOCK);
      done();
    });

    const saveBtn = fixture.debugElement.queryAll(By.css('button'))[1];
    saveBtn.triggerEventHandler('click');

    expect(component.save).toHaveBeenCalled();
  });

  it('should click save and dispatch UsersActions.Create', (done) => {
    const newUser = { ...USER_MOCK, id: null };
    component.user = newUser;
    spyOn(component, 'save').and.callThrough();
    actions$
      .pipe(ofActionDispatched(UsersActions.Create))
      .subscribe((action) => {
        expect(action?.user).toEqual(newUser);
        done();
      });

    const saveBtn = fixture.debugElement.queryAll(By.css('button'))[1];
    saveBtn.triggerEventHandler('click');

    expect(component.save).toHaveBeenCalled();
  });
});
