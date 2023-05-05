import { UsersActions } from 'src/app/state/user/users.actions';
import {
  combineLatest,
  debounceTime,
  Subject,
  takeUntil,
  Observable,
  startWith,
  skip,
  tap,
} from 'rxjs';
import { Store } from '@ngxs/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.scss'],
})
export class UserSearchFormComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  destroy$ = new Subject<void>();

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.setSearchForm();
    combineLatest([
      this.getValueChanges('name'),
      this.getValueChanges('surname'),
    ])
      .pipe(tap((data) => {
        console.log('data:', data);
      }),skip(1), takeUntil(this.destroy$))
      .subscribe((data) => this.handleFormChanges(...data));
  }

  ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
  }

  handleFormChanges(name: string, surname: string) {
    console.log('name: ', name, 'surname: ', surname);
    this.store.dispatch(new UsersActions.Search({ name, surname }));
  }

  setSearchForm() {
    this.searchForm = this.fb.group({
      name: [],
      surname: [],
    });
  }

  getValueChanges(controlName: string): Observable<string> {
    return this.searchForm
      ?.get(controlName)
      ?.valueChanges.pipe(startWith(null), debounceTime(5_00));
  }
}
