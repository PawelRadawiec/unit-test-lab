import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InputTextComponent } from './components/input-text/input-text.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from 'src/app/state/user/users.state';
import { environment } from 'src/environments/environment';
import { NzFormModule } from 'ng-zorro-antd/form';

const ngZorroModules = [
  NzIconModule,
  NzListModule,
  NzButtonModule,
  NzTableModule,
  NzDividerModule,
  NzModalModule,
  NzInputModule,
  NzFormModule,
];

@NgModule({
  declarations: [InputTextComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...ngZorroModules,

    NgxsSelectSnapshotModule,
    NgxsModule.forRoot([UsersState], {
      developmentMode: !environment.production,
    }),
  ],
  exports: [...ngZorroModules, InputTextComponent],
})
export class SharedModule {}
