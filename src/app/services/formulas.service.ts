import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormulasService {

    /**
     * Valor da gravidade
     */
    gravidade: number;

    /**
     * Valor do PI
     */
    pi: number;

    /**
     * Serviço com as formulás
     */
    constructor() {
        this.gravidade = 9.81;
        // this.pi = parseFloat(Math.PI.toFixed(5));
        this.pi = 3.14;
    }

    /**
     * Calcula a velocidade média
     * @param pInicial posição inicial
     * @param pFinal posição final
     * @param tInicial tempo inicial
     * @param tFinal tempo final
     */
    velocidadeMedia(pInicial: number, pFinal: number, tInicial: number, tFinal: number) {
        const p = pFinal - pInicial;
        const t = tFinal - tInicial;
        return parseFloat((p / t).toFixed(3));
    }

    /**
     * Calcula a acelaração média
     * @param vInicial velocidade inicial
     * @param vFinal velociade final
     * @param tInicial tempo inicial
     * @param tFinal tempo final
     */
    aceleracaoMedia(vInicial: number, vFinal: number, tInicial: number, tFinal: number) {
        const v = vFinal - vInicial;
        const t = tFinal - tInicial;
        return parseFloat((v / t).toFixed(3));
    }

    /**
     * Calcula a energia potencila gravitacional
     * @param massa massa do objeto
     * @param altura altura da esfera em relação ao ponto de equilíbirio
     */
    energiaPotencial(massa: number, altura: number) {
        return parseFloat((massa * this.gravidade * altura).toFixed(5));
    }

    /**
     * Calcula a energia cinética
     * @param massa massa do objeto
     * @param velocidade velocidade
     */
    energiaCinetica(massa: number, velocidade: number) {
        return parseFloat(((massa * velocidade * velocidade) / 2).toFixed(5));
    }

    // Pêndulo

    /**
     * Calcula a velocidade do pêndulo
     * @param periodo periodo do tempo
     * @param comprimento comprimento do fio
     * @param tempo tempo atual
     */
    velocidadePendulo(periodo: number, comprimento: number, tempo: number): number {

        // velociade angular
        const w = this.pulsacaoPendulo(periodo);

        // Amplitude
        const a = this.amplitudePendulo(comprimento);

        return parseFloat((-1 * w * a * Math.sin((w * tempo) + this.pi)).toFixed(5));
    }

    /**
     * Calcula a posição do pêndulo
     * @param periodo periodo do pêndulo
     * @param comprimento comprimento do fio
     * @param tempo tempo atual
     */
    posicaoPendulo(periodo: number, comprimento: number, tempo: number): number {

        // Amplitude
        const a = this.amplitudePendulo(comprimento);

        // Velocidade angular
        const w = this.pulsacaoPendulo(periodo);

        return parseFloat((a * Math.cos((w * tempo) + this.pi)).toFixed(3));
    }

    /**
     * Calcula a aceleração do pêndulo
     * @param periodo periodo do pênculo
     * @param comprimento comprimento do fio
     * @param tempo tempo atual
     */
    aceleracaoPendulo(periodo: number, comprimento: number, tempo: number): number {

        // Velocidade angular
        const w = this.pulsacaoPendulo(periodo);

        // Posição
        const x = this.posicaoPendulo(periodo, comprimento, tempo);

        return parseFloat((-1 * x * w * w).toFixed(5));
    }

    /**
     * Calcula a amplitude
     * @param comprimento comprimento do fio
     */
    amplitudePendulo(comprimento: number) {
        return Math.sin((5 * this.pi) / 180) * comprimento;
    }

    /**
     * Calcula a pulsação/velocidade angular
     * @param periodo periodo do pêndulo
     */
    pulsacaoPendulo(periodo: number) {
        return ((2 * this.pi) / periodo);
    }

    /**
     * Calcula o período
     * @param comprimento comprimento do fio
     */
    periodoPendulo(comprimento: number) {
        return (2 * this.pi * Math.sqrt(comprimento / this.gravidade));
    }

    /**
     * Calcula a altura máxima do pêndulo em relação ao ponto de equilíbrio
     * @param comprimento comprimento do fio
     * @param anguloMax ângulo máximo
     * @param periodo periodo
     * @param tempo tempo atual
     */
    alturaPendulo(comprimento: number, anguloMax: number, periodo: number, tempo: number): number {

        // Calcula o ângulo
        const angulo = this.anguloPendulo(anguloMax, periodo, tempo);

        return parseFloat((comprimento - (comprimento * Math.cos(angulo))).toFixed(5));
        // return parseFloat((1 - (Math.cos(angulo) * comprimento)).toFixed(3));

    }

    /**
     * Calcula o ângulo do pêndulo em determinado momento
     * @param anguloMax ângulo máximo
     * @param periodo periodo
     * @param tempo tempo atual
     */
    anguloPendulo(anguloMax: number, periodo: number, tempo: number): number {

        // Angulo em radianos
        const anguloRad = (anguloMax * this.pi) / 180;

        // Velocidade angular
        const w = this.pulsacaoPendulo(periodo);

        // return parseFloat((anguloMax * (-1 * Math.cos((2 * this.pi * tempo) / periodo))).toFixed(3));
        return parseFloat((anguloRad * Math.cos(w * tempo)).toFixed(5));

    }

}
