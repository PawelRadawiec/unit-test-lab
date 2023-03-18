import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerUserComponent } from './drawer-user.component';

xdescribe('DrawerUserComponent', () => {
  let component: DrawerUserComponent;
  let fixture: ComponentFixture<DrawerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
