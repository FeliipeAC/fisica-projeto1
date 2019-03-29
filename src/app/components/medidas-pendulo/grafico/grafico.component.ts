import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as shape from 'd3-shape';
import * as d3 from 'd3';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  /**
   * Dimensões do gráfico
   */
  view: any[] = [700, 400];

  /**
   * Configurações do gráfico
   */
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  autoScale = false;
  showXAxisLabel = true;
  xAxisLabel = 'Altura(m)';
  showYAxisLabel = true;
  yAxisLabel = 'Tempo (s)';
  timeline = false;
  legendTitle = 'Alturas';
  curveType = shape.curveNatural;

  /**
   * Cores do gráfico
   */
  colorScheme = {
    domain: ['#0031e0', '#A10A28', '#C7B42C', '#4dd4ec', '#a517e0', '#5AA454']
  };

  /**
   * Dados da medida
   */
  medidas = [
    {
      altura: 14,
      t1: 3.42,
      t2: 3.55,
      t3: 3.55,
    },
    {
      altura: 26.3,
      t1: 5.06,
      t2: 4.88,
      t3: 4.98,
    },
    {
      altura: 43.1,
      t1: 6.17,
      t2: 6.3,
      t3: 6.31,
    },
    {
      altura: 89,
      t1: 8.92,
      t2: 9.12,
      t3: 9.33,
    },
    {
      altura: 103.9,
      t1: 9.9,
      t2: 9.82,
      t3: 9.98,
    },
    {
      altura: 116.1,
      t1: 10.62,
      t2: 10.56,
      t3: 10.43,
    }
  ];

  /**
   * Dados do gráfico
   */
  dataChat;


  /**
   * Gravidade (m/s³)
   */
  g = 10;

  @Output() element = new EventEmitter();
  @Input() disabledAnimation;

  constructor() {
    // console.log('Medidas: ', this.medidas);
  }

  /**
   * Dispara evento para animação do pêndulo
   *
   */
  onSelect(event): void {
    // console.log('Event: ', event);
    // console.log('Cores: ', this.cores);
    //
    // // Verifica se event é tipo Object
    // if (typeof event === 'object') {
    //
    //   // Emite evento com os dados para animação do pêndulo
    //   this.element.emit({altura: event.series, tempo: event.value});
    // }
  }


  ngOnInit() {
    this.setValores();
  }

  setValores() {

    this.dataChat = [
      {
        name: 'Período',
        series: []
      }
    ];

    for (let i = 0; i < this.medidas.length; i++) {
      this.dataChat[0].series[i] = {
        name: parseFloat((this.medidas[i].altura / 100).toFixed(3)),
        value: this.calculaPeriodo(this.medidas[i].altura / 100)
      };
    }
    // console.log('Dados do gráfico: ', this.dataChat);

  }

  calculaPeriodo(altura: number): number {
    const valor = (2 * Math.PI * Math.sqrt(altura / this.g));
    // console.log('Periodo: ', valor);
    return parseFloat(valor.toFixed(2));
  }

}
