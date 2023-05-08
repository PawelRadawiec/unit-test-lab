import { UserInfoComponent } from './user-page/user-info/user-info.component';
import { USER_ROUTES } from './user-routing.module';
import { HeaderComponent } from './../core/components/header/header.component';
import { AppComponent } from './../../app.component';
import { UserPageComponent } from './user-page/user-page.component';

import { MockComponents } from 'ng-mocks';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserListResolver } from 'src/app/resolvers/user-list.resolver';

describe('UserRoutingModule', () => {
  let location: Location;
  let router: Router;
  let fixture: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponents(
          UserPageComponent,
          UserDetailsPageComponent,
          HeaderComponent,
          UserInfoComponent
        ),
      ],
      imports: [RouterTestingModule.withRoutes(USER_ROUTES)],
      providers: [
        {
          provide: UserListResolver,
          useValue: jasmine.createSpyObj('UserListResolver', ['resolve']),
        },
      ],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('should navigate to user list', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toEqual('/');
  }));

  it('should navigate to user details', fakeAsync(() => {
    router.navigate(['details']);
    tick();
    expect(location.path()).toEqual('/details');
  }));

  it('should navigate to user info', fakeAsync(() => {
    const id = 1;
    router.navigate(['info', id]);
    tick();
    expect(location.path()).toEqual(`/info/${id}`);
  }));
});
