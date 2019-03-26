import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PenduloComponent} from './pendulo.component';

@NgModule({
  declarations: [
    PenduloComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    PenduloComponent,
  ]
})
export class PenduloModule { }
