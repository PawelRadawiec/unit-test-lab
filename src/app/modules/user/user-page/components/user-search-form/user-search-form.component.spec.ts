import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { UserStateMock } from 'src/app/mocks/state/users-state-mock';
import { NgxsModule, Actions, ofActionDispatched } from '@ngxs/store';
import { InputTextComponent } from './../../../../shared/components/input-text/input-text.component';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { checkTextInputControl } from 'src/app/helpers/unit-control.helper';

import { UserSearchFormComponent } from './user-search-form.component';
import { Observable } from 'rxjs';
import { UsersActions } from 'src/app/state/user/users.actions';

describe('UserSearchFormComponent', () => {
  let actions$: Observable<any>;
  let component: UserSearchFormComponent;
  let fixture: ComponentFixture<UserSearchFormComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [UserSearchFormComponent, InputTextComponent],
  //     imports: [NgxsModule.forRoot([UserStateMock]), ReactiveFormsModule],
  //     providers: [],
  //   }).compileComponents();

  //   fixture = TestBed.createComponent(UserSearchFormComponent);
  //   actions$ = TestBed.inject(Actions);
  //   component = fixture.componentInstance;
  //   component.debounceTimeConfig = { time: 0 };
  //   fixture.detectChanges();
  // });

  // workaround in order to fix debounceTime bug in fakeAsync https://github.com/angular/angular/issues/44351#issuecomment-991873075
  const beforeEachTest = () => {
    TestBed.configureTestingModule({
      declarations: [UserSearchFormComponent, InputTextComponent],
      imports: [NgxsModule.forRoot([UserStateMock]), ReactiveFormsModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSearchFormComponent);
    actions$ = TestBed.inject(Actions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create', () => {
    beforeEachTest();
    expect(component).toBeTruthy();
  });

  it('should create search form', () => {
    beforeEachTest();
    checkTextInputControl('name', fixture);
    checkTextInputControl('surname', fixture);
  });

  it('should dispatch UsersActions.Search', fakeAsync(() => {
    beforeEachTest();
    spyOn(component, 'handleSearchTerms').and.callThrough();
    actions$
      .pipe(ofActionDispatched(UsersActions.Search))
      .subscribe((action) => {
        expect(action.terms).toEqual({ name: 'John', surname: null });
      });
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[0];
    nameInput.nativeElement.value = 'John';
    nameInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick(500);

    expect(component.handleSearchTerms).toHaveBeenCalled();
  }));
});
