import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { UserStateMock } from 'src/app/mocks/state/users-state-mock';
import { NgxsModule, Actions } from '@ngxs/store';
import { InputTextComponent } from './../../../../shared/components/input-text/input-text.component';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
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

  it('should set name and dispatch UsersActions.Search', waitForAsync(() => {
    spyOn(component, 'handleFormChanges').and.callThrough();

    const nameInput = fixture.debugElement.queryAll(By.css('input'))[0];
    nameInput.nativeElement.value = 'John';
    nameInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(component.handleFormChanges).toHaveBeenCalled();
    });
  }));

  it('should set surname and dispatch UsersActions.Search', waitForAsync(() => {
    spyOn(component, 'handleFormChanges').and.callThrough();

    const nameInput = fixture.debugElement.queryAll(By.css('input'))[1];
    nameInput.nativeElement.value = 'Surname';
    nameInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(component.handleFormChanges).toHaveBeenCalled();
    });
  }));
});
