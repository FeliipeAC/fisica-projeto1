import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';

const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

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
  g = 9.8;

  /**
  * Lista com os dados do gráfico de velocidade média
  */
  listaVelocidade = [];

  /**
  * Lista com os dados do gráfico de posição x tempo
  */
  listaTempo = [];

  /**
  * Lista com os dados do gráfico de aceleração média
  */
  listaAceleracao = [];

  constructor() {

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
    // Chama método que monta o gráfico de posição x tempo
    this.graficoPosicaoTempo();

    // Chama método que monta o gráfico de velocidade média
    this.graficoVelocidadeMedia();

    this.graficoAceleracaoMedia();
  }

  /**
  * Cria o gráfico de Posição x Tempo
  */
  graficoPosicaoTempo(): void {

    // Objeto com as configurações do gráfico
    const objGrafico = {

      title: {
        text: 'Posição x Tempo',
        style: {
          fontSize: '16px',
          color: '#404040',
          fontWeight: 'bold',
          fontFamily: 'Roboto, sans-serif'
        }
      },

      subtitle: {
        text: 'Deslocamento do carrinho ao decorrer do tempo',
        // align: 'left'
        style: {
          fontSize: '13px',
          fontFamily: 'Roboto, sans-serif'
        }
      },

      xAxis: {
        title: {
          text: 'Tempo (s)'
        }
      },

      yAxis: {
        title: {
          text: 'Posição (m)'
        }
      },
      legend: {
        enabled: false,
        // layout: 'vertical',
        // align: 'right',
        // verticalAlign: 'middle'
      },

      tooltip: {
        headerFormat: ' <span style="font-size: 10px">{point.key} s</span><br/>',
        valueSuffix: ' m'
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

      credits: {
        enabled: false,
      }

    };

    // Constrói vetor com os cálculos de tempo x posição
    for (const dado of this.inclinado) {
      const point = [];
      point.push(dado.tempo);
      point.push(dado.distancia);
      this.listaTempo.push(point);
    }

    // Adiciona os dados no objeto do gráfico
    objGrafico.series.push({
      name: 'Posição',
      data: this.listaTempo
    });

    // Cria o gráfico
    Highcharts.chart('grafico-inclinado-posicao-tempo', objGrafico);
  }

  /**
  * Contrói o gráfico com os valores da velocidade média
  */
  graficoVelocidadeMedia(): void {

    // Objeto com as configurações do gráfico
    const objGrafico = {

      title: {
        text: 'Velocidade média',
        style: {
          fontSize: '16px',
          color: '#404040',
          fontWeight: 'bold',
          fontFamily: 'Roboto, sans-serif'
        }
      },

      subtitle: {
        text: 'Velocidade média do carrinho durante o deslocamento',
        // align: 'left'
        style: {
          fontSize: '14px',
          fontFamily: 'Roboto, sans-serif'
        }
      },

      xAxis: {
        title: {
          text: 'Tempo (s)'
        }
      },

      yAxis: {
        title: {
          text: 'Velocidade (m/s)'
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
        headerFormat: ' <span style="font-size: 10px">{point.key} s</span><br/>',
        valueSuffix: ' m/s'
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

      credits: {
        enabled: false,
      }

    };

    // Tamanho da lista com as medidas
    const max = this.inclinado.length;

    // Monta lista com os cálculos da velocidade média
    for (let i = 0; i < max; i++) {
      const point = [];
      point.push(this.inclinado[i].tempo);
      point.push(parseFloat((this.inclinado[i].distancia / this.inclinado[i].tempo).toFixed(3)));
      this.listaVelocidade.push(point);
    }

    // Adiciona os dados no objeto do gráfico
    objGrafico.series.push({
      name: 'Velocidade média',
      data: this.listaVelocidade
    });
    console.log('Velocidade média: ', this.listaVelocidade);

    // Cria o gráfico
    Highcharts.chart('grafico-inclinado-velocidade-media', objGrafico);
  }


  /**
  * Contrói o gráfico com valores da aceleração média
  */
  graficoAceleracaoMedia(): void {

    // Objeto com as configurações do gráfico
    const objGrafico = {

      title: {
        text: 'Aceleração média',
        style: {
          fontSize: '16px',
          color: '#404040',
          fontWeight: 'bold',
          fontFamily: 'Roboto, sans-serif'
        }
      },

      subtitle: {
        text: 'Aceleração média do carrinho durante o deslocamento',
        // align: 'left'
        style: {
          fontSize: '14px',
          fontFamily: 'Roboto, sans-serif'
        }
      },

      xAxis: {
        title: {
          text: 'Tempo (s)'
        }
      },

      yAxis: {
        title: {
          text: 'Aceleração (m/s²)'
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
        headerFormat: ' <span style="font-size: 10px">{point.key} s</span><br/>',
        valueSuffix: ' m/s²'
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

      credits: {
        enabled: false,
      }

    };

    // Tamanho da lista com as medidas
    const max = this.inclinado.length;

    // Monta lista com os cálculos da velocidade média
    for (let i = 0; i < max; i++) {
      const point = [];
      point.push(this.inclinado[i].tempo);
      point.push(parseFloat((this.listaVelocidade[i][1] / this.listaVelocidade[i][0]).toFixed(3)));
      this.listaAceleracao.push(point);
      console.log('Item 1: ', this.listaVelocidade[i][0], this.listaVelocidade[i][1]);
      // console.log('Item 2: ', this.listaVelocidade[i][0]);
    }

    console.log('Lista aceleração: ', this.listaAceleracao);
    // Adiciona os dados no objeto do gráfico
    objGrafico.series.push({
      name: 'Aceleração média',
      data: this.listaAceleracao
    });

    // Cria o gráfico
    Highcharts.chart('grafico-inclinado-aceleracao-media', objGrafico);
  }

}
