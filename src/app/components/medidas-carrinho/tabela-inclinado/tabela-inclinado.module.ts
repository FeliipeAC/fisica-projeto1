import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabelaInclinadoComponent} from './tabela-inclinado.component';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    TabelaInclinadoComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    TabelaInclinadoComponent
  ]
})
export class TabelaInclinadoModule {
}
