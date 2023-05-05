import { User } from './../models/user.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFullNamePipe } from './user-full-name.pipe';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div>{{ user | fullName }}</div>`,
})
class WrapperComponent {
  user: User;
}

describe('UserFullNamePipe', () => {
  let wrapperComponent: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapperComponent, UserFullNamePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    wrapperComponent = fixture.componentInstance;
    
    wrapperComponent.user = {name: 'Name', surname: 'Surname'}

    fixture.detectChanges();
  });

  it('should transform', () => {
    const fullNameEl = fixture.debugElement.query(By.css('div'));
    console.log(fullNameEl.nativeElement);
    expect(fullNameEl.nativeElement.innerText).toEqual('Name Surname');
  });
});
