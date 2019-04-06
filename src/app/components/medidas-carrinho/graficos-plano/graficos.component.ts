import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { FormulasService } from 'src/app/services/formulas.service';

const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);


@Component({
    selector: 'app-graficos-plano',
    templateUrl: './graficos.component.html',
    styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

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
    plano: { distancia: number, tempo: number }[] = [
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
    * Lista com os dados do gráfico de velocidade média
    */
    listaAceleracao = [];

    /**
    * Lista com os dados do gráfico de posição x tempo
    */
    listaTempo = [];
    aceleracaoMedia = 0;
    massa = 0.21; // kg
    altura = 0.133; // m

    constructor(
        private formulasService: FormulasService
    ) {

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

        this.graficoPosicaoTempo();
        this.graficoVelocidadeMedia();
        this.graficoAceleracaoMedia();
        this.graficoPotencial();
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
                value: parseFloat((this.dataChartVel[0].series[i].value / this.dataChartVel[0].series[i].name).toFixed(3)),
                name: this.dataChartVel[0].series[i].name
            };

        }
        // console.log('Data Aceleração: ', this.dataChartAce);
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

        // Constrói vetor com os dados tempo x posição
        for (const dado of this.plano) {
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
        Highcharts.chart('grafico-posicao-tempo', objGrafico);
    }

    /**
    * Cria o gráfico com o cálculo da velocidade média
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
        const max = this.plano.length;

        // Monta lista com os cálculos da velocidade média
        for (let i = 0; i < max; i++) {
            const point = [];
            point.push(this.plano[i].tempo);
            point.push(parseFloat((this.plano[i].distancia / this.plano[i].tempo).toFixed(3)));
            this.listaVelocidade.push(point);
        }


        // Adiciona os dados no objeto do gráfico
        objGrafico.series.push({
            name: 'Velocidade média',
            data: this.listaVelocidade
        });

        // console.log('Velocidade média PLANO', this.listaVelocidade)

        // Cria o gráfico
        Highcharts.chart('grafico-velocidade-media', objGrafico);
    }


    /**
* Cria o gráfico com o cálculo da velocidade média
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
                min: 0,
                max: 2
            },
            legend: {
                enabled: true,
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
        const max = this.plano.length;

        this.listaAceleracao = [[this.plano[0].tempo, 0]];

        // Monta lista com os cálculos da velocidade média
        for (let i = 1; i < max; i++) {
            const point = [];


            let aceleracao: number;

            aceleracao = this.formulasService.aceleracaoMedia(
                this.listaVelocidade[i - 1][1],
                this.listaVelocidade[i][1],
                this.plano[i - 1].tempo,
                this.plano[i].tempo);
            point.push(this.plano[i].tempo);
            point.push(aceleracao);

            this.listaAceleracao.push(point);
            this.aceleracaoMedia += aceleracao;
        }
        this.aceleracaoMedia = this.aceleracaoMedia / this.listaAceleracao.length;

        // console.log(this.listaAceleracao);
        // Adiciona os dados no objeto do gráfico
        objGrafico.series.push({
            name: 'Aceleração média',
            data: this.listaAceleracao
        });
        objGrafico.series.push({
            name: 'Média',
            data: [[this.plano[0].tempo, this.aceleracaoMedia], [this.plano[3].tempo, this.aceleracaoMedia]]
        });

        // console.log('aceleracao lista PLANO', this.listaAceleracao);
        // console.log('aceleracao media PLANO', this.aceleracaoMedia);

        // Cria o gráfico
        Highcharts.chart('grafico-aceleracao-media', objGrafico);
    }

    graficoPotencial() {

        // Objeto com as configurações do gráfico
        const objGrafico = {

            title: {
                text: 'Energia potencial, cinética e mecânica',
                style: {
                    fontSize: '16px',
                    color: '#404040',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto, sans-serif'
                }
            },

            subtitle: {
                text: 'Energia do carrinho durante o deslocamento',
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
                    text: 'Energia (J)'
                },
                min: 0,
                max: 0.5
            },
            legend: {
                enabled: true,
            },

            tooltip: {
                headerFormat: ' <span style="font-size: 10px">{point.key} s</span><br/>',
                valueSuffix: ' J'
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
                }]
            },

            credits: {
                enabled: false,
            }

        };

        const listaPotencial = [];
        const listaCinetica = [];
        const listaMec = [];

        // Tamanho da lista com as medidas
        const max = this.plano.length;

        for (let i = 0; i < max; i++) {
            const pointPot = [];
            const pointCin = [];
            const pointMec = [];

            pointPot.push(this.plano[i].tempo);
            pointPot.push(this.formulasService.energiaPotencial(this.massa, this.altura));
            listaPotencial.push(pointPot);

            pointCin.push(this.plano[i].tempo);
            pointCin.push(this.formulasService.energiaCinetica(this.massa, this.listaVelocidade[i][1]));
            listaCinetica.push(pointCin);

            pointMec.push(this.plano[i].tempo);
            pointMec.push(parseFloat((pointPot[1] + pointCin[1]).toFixed(3)));
            listaMec.push(pointMec);
        }

        objGrafico.series.push({
            name: 'Energia Potencial',
            data: listaPotencial
        });

        objGrafico.series.push({
            name: 'Energia Cinética',
            data: listaCinetica
        });

        objGrafico.series.push({
            name: 'Energia Mecânica',
            data: listaMec
        });


        // Cria o gráfico
        Highcharts.chart('grafico-potencial-media', objGrafico);
    }

}
