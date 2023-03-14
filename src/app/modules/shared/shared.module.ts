import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';

const ngZorroModules = [
  NzIconModule,
  NzListModule,
  NzButtonModule,
  NzTableModule,
  NzDividerModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...ngZorroModules
  ],
  exports: [...ngZorroModules]
})
export class SharedModule { }
