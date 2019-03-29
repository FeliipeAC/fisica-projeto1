import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraficosInclinadoComponent} from './graficos-inclinado.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    GraficosInclinadoComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  exports: [
    GraficosInclinadoComponent
  ]
})
export class GraficosInclinadoModule {
}
