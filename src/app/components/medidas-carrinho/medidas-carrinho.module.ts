import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MedidasCarrinhoComponent} from './medidas-carrinho.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarrinhoModule} from './carrinho/carrinho.module';
import {GraficosComponent} from './graficos-plano/graficos.component';
import {GraficosModule} from './graficos-plano/graficos.module';
import {TabelaPlanoComponent} from './tabela-plano/tabela-plano.component';
import {TabelaPlanoModule} from './tabela-plano/tabela-plano.module';
import { TabelaInclinadoComponent } from './tabela-inclinado/tabela-inclinado.component';
import {TabelaInclinadoModule} from './tabela-inclinado/tabela-inclinado.module';

@NgModule({
  declarations: [
    MedidasCarrinhoComponent,
  ],
  imports: [
    CommonModule,
    CarrinhoModule,
    GraficosModule,
    TabelaPlanoModule,
    TabelaInclinadoModule
  ],
  exports: [
    MedidasCarrinhoComponent
  ]
})
export class MedidasCarrinhoModule {
}
