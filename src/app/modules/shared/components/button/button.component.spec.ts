import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent, ButtonType } from './button.component';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

// @Component({
//   template: ` <app-button
//     [type]="type.DANGER"
//     outline="true"
//     [text]="'Button text'"
//     (onClick)="onClick()"
//   ></app-button>`,
// })
// class WrapperTestComponent {
//   @ViewChild(ButtonComponent) button: ButtonComponent;

//   type = ButtonType;

//   onClick() {}
// }

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.type = ButtonType.DANGER;
    component.text = 'Button text';
    component.outline = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click onClick', () => {
    spyOn(component.onClick, 'next');
    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.triggerEventHandler('click');

    expect(component.onClick.next).toHaveBeenCalled();
  });

  it('should set button--outline and button--danger class', () => {
    const buttonOutline = fixture.debugElement.query(By.css('.button--outline'));
    expect(buttonOutline).withContext('button with .button--outline').toBeTruthy();
    
    const buttonDanger = fixture.debugElement.query(By.css('.button--danger'));
    expect(buttonDanger).withContext('button with .button--danger').toBeTruthy();
  })
});
