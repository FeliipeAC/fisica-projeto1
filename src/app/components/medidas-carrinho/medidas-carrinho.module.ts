import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MedidasCarrinhoComponent} from './medidas-carrinho.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarrinhoModule} from './carrinho/carrinho.module';

@NgModule({
  declarations: [
    MedidasCarrinhoComponent
  ],
  imports: [
    CommonModule,
    CarrinhoModule
  ],
  exports: [
    MedidasCarrinhoComponent
  ]
})
export class MedidasCarrinhoModule {
}
