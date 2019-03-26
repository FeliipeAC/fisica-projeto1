import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pendulo',
  templateUrl: './pendulo.component.html',
  styleUrls: ['./pendulo.component.scss']
})
export class PenduloComponent implements OnInit {

  dados;

  /**
   * Tempo total
   */
  tempo = 0;

  /**
   * Segundos
   */
  seg = 0;

  /**
   * Milesgundos
   */
  mseg = 0;

  teste = 0.684;

  animationStyle: string;

  /**
   * Controle se há animação em execução
   */
  setAnimation = false;

  /**
   * Evento do controle de animação em execução
   */
  @Output() eventAnimation = new EventEmitter();


  /**
   * Recebe os dados usados no animação
   * @param dados
   */
  @Input() set setDados(dados) {
    console.log('Dados: ', dados);
    this.dados = dados;

    // Libera animação
    this.setAnimation = true;

    // Emite evento de que há uma animação sendo executada
    this.eventAnimation.emit({event: true});

    // Dispara o tempo
    this.cronometro(dados.tempo);
    // this.animationStyle = 'moveIt ' + this.teste + ' ease-in-out 6';

  }

  constructor() {
  }

  ngOnInit() {
    // console.log('Dados: ', this.dados);
    // this.cronometro(this.dados.tempo);
  }

  /**
   * Conta o tempo de execução
   * @param valor
   */
  cronometro(valor): void {
    // console.log('Tempo recebido: ', valor * 100);
    this.seg = this.mseg = this.tempo = 0;
    const contar = setInterval(() => {
      if (this.mseg < 99) {
        this.mseg++;
      }
      if (this.mseg === 99) {
        this.mseg = -1;
      }
      if (this.mseg === 0) {
        this.seg++;
      }
      if (this.seg === 59) {
        this.seg = -1;
      }

      this.tempo++;
      // console.log('this.tempo: ', this.tempo, valor * 100);
      if (this.tempo >= valor * 100) {
        clearInterval(contar);

        // Emite evento da finalização da animação
        this.eventAnimation.emit({event: false});

        // console.log('Parou');

        // Bloqueia animação
        this.setAnimation = false;
      }
    }, 10);
  }
}
