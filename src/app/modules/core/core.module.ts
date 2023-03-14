import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzPageHeaderModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    NzLayoutModule,
    NzPageHeaderModule,
  ],
})
export class CoreModule {}
