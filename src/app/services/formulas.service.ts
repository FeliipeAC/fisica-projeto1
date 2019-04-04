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

  velocidadeMedia(pInicial: number, pFinal: number, tInicial: number, tFinal: number) {
    const p = pFinal - pInicial;
    const t = tFinal - tInicial;
    return parseFloat((p / t).toFixed(3));
  }

  aceleracaoMedia(vInicial: number, vFinal: number, tInicial: number, tFinal: number) {
    const v = vFinal - vInicial;
    const t = tFinal - tInicial;
    return parseFloat((v / t).toFixed(3));
  }

  energiaPotencial(massa: number, altura: number) {
    return parseFloat((massa * this.gravidade * altura).toFixed(3));
  }

  energiaCinetica(massa: number, velocidade: number) {
    return parseFloat(((massa * velocidade * velocidade) / 2).toFixed(3));
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
