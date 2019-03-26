import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MedidasPenduloModule} from './components/medidas-pendulo/medidas-pendulo.module';
import {MedidasCarrinhoModule} from './components/medidas-carrinho/medidas-carrinho.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MedidasPenduloModule,
    MedidasCarrinhoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
