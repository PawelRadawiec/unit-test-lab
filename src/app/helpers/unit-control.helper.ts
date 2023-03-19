import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export enum ControlType {
  TEXT_INPUT = 'app-input-text',
}

export function checkTextInputControl(
  controlName: string,
  fixture: ComponentFixture<any>
) {
  return checkControl(controlName, ControlType.TEXT_INPUT, fixture);
}

export function checkControl(
  controlName: string,
  type: ControlType,
  fixture: ComponentFixture<any>
) {
  const control = fixture.debugElement.query(
    By.css(`${type}[formControlName=${controlName}]`)
  );
  expect(control)
    .withContext(`should render ${type} with formControlName=${controlName}`)
    .toBeTruthy();
}
