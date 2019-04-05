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

  /**
   * Calcula a velocidade no instante t
   * @param periodo periodo do pendulo
   * @param comprimento comprimento do fio
   * @param tempo tempo
   */
  velocidadePendulo(periodo: number, comprimento: number, tempo: number): number {
    return parseFloat((-1 * this.pulsacaoPendulo(periodo) * this.amplitudePendulo(5, comprimento) *
    Math.sin(this.pulsacaoPendulo(periodo) * tempo)).toFixed(3));
  }

  amplitudePendulo(angulo: number, comprimento: number) {
    return Math.sin(5) * comprimento;
  }

  pulsacaoPendulo(periodo: number) {
    return ((2 * this.pi) / periodo);
  }

  periodoPendulo(comprimento: number) {
    return (2 * this.pi * Math.sqrt(comprimento / this.gravidade));
  }

}