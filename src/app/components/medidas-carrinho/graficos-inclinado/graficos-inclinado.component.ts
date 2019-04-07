import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { FormulasService } from 'src/app/services/formulas.service';

const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

@Component({
    selector: 'app-graficos-inclinado',
    templateUrl: './graficos-inclinado.component.html',
    styleUrls: ['./graficos-inclinado.component.scss']
})
export class GraficosInclinadoComponent implements OnInit {

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

    /**
    * Média das acelerações
    */
    aceleracaoMedia = 0;

    /**
    * Dados da posição x tempo (teórico)
    */
    listaPosicaoTeorico = [];

    /**
     * Dados teóricos de velociade x tempo
     */
    listaVelocidadeToerico = [];

    /**
    * Massa do carrinho
    */
    massa = 0.21; // kg

    /**
    * Altura incial
    */
    alturaInicial = 0.165; // m

    /**
    * Altura final
    */
    alturaFinal = 0.133; // m

    /**
    * Altura para cada ponto de parada
    */
    alturas = [
        0.030,
        0.024,
        0.015,
        0.006,
    ];

    constructor(
        private formulasService: FormulasService,
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

        // Chama método que monta o gráfico de velocidade média
        this.graficoVelocidadeMedia();


        this.graficoAceleracaoMedia();

        // Chama método que monta o gráfico de posição x tempo
        this.graficoPosicaoTempo();

        this.graficoPotencial();
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
                },
                min: 0,
                max: 5
            },

            yAxis: {
                title: {
                    text: 'Posição (m)'
                }
            },
            legend: {
                enabled: true,
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

            // Pontos do gráfico
            const point = [];

            // Adiciona o tempo no ponto
            point.push(dado.tempo);

            // Adiciona a distância no ponto
            point.push(dado.distancia);

            // Adiciona o ponto na lista
            this.listaTempo.push(point);
        }

        for (let i = 0; i < this.inclinado.length; i++) {
            const pointTeorico = [];
            let posFinal: number;

            if (i === 0) {
                pointTeorico.push(this.inclinado[i].tempo);

                posFinal = this.formulasService.posicaoMUV(this.inclinado[0].distancia, this.listaVelocidadeToerico[0][1],
                    this.inclinado[i].tempo, this.aceleracaoMedia);

                pointTeorico.push(posFinal);

            } else {
                pointTeorico.push(this.inclinado[i].tempo);

                posFinal = this.formulasService.posicaoMUV(this.inclinado[0].distancia, this.listaVelocidadeToerico[i][1],
                    this.inclinado[i].tempo, this.aceleracaoMedia);

                pointTeorico.push(posFinal);
            }

            this.listaPosicaoTeorico.push(pointTeorico);

        }

        // console.log('Posição x Tempo: ', this.listaPosicaoTeorico);

        // Adiciona os dados no objeto do gráfico
        objGrafico.series.push({
            name: 'Prático',
            data: this.listaTempo
        });

        objGrafico.series.push({
            name: 'Teórico',
            data: this.listaPosicaoTeorico
        })

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
                text: 'Velocidade x Tempo',
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
                }]
            },

            credits: {
                enabled: false,
            }

        };

        // Tamanho da lista com as medidas
        const max = this.inclinado.length;
        let acMedia = 0;

        // Monta lista com os cálculos da velocidade média
        for (let i = 0; i < max; i++) {

            // Pontos do gráfico
            const point = [];

            // Adicona o tempo no ponto
            point.push(this.inclinado[i].tempo);

            // Adicona o velocidade no ponto
            point.push(parseFloat((this.inclinado[i].distancia / this.inclinado[i].tempo).toFixed(3)));

            // Adiciona o ponto na lista
            this.listaVelocidade.push(point);

            // Aceleração
            let aceleracao: number;


            aceleracao = (i === 0
                ? this.formulasService.aceleracaoMedia(0, this.listaVelocidade[i][1], 0, this.inclinado[i].tempo)
                : this.formulasService.aceleracaoMedia(this.listaVelocidade[i - 1][1], this.listaVelocidade[i][1],
                    this.inclinado[i - 1].tempo, this.inclinado[i].tempo));

            acMedia += aceleracao;
        }

        acMedia = acMedia / 4;

        // Calcula a velocidade teórica
        for (let i = 0; i < max; i++) {

            // Ponto do gráfio
            const pointTeorico = [];

            // Adiciona o tempo ao ponto
            pointTeorico.push(this.inclinado[i].tempo);

            // Velocidade
            const vel = this.formulasService.velocidadeMUV(this.listaVelocidade[i][1], acMedia, this.inclinado[i].tempo);

            // Adicona velocidade ao ponto
            pointTeorico.push(vel);

            // Adiciona ponto na lista
            this.listaVelocidadeToerico.push(pointTeorico);
        }

        // Adiciona os dados no objeto do gráfico
        objGrafico.series.push({
            name: 'Prático',
            data: this.listaVelocidade
        });

        // Adiciona os dados teóricos no gráfico
        objGrafico.series.push({
            name: 'Teórico',
            data: this.listaVelocidadeToerico
        });
        // console.log('Velocidade média: ', this.listaVelocidade);

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
                text: 'Aceleração x Tempo',
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
                },
                // min: 0,
                // max: 5
            },

            yAxis: {
                title: {
                    text: 'Aceleração (m/s²)'
                },
                min: 0,
                max: 0.2
            },

            legend: {
                enabled: true,
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

        // this.listaAceleracao = [0];
        // Monta lista com os cálculos da velocidade média
        for (let i = 0; i < max; i++) {

            // Pontos do gráfico
            const point = [];

            // Aceleração
            let aceleracao: number;


            aceleracao = (i === 0
                ? this.formulasService.aceleracaoMedia(0, this.listaVelocidade[i][1], 0, this.inclinado[i].tempo)
                : this.formulasService.aceleracaoMedia(this.listaVelocidade[i - 1][1], this.listaVelocidade[i][1],
                    this.inclinado[i - 1].tempo, this.inclinado[i].tempo));

            // Adiciona o tempo no ponto
            point.push(this.inclinado[i].tempo);

            // Adiciona a aceleração no ponto
            point.push(aceleracao);

            // Adiciona o ponto na lista
            this.listaAceleracao.push(point);
            this.aceleracaoMedia += aceleracao;


            // point.push(this.inclinado[i].tempo);
            // point.push(parseFloat((this.listaVelocidade[i][1] / this.listaVelocidade[i][0]).toFixed(3)));
            // this.listaAceleracao.push(point);
            // console.log('Item 1: ', this.listaVelocidade[i][0], this.listaVelocidade[i][1]);
            // console.log('Item 2: ', this.listaVelocidade[i][0]);
        }

        this.aceleracaoMedia = this.aceleracaoMedia / this.listaAceleracao.length;
        // console.log('Lista aceleração: ', this.listaAceleracao);

        // Adiciona os dados práticos no objeto do gráfico
        objGrafico.series.push({
            name: 'Prático',
            data: this.listaAceleracao
        });

        // Adiciona os dados teóricos no objeto do gráfico
        objGrafico.series.push({
            name: 'Teórico',
            data: [[this.inclinado[0].tempo, this.aceleracaoMedia], [this.inclinado[3].tempo, this.aceleracaoMedia]]
        });

        // Cria o gráfico
        Highcharts.chart('grafico-inclinado-aceleracao-media', objGrafico);
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
                text: 'Energias do carrinho durante o deslocamento',
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
                max: 0.1
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
        const max = this.inclinado.length;

        for (let i = 0; i < max; i++) {
            const pointPot = [];
            const pointCin = [];
            const pointMec = [];

            pointPot.push(this.inclinado[i].tempo);
            pointPot.push(this.formulasService.energiaPotencial(this.massa, this.alturas[i]));
            listaPotencial.push(pointPot);

            pointCin.push(this.inclinado[i].tempo);
            pointCin.push(this.formulasService.energiaCinetica(this.massa, this.listaVelocidade[i][1]));
            listaCinetica.push(pointCin);

            pointMec.push(this.inclinado[i].tempo);
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

        // console.log(listaCinetica);


        // Cria o gráfico
        Highcharts.chart('grafico-potencial', objGrafico);
    }

}
