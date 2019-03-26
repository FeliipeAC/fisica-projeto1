import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MedidasPenduloComponent} from './medidas-pendulo.component';
import {GraficoModule} from './grafico/grafico.module';
import {PenduloModule} from './pendulo/pendulo.module';
import {TabelaModule} from './tabela/tabela.module';

@NgModule({
  declarations: [
    MedidasPenduloComponent,
  ],
  imports: [
    CommonModule,
    GraficoModule,
    PenduloModule,
    TabelaModule
  ],
  exports: [
    MedidasPenduloComponent
  ]
})
export class MedidasPenduloModule {
}
