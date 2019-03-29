import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material';
import {TabelaPlanoComponent} from './tabela-plano.component';

@NgModule({
  declarations: [
    TabelaPlanoComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    TabelaPlanoComponent
  ]
})
export class TabelaPlanoModule {
}
