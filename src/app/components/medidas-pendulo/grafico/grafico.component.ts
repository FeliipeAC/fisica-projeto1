import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as shape from 'd3-shape';

const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  /**
  * Dados da medida
  */
  medidas = [
    {
      altura: 0.140,
      t1: 0.342,
      t2: 0.355,
      t3: 0.355,
    },
    {
      altura: 0.263,
      t1: 0.506,
      t2: 0.488,
      t3: 0.498,
    },
    {
      altura: 0.431,
      t1: 0.617,
      t2: 0.630,
      t3: 0.631,
    },
    {
      altura: 0.890,
      t1: 0.892,
      t2: 0.912,
      t3: 0.933,
    },
    {
      altura: 1.039,
      t1: 0.990,
      t2: 0.982,
      t3: 0.998,
    },
    {
      altura: 1.161,
      t1: 1.062,
      t2: 1.056,
      t3: 1.043,
    }
  ];

  /**
  * Dados do gráfico
  */
  dataChat;

  /**
  * Lista com os dados do gráfico de período
  */
  listaPeriodo = [];

  /**
  * Gravidade (m/s³)
  */
  g = 9.8;

  @Output() element = new EventEmitter();
  @Input() disabledAnimation;

  constructor() {
    // console.log('Medidas: ', this.medidas);

    // Traduzindo alguns textos do modulo de gráfico
    Highcharts.setOptions({
      lang: {
        contextButtonTitle: 'Exportar gráfico',
        downloadJPEG: 'Download imagem (JPEG)',
        downloadPDF: 'Download PDF',
        downloadPNG: 'Download imagem (PNG)',
        downloadSVG: 'Download SVG',
        printChart: 'Imprimir gráfico'
      }
    });
  }

  ngOnInit() {
    this.setValores();
    this.graficoPeriodo();
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
        name: parseFloat((this.medidas[i].altura).toFixed(3)),
        value: this.calculaPeriodo(this.medidas[i].altura)
      };
    }
    // console.log('Dados do gráfico: ', this.dataChat);

  }

  /**
  * Contrói o gráfico com os valores da velocidade média
  */
  graficoPeriodo(): void {

    // Objeto com as configurações do gráfico
    const objGrafico = {

      title: {
        text: 'Período',
        style: {
          fontSize: '16px',
          color: '#404040',
          fontWeight: 'bold',
          fontFamily: 'Roboto, sans-serif'
        }
      },

      subtitle: {
        text: 'Variação do período de acordo com a altura do fio',
        // align: 'left'
        style: {
          fontSize: '14px',
          fontFamily: 'Roboto, sans-serif'
        }
      },

      xAxis: {
        title: {
          text: 'Altura (m)'
        }
      },

      yAxis: {
        title: {
          text: 'Período (s)'
        },
        min: 0
      },

      legend: {
        enabled: false,
        // layout: 'vertical',
        // align: 'right',
        // verticalAlign: 'middle'
      },

      tooltip: {
        headerFormat: ' <span style="font-size: 10px">{point.key} m</span><br/>',
        valueSuffix: ' s'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 0
        }
      },

      series: [],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            // legend: {
            //   layout: 'horizontal',
            //   align: 'left',
            //   verticalAlign: 'top'
            // }
          }
        }]
      },

      // navigation: {
      //   buttonOptions: {

      //     theme: {
      //       states: {
      //         hover: {
      //           fill: 'transparent',
      //           symbolFill: 'rgb(124, 181, 236)'
      //         },
      //         select: {
      //           fill: '#c5c5c5'
      //         }
      //       }
      //     }
      //   },
      // },

      credits: {
        enabled: false,
      }

    };

    // Tamanho da lista com as medidas
    const max = this.medidas.length;

    // Monta lista com os cálculos da velocidade média
    for (let i = 0; i < max; i++) {
      const point = [];
      point.push(this.medidas[i].altura);
      point.push(this.calculaPeriodo(this.medidas[i].altura));

      console.log('Item: ', point);
      this.listaPeriodo.push(point);
    }

    // Adiciona os dados no objeto do gráfico
    objGrafico.series.push({
      name: 'Período',
      data: this.listaPeriodo
    });
    console.log('Periodo: ', this.listaPeriodo);

    // Cria o gráfico
    Highcharts.chart('grafico-pendulo-periodo', objGrafico);
  }

  /**
  * Calcula o período
  * @param altura altura do fio em m
  */
  calculaPeriodo(altura: number): number {
    const valor = (2 * Math.PI * Math.sqrt(altura / this.g));
    // console.log('Periodo: ', valor);
    return parseFloat(valor.toFixed(3));
  }

}
