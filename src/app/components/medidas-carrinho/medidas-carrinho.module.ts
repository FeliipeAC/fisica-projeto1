import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MedidasCarrinhoComponent} from './medidas-carrinho.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarrinhoModule} from './carrinho/carrinho.module';
import {GraficosModule} from './graficos-plano/graficos.module';
import {TabelaPlanoModule} from './tabela-plano/tabela-plano.module';
import {TabelaInclinadoModule} from './tabela-inclinado/tabela-inclinado.module';
import {GraficosInclinadoModule} from './graficos-inclinado/graficos-inclinado.module';

@NgModule({
  declarations: [
    MedidasCarrinhoComponent,
  ],
  imports: [
    CommonModule,
    CarrinhoModule,
    GraficosModule,
    GraficosInclinadoModule,
    TabelaPlanoModule,
    TabelaInclinadoModule,
  ],
  exports: [
    MedidasCarrinhoComponent
  ]
})
export class MedidasCarrinhoModule {
}
