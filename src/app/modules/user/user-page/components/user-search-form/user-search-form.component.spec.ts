import { ReactiveFormsModule } from '@angular/forms';
import { UserStateMock } from 'src/app/mocks/state/users-state-mock';
import { NgxsModule, Actions } from '@ngxs/store';
import { InputTextComponent } from './../../../../shared/components/input-text/input-text.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { checkTextInputControl } from 'src/app/helpers/unit-control.helper';

import { UserSearchFormComponent } from './user-search-form.component';
import { Observable } from 'rxjs';

describe('UserSearchFormComponent', () => {
  let actions$: Observable<any>;
  let component: UserSearchFormComponent;
  let fixture: ComponentFixture<UserSearchFormComponent>;

  beforeEach(async () => {
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

  //   const [nameInput, surnameInput] = fixture.debugElement.queryAll(
  //     By.css('input')
  //   );
  //   nameInput.nativeElement.value = 'John';
  //   nameInput.nativeElement.dispatchEvent(new Event('input'));

  //   surnameInput.nativeElement.value = 'Surname';
  //   surnameInput.nativeElement.dispatchEvent(new Event('input'));
  // });
});
