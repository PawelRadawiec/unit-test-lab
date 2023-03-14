import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, NzLayoutModule, NzPageHeaderModule, NzIconModule],
  exports: [HeaderComponent, NzLayoutModule, NzPageHeaderModule, NzIconModule],
})
export class CoreModule {}
