import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormulasService {

  gravidade: number;
  pi: number;

  constructor() {
    this.gravidade = 9.81;
    this.pi = 3.14;
  }

  velocidadeMedia(deltaX: number, deltaT: number) {
    return (deltaX / deltaT);
  }

  aceleracaoMedia(deltaV: number, deltaT: number) {
    return (deltaV / deltaT);
  }

  energiaPotencial(massa: number, altura: number) {
    return (massa * this.gravidade * altura);
  }

  energiaCinetica(massa: number, velocidade: number) {
    return (massa * velocidade * velocidade) / 2;
  }

  // Pêndulo

  velocidadePendulo(pulsacao: number, amplitude: number, tempo: number, faseInicial: number) {
    return (-1 * pulsacao * amplitude * Math.sin((pulsacao * tempo) + faseInicial));
  }

  amplitudePendulo(angulo: number, ) {
    // TODO
  }

  pulsacaoPendulo(periodo: number) {
    return ((2 * this.pi) / periodo);
  }

  periodoPendulo(comprimento: number) {
    return (2 * this.pi * Math.sqrt(comprimento / this.gravidade));
  }

}
