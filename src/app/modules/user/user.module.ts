import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './user-page/user-page.component';
import { UserFormComponent } from './user-page/components/user-form/user-form.component';
import { UserListComponent } from './user-page/components/user-list/user-list.component';
import { DrawerUserComponent } from './user-page/components/drawer-user/drawer-user.component';


@NgModule({
  declarations: [
    UserPageComponent,
    UserFormComponent,
    UserListComponent,
    DrawerUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
