import { By } from '@angular/platform-browser';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { InputTextComponent } from './input-text.component';

@Component({
  template: ` <form [formGroup]="form">
    <app-input-text
      placeholder="NamePlaceholder"
      formControlName="name"
    ></app-input-text>
  </form>`,
})
class WrapperTestComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [],
    });
  }
}

describe('InputTextComponent', () => {
  let component: WrapperTestComponent;
  let fixture: ComponentFixture<WrapperTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapperTestComponent, InputTextComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form value from app-input-text', () => {
    const inputEl = getInput();
    inputEl.nativeElement.value = 'John';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    expect(inputEl).toBeTruthy();
    expect(component.form.get('name').value)
      .withContext('should set form value')
      .toEqual('John');
  });

  it('should set app-input-text value', () => {
    component.form.get('name').patchValue('Steve');
    const inputEl = getInput();
    expect(inputEl.nativeNode.value).toEqual('Steve');
  });

  it('should set input placeholder', () => {
    const inputEl = getInput();

    expect(inputEl.componentInstance.placeholder).toEqual('NamePlaceholder');
  });

  function getInput() {
    return fixture.debugElement.query(By.css('app-input-text input'));
  }
});
