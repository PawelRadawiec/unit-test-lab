import { UsersActions } from 'src/app/state/user/users.actions';
import {
  combineLatest,
  debounceTime,
  Subject,
  takeUntil,
  Observable,
  startWith,
} from 'rxjs';
import { Store } from '@ngxs/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.scss'],
})
export class UserSearchFormComponent implements OnInit {
  searchForm!: FormGroup;
  destroy$ = new Subject<void>();

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.setSearchForm();
    combineLatest([
      this.getValueChanges('name'),
      this.getValueChanges('surname'),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => this.handleFormChanges(...data));
  }

  handleFormChanges(name: string, surname: string) {
    this.store.dispatch(new UsersActions.Search({ name, surname }));
  }

  setSearchForm() {
    this.searchForm = this.fb.group({
      name: [],
      surname: [],
    });
  }

  getValueChanges(controlName: string): Observable<any> {
    return (
      this.searchForm
        ?.get(controlName)
        ?.valueChanges.pipe(startWith(null), debounceTime(5_00))
    );
  }
}
