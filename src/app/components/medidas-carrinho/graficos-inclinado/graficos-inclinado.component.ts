import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-graficos-inclinado',
  templateUrl: './graficos-inclinado.component.html',
  styleUrls: ['./graficos-inclinado.component.scss']
})
export class GraficosInclinadoComponent implements OnInit {


  /**
   * Dimensões do gráfico
   */
  view: any[] = [520, 400];

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

  xAxisLabelDesl = 'Tempo(s)';
  yAxisLabelDesl = 'Deslocamento(m)';

  /**
   * Cores do gráfico
   */
  colorScheme = {
    domain: ['#0031e0', '#A10A28', '#C7B42C', '#4dd4ec', '#a517e0', '#5AA454']
  };

  /**
   * Dados da medida
   */
  inclinado = [
    {
      distancia: 0.118,
      tempo: 1.108,
    },
    {
      distancia: 0.488,
      tempo: 2.422,
    },
    {
      distancia: 1.038,
      tempo: 3.575,
    },
    {
      distancia: 1.582,
      tempo: 4.287,
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
   * Dados do gráfico de deslocamento
   */
  dataChartDesl;

  /**
   * Gravidade (m/s³)
   */
  g = 10;

  constructor() {
  }

  ngOnInit() {
    this.setVelocidadeMedia();
    this.setTempoPorDeslocamento();
  }

  setVelocidadeMedia(): void {
    this.dataChartVel = [
      {
        name: 'Velocidade média',
        series: []
      }
    ];
    for (let i = 0; i < this.inclinado.length; i++) {
      const vm = this.inclinado[i].distancia / this.inclinado[i].tempo;
      this.dataChartVel[0].series[i] = {
        value: parseFloat((this.inclinado[i].distancia / this.inclinado[i].tempo).toFixed(2)),
        name: this.inclinado[i].tempo
      };
    }
    // this.dataChartVel[0].series[0] = {
    //   value: parseFloat((this.inclinado[3].distancia / this.inclinado[3].tempo).toFixed(2)),
    //   name: this.inclinado[3].tempo
    // };
    // this.dataChartVel[0].series[1] = {
    //   value: parseFloat((this.inclinado[3].distancia / this.inclinado[3].tempo).toFixed(2)),
    //   name: this.inclinado[0].tempo
    // };
    // console.log('Data Velocidade: ', this.dataChartVel);
  }


  setTempoPorDeslocamento(): void {
    this.dataChartDesl = [
      {
        name: 'Distância',
        series: []
      }
    ];
    for (let i = 0; i < this.inclinado.length; i++) {

      this.dataChartDesl[0].series[i] = {
        value: this.inclinado[i].distancia,
        name: this.inclinado[i].tempo
      };
    }
    // console.log('Deslocamento: ', this.dataChartDesl);
  }

}
