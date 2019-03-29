import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-graficos-plano',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {


  /**
   * Dimensões do gráfico
   */
  view: any[] = [600, 400];

  /**
   * Configurações do gráfico
   */
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  autoScale = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  timeline = false;
  curveType = shape.curveNatural;


  xAxisLabelVel = 'Tempo(s)';
  yAxisLabelVel = 'Velocidades(m/s)';

  xAxisLabelAce = 'Tempo(s)';
  yAxisLabelAce = 'Aceleração(m/s²)';

  /**
   * Cores do gráfico
   */
  colorScheme = {
    domain: ['#0031e0', '#A10A28', '#C7B42C', '#4dd4ec', '#a517e0', '#5AA454']
  };

  /**
   * Dados da medida
   */
  plano = [
    {
      distancia: 0.21,
      tempo: 0.297,
    },
    {
      distancia: 0.595,
      tempo: 0.735,
    },
    {
      distancia: 0.889,
      tempo: 1.077,
    },
    {
      distancia: 1.26,
      tempo: 1.508,
    },
  ];

  /**
   * Dados do gráfico de velocidade média
   */
  dataChartVel;

  /**
   * Dados do gŕafico de aceleração média
   */
  dataChartAce;


  /**
   * Gravidade (m/s³)
   */
  g = 10;

  constructor() {
  }

  ngOnInit() {
    console.log('Carrinho plano: ', this.plano);
    this.setVelocidadeMedia();
    this.setAceleracaoMedia();
  }

  setVelocidadeMedia(): void {
    this.dataChartVel = [
      {
        name: 'Velocidade média',
        series: []
      }
    ];
    for (let i = 0; i < this.plano.length; i++) {
      const vm = this.plano[i].distancia / this.plano[i].tempo;
      // if (i === 0) {
      this.dataChartVel[0].series[i] = {
        value: parseFloat((this.plano[i].distancia / this.plano[i].tempo).toFixed(2)),
        name: this.plano[i].tempo
      };
      // } else {
      //   const dX = this.plano[i].distancia - this.plano[i - 1].distancia;
      //   const dT = this.plano[i].tempo - this.plano[i - 1].tempo;
      //
      //   this.dataChartVel[0].series[i] = {
      //     value: parseFloat((dX / dT).toFixed(2)),
      //     name: this.plano[i].tempo
      //   };
      // }
    }
    console.log('Data Velocidade: ', this.dataChartVel);
  }

  setAceleracaoMedia(): void {

    this.dataChartAce = [
      {
        name: 'Aceleração média',
        series: []
      }
    ];
    for (let i = 0; i < this.dataChartVel[0].series.length; i++) {

      this.dataChartAce[0].series[i] = {
        value: parseFloat((this.dataChartVel[0].series[i].value / this.dataChartVel[0].series[i].name).toFixed(2)),
        name: this.dataChartVel[0].series[i].name
      };

    }
    console.log('Data Aceleração: ', this.dataChartAce);
  }

}
