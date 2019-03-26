import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabelaComponent} from './tabela.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    TabelaComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  exports:[
    TabelaComponent
  ]
})
export class TabelaModule { }
