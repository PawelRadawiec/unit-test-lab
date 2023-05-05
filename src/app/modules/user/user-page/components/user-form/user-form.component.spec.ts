import { ButtonComponent } from './../../../../shared/components/button/button.component';
import { UsersActions } from 'src/app/state/user/users.actions';
import { InputTextComponent } from './../../../../shared/components/input-text/input-text.component';
import { Actions, NgxsModule, ofActionDispatched } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';
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
  setInputFieldValue,
} from 'src/app/helpers/unit-control.helper';
import { DebugElement } from '@angular/core';

const USER_MOCK = {
  name: 'Name',
  surname: 'Surname',
  age: '12',
  city: 'City',
  email: 'Email',
  id: 1,
};

/*
  describe - is jasmine function which create suite spec tests for specific component, divide tests into multiple parts
*/

describe('UserFormComponent', () => {
  let actions$: Observable<any>;
  /* 
    Component instance returned by ComponentFixture which is mainly used for:
      - set inputs
      - get referance to inner values, methods
  */
  let component: UserFormComponent;
  /* 
   ComponentFixture is a wrapper form component and template. It's provide referance to:
    - component instance passed into TestBed.createComponent()
    - debug element by which we have access to the rendered DOM
  */
  let fixture: ComponentFixture<UserFormComponent>;
  /*
    Instance of NzModalService which is injected into UserFormComponent
  */
  let modalService: NzModalService;

  /*
    Provide access to elements in the DOM. 
    - wraps the native DOM element and return components host element <app-...></app-...>
    - offer properties like: properties, attributes, classes, classes to examine the DOM element
    - provide nativeElement
  */
  let debugElement: DebugElement;

  beforeEach(async () => {
    modalService = jasmine.createSpyObj('NzModalService', {
      closeAll: undefined,
    });

    /*
      TestBed:
       - creates environment for testing component or service
       - it's like one module per component
       - configured like normal angular module with imports, declarations, providers

       TestBed.configureTestingModule({
            imports: [Modules],
            declarations: [Components, Directives, Pipes],
            providers: [Injected dependencies like services], 
        });
    */
    await TestBed.configureTestingModule({
      declarations: [
        UserFormComponent,
        InputTextComponent,
        ...MockComponents(ButtonComponent),
      ],
      imports: [ReactiveFormsModule, NgxsModule.forRoot([UserStateMock])],
      providers: [
        {
          provide: NzModalService,
          useValue: modalService,
        },
      ],
    }).compileComponents();

    // return fixture wrapper
    fixture = TestBed.createComponent(UserFormComponent);

    actions$ = TestBed.inject(Actions);
    component = fixture.componentInstance;
    component.user = { ...USER_MOCK };
    debugElement = fixture.debugElement;

    // trigger change detection
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

    const controls = debugElement.queryAll(By.css(ControlType.TEXT_INPUT));
    expect(controls.length).toEqual(5);
  });

  it('should click close', () => {
    spyOn(component, 'close').and.callThrough();

    const closeBtn = debugElement.queryAll(By.css('app-button'))[0];
    closeBtn.triggerEventHandler('onClick');
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

    const saveBtn = debugElement.queryAll(By.css('app-button'))[1];
    saveBtn.triggerEventHandler('onClick');

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

    const saveBtn = debugElement.queryAll(By.css('app-button'))[1];
    saveBtn.triggerEventHandler('onClick');

    expect(component.save).toHaveBeenCalled();
  });

  it('should append form group', () => {
    setInputFieldValue('Name', 'name', fixture);
    setInputFieldValue('Surname', 'surname', fixture);
    setInputFieldValue('Email', 'email', fixture);
    setInputFieldValue('Age', 'age', fixture);
    setInputFieldValue('City', 'city', fixture);

    expect(component.formGroup.getRawValue())
      .withContext('form group value')
      .toEqual({
        name: 'Name',
        surname: 'Surname',
        email: 'Email',
        age: '12',
        city: 'City',
      });
  });
});
