import { ReactiveFormsModule } from '@angular/forms';
import { UserStateMock } from 'src/app/mocks/state/users-state-mock';
import { NgxsModule, Actions, ofActionDispatched, Store } from '@ngxs/store';
import { InputTextComponent } from './../../../../shared/components/input-text/input-text.component';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { checkTextInputControl } from 'src/app/helpers/unit-control.helper';

import { UserSearchFormComponent } from './user-search-form.component';
import { Observable, skip } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UsersActions } from 'src/app/state/user/users.actions';

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

  let store: Store;

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
    debugElement = fixture.debugElement;
    actions$ = TestBed.inject(Actions);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create search form', () => {
    fixture.detectChanges();
    checkTextInputControl('name', fixture);
    checkTextInputControl('surname', fixture);
  });

  /*
     Execute test in fake async test zone.. FakeAsync is special zone which let us test asynchronous code in a synchronous way
     Execute test in fake async test zone which:
     - detect microtask and macrotask, 
     - execute all microtasks using flushMicrotasks()
     - simulates passage of time by using tick() function
  */

  it('[fakeAsync function setTimeout]', fakeAsync(() => {
    let test = false;

    const timeout = setTimeout(() => {
      test = true;
    }, 1000);

    tick(1000);

    expect(test).toBeTrue();
    clearTimeout(timeout);
  }));

  it('[fakaAsync function] should set name and dispatch UsersActions.Search', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
    tick(500);

    const [nameInput, surnameInput] = debugElement.queryAll(By.css('input'));
    nameInput.nativeElement.value = 'John';
    nameInput.nativeElement.dispatchEvent(new Event('input'));

    surnameInput.nativeElement.value = 'Surname';
    surnameInput.nativeElement.dispatchEvent(new Event('input'));

    tick(500);

    expect(dispatchSpy.calls.all()[0].args[0]).toEqual(
      new UsersActions.Search({
        name: 'John',
        surname: null,
      })
    );

    expect(dispatchSpy.calls.all()[1].args[0]).toEqual(
      new UsersActions.Search({
        name: 'John',
        surname: 'Surname',
      })
    );
  }));

  /*
    Wrap test in fake async test zone. Using fixture.whenStable() it will wait for all microtasks and macrotasks. 
   */

  it('[waitForAsync function] should set name and dispatch UsersActions.Search', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const [nameInput, surnameInput] = debugElement.queryAll(By.css('input'));

      nameInput.nativeElement.value = 'John';
      nameInput.nativeElement.dispatchEvent(new Event('input'));

      surnameInput.nativeElement.value = 'Surname';
      surnameInput.nativeElement.dispatchEvent(new Event('input'));

      actions$
        .pipe(ofActionDispatched(UsersActions.Search), skip(1))
        .subscribe((action) => {
          expect(action.terms).toEqual({ name: 'John', surname: 'Surname' });
        });
    });
  }));
});
