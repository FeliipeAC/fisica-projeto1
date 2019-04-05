import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as shape from 'd3-shape';
import { FormulasService } from 'src/app/services/formulas.service';

const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);


@Component({
    selector: 'app-grafico',
    templateUrl: './grafico.component.html',
    styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

    massa = 0.066;

    /**
    * Dados da medida
    */
    medidas: { altura: number, t1: number, t2: number, t3: number }[] = [
        {
            altura: 0.140,
            t1: 3.42,
            t2: 3.55,
            t3: 3.55,
        },
        {
            altura: 0.263,
            t1: 5.06,
            t2: 4.88,
            t3: 4.98,
        },
        {
            altura: 0.431,
            t1: 6.17,
            t2: 6.30,
            t3: 6.31,
        },
        {
            altura: 0.890,
            t1: 8.92,
            t2: 9.12,
            t3: 9.33,
        },
        {
            altura: 1.039,
            t1: 9.90,
            t2: 9.82,
            t3: 9.98,
        },
        {
            altura: 1.161,
            t1: 10.62,
            t2: 10.56,
            t3: 10.43,
        }
    ];

    medida: { altura: number, t1: number, t2: number, t3: number } = {
        altura: 1.161,
        t1: 10.62,
        t2: 10.56,
        t3: 10.43,
    };

    /**
    * Dados do gráfico
    */
    dataChat;

    /**
    * Lista com os dados do gráfico de período
    */
    listaPeriodo = [];

    listaVelocidade = [];

    /**
    * Gravidade (m/s³)
    */
    g = 9.8;

    @Output() element = new EventEmitter();
    @Input() disabledAnimation;

    constructor(private formulas: FormulasService) {
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
        this.graficoEP();
        this.graficoVelocidade();
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

    graficoVelocidade(): void {
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
                text: 'Variação da velocidade de acordo com o tempo',
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
                // min: 0
            },

            legend: {
                enabled: false,
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
                    // pointStart: 0
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

        // Tempo médio
        const tMedio = (this.medida.t1 + this.medida.t2 + this.medida.t3 ) / 3;

        // Lista com os tempos
        const pontosTempo = [];

        // Preenche a lista com os tempos num intervalo de 0.1s
        for (let i = 0; i < tMedio; i += 0.1) {
            pontosTempo.push(i);
        }

        // Tamanho da lista com as medidas
        const max = this.medidas.length;

        // Periodo
        const periodo = this.calculaPeriodo(this.medida.altura);

        // Monta lista com os cálculos da velocidade
        for (const tempo of pontosTempo) {
            const point = [];
            point.push(tempo.toFixed(3));
            const vel = this.formulas.velocidadePendulo(periodo, this.medida.altura, tempo);
            point.push(vel);

            // console.log('Item: ', point);
            this.listaVelocidade.push(point);
        }

        console.log('Velocidade: ', this.listaVelocidade);

        // Adiciona os dados no objeto do gráfico
        objGrafico.series.push({
          name: 'Velocidade',
          data: this.listaVelocidade
        });
        // console.log('Periodo: ', this.listaPeriodo);

        // Cria o gráfico
        Highcharts.chart('grafico-pendulo-velocidade', objGrafico);
    }

    graficoEP() {
        // Objeto com as configurações do gráfico
        const objGrafico = {

            title: {
                text: 'Energia Potencial',
                style: {
                    fontSize: '16px',
                    color: '#404040',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto, sans-serif'
                }
            },

            subtitle: {
                text: 'Variação da energia potencial de acordo com o tempo',
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
                    text: 'Energia potencial'
                },
                min: 0
            },

            legend: {
                enabled: false,
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
                    }
                }]
            },
            credits: {
                enabled: false,
            }

        };

        const listaEp = [];

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
                text: 'Variação do período de acordo com o comprimento do fio',
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
                }]
            },


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

            // console.log('Item: ', point);
            this.listaPeriodo.push(point);
        }

        // Adiciona os dados no objeto do gráfico
        objGrafico.series.push({
            name: 'Período',
            data: this.listaPeriodo
        });
        // console.log('Periodo: ', this.listaPeriodo);

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
