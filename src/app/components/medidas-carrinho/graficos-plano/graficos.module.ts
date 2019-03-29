import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GraficosComponent} from './graficos.component';

@NgModule({
  declarations: [
    GraficosComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgxChartsModule,
  ],
  exports: [
    GraficosComponent
  ]
})
export class GraficosModule { }
