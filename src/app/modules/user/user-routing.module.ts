import { UserInfoComponent } from './user-page/user-info/user-info.component';


import { UserPageComponent } from './user-page/user-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';
import { UserListResolver } from 'src/app/resolvers/user-list.resolver';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserPageComponent,
    resolve: [UserListResolver]
  },
  {
    path: 'details',
    component: UserDetailsPageComponent
  },
  {
    path: 'info/:id',
    component: UserInfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
