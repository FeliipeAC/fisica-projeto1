import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medidas-pendulo',
  templateUrl: './medidas-pendulo.component.html',
  styleUrls: ['./medidas-pendulo.component.scss']
})
export class MedidasPenduloComponent implements OnInit {

  altura: string;
  tempo: number;

  valores;

  statusAnimation = false;

  constructor() { }

  ngOnInit() {
  }

  getValueGrafico(valor): void {
    if (!this.statusAnimation) {
      this.valores = valor;
      console.log('Valor: ', this.valores);
    }
    console.log('Não permitido');

  }

  getStatusAnimation(valor): void {
    console.log('Animation: ', valor);
    this.statusAnimation = valor.event;
    console.log('Status: ', this.statusAnimation);
  }

}
