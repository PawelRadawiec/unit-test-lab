import { Component, forwardRef, Input, OnDestroy, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

export const CUSTOM_CONROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputTextComponent),
  multi: true,
};

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [CUSTOM_CONROL_VALUE_ACCESSOR],
})
export class InputTextComponent implements ControlValueAccessor, OnDestroy {
  @Input() placeholder = 'placeholder';
  formControl = new FormControl();

  constructor() {}

  destory$ = new Subject<void>();
  onTouched: any = () => {};

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }

  registerOnChange(fn: any) {
    this.formControl.valueChanges.pipe(takeUntil(this.destory$)).subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.formControl.setValue(value);
  }
}
