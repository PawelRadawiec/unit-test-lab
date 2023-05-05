import { ReactiveFormsModule } from '@angular/forms';
import { UserStateMock } from 'src/app/mocks/state/users-state-mock';
import { NgxsModule, Actions } from '@ngxs/store';
import { InputTextComponent } from './../../../../shared/components/input-text/input-text.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { checkTextInputControl } from 'src/app/helpers/unit-control.helper';

import { UserSearchFormComponent } from './user-search-form.component';
import { Observable } from 'rxjs';
import { DebugElement } from '@angular/core';

/*
  describe - is jasmine function which create suite spec tests for specific component, divide tests into multiple parts
*/

describe('UserSearchFormComponent', () => {
  let actions$: Observable<any>;
  /* 
    Component instance returned by ComponentFixture which is mainly used for:
      - set inputs
      - get referance to inner values, methods
  */
  let component: UserSearchFormComponent;
  /* 
   ComponentFixture is a wrapper form component and template. It's provide referance to:
    - component instance passed into TestBed.createComponent()
    - debug element by which we have access to the rendered DOM
  */
  let fixture: ComponentFixture<UserSearchFormComponent>;

  /*
    Provide access to elements in the DOM. 
    - wraps the native DOM element and return components host element <app-...></app-...>
    - offer properties like: properties, attributes, classes, classes to examine the DOM element
    - provide nativeElement
  */
  let debugElement: DebugElement;

  beforeEach(async () => {
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
      declarations: [UserSearchFormComponent, InputTextComponent],
      imports: [NgxsModule.forRoot([UserStateMock]), ReactiveFormsModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSearchFormComponent);
    actions$ = TestBed.inject(Actions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create search form', () => {
    checkTextInputControl('name', fixture);
    checkTextInputControl('surname', fixture);
  });

  // TODO FIX
  // it('should set name and dispatch UsersActions.Search', (done) => {
  //   spyOn(component, 'handleFormChanges').and.callThrough();
  //   actions$
  //     .pipe(ofActionDispatched(UsersActions.Search))
  //     .subscribe((action) => {
  //       expect(action.terms).toEqual({ name: 'John', surname: null });
  //       done();
  //     });

  //   const [nameInput, surnameInput] = debugElement.queryAll(
  //     By.css('input')
  //   );
  //   nameInput.nativeElement.value = 'John';
  //   nameInput.nativeElement.dispatchEvent(new Event('input'));

  //   surnameInput.nativeElement.value = 'Surname';
  //   surnameInput.nativeElement.dispatchEvent(new Event('input'));
  // });
});
