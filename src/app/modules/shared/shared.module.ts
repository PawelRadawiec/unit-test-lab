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

const ngZorroModules = [
  NzIconModule,
  NzListModule,
  NzButtonModule,
  NzTableModule,
  NzDividerModule,
  NzModalModule,
  NzInputModule
]


@NgModule({
  declarations: [
    InputTextComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...ngZorroModules
  ],
  exports: [...ngZorroModules, InputTextComponent]
})
export class SharedModule { }
