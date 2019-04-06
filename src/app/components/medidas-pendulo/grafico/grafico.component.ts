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

    /**
     * Massa da esfera (em kg)
     */
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

    /**
     * Medida usada para os cálculos do pêndulo (maior altura)
     */
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

    /**
     * Dados da velociade x tempo
     */
    listaVelocidade = [];

    /**
     * Dados da posição x tempo
     */
    listaPosicao = [];

    /**
     * Dados da aceleração x tempo
     */
    listaAceleracao = [];

    /**
     * Dados com a energia cinética
     */
    listaCinetica = [];

    /**
     * Dados com a energia potencial
     */
    listaPotencial = [];

    /**
     * Dados com a energia mecânica
     */
    listaMecanica = [];

    /**
     * Dados com altura x tempo
     */
    listaAltura = [];

    /**
     * Lista com os tempos que serão usados para construir os gráficos
     */
    pontosTempo = [];

    /**
     * Tempo médio dos tempos medidos
     */
    tempoMedio = 0;

    /**
     * Gravidade (m/s³)
     */
    g = 9.8;

    @Output() element = new EventEmitter();
    @Input() disabledAnimation;

    /**
     * Gráficos do experimento com o pêndulo
     * @param formulas Serviço com as fórmulas necessárias
     */
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

        // Tempo médio
        this.tempoMedio = (this.medida.t1 + this.medida.t2 + this.medida.t3) / 3;

        // Preenche a lista com os tempos num intervalo de 0.080s
        for (let i = 0; i < this.tempoMedio; i += 0.061) {
            this.pontosTempo.push(parseFloat(i.toFixed(3)));
        }
        // console.log('Lista tempo: ', this.pontosTempo);
    }

    ngOnInit() {
        this.graficoPeriodo();
        this.graficoVelocidade();
        this.graficoPosicao();
        this.graficoAceleracao();
        this.graficoEnergias();
        this.graficoAltura();
    }

    /**
     * Constrói o gráfico de velocidade x tempo
     */
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
                text: 'Variação da posição de acordo com o tempo',
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
            },

            exporting: {
                printMaxWidth: 1200
            }

        };

        // Periodo
        const periodo = this.calculaPeriodo(this.medida.altura);
        // console.log('Periodo: ', periodo);

        // Monta lista com os cálculos da velocidade
        for (const tempo of this.pontosTempo) {
            const point = [];
            point.push(parseFloat(tempo.toFixed(5)));
            const vel = this.formulas.velocidadePendulo(periodo, this.medida.altura, tempo);
            point.push(vel);

            // console.log('Item: ', point);
            this.listaVelocidade.push(point);
        }

        // console.log('Velocidade: ', this.listaVelocidade);

        // Adiciona os dados no objeto do gráfico
        objGrafico.series.push({
            name: 'Velocidade',
            data: this.listaVelocidade,
            marker: {
                enabled: true,
                radius: 3
            },
        });
        // console.log('Periodo: ', this.listaPeriodo);

        // Cria o gráfico
        Highcharts.chart('grafico-pendulo-velocidade', objGrafico);
    }


    /**
     * Consrói o gráfico de posição x tempo
     */
    graficoPosicao(): void {
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
                },
                // minTickInterval: 0.1
            },

            yAxis: {
                title: {
                    text: 'Posição (m)'
                },
                // min: 0
            },

            legend: {
                enabled: false,
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
            },

            exporting: {
                printMaxWidth: 1200
            }

        };

        // Periodo
        const periodo = this.calculaPeriodo(this.medida.altura);

        // Monta lista com os cálculos da posição
        for (const tempo of this.pontosTempo) {

            // Ponto do gráfico
            const point = [];

            // Adiciona o tempo no ponto
            point.push(parseFloat(tempo.toFixed(3)));

            // Calcula a posição
            const pos = this.formulas.posicaoPendulo(periodo, this.medida.altura, tempo);

            // Adiciona a posição no ponto
            point.push(pos);

            // console.log('Item: ', point);

            // Adiciona o ponto na lista
            this.listaPosicao.push(point);
        }

        // console.log('Posição: ', this.listaPosicao);

        // Adiciona os dados no objeto do gráfico
        objGrafico.series.push({
            name: 'Posição',
            data: this.listaPosicao,
            marker: {
                enabled: true,
                radius: 3
            },
        });
        // console.log('Periodo: ', this.listaPeriodo);

        // Cria o gráfico
        Highcharts.chart('grafico-pendulo-posicao', objGrafico);
    }


    /**
     * Consrói o gráfico de aceleração x tempo
     */
    graficoAceleracao(): void {
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
                },
                // minTickInterval: 0.1
            },

            yAxis: {
                title: {
                    text: 'Posição (m/s²)'
                },
                // min: 0
            },

            legend: {
                enabled: false,
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
                    marker: {
                        enabled: true
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
            },

            exporting: {
                printMaxWidth: 1200
            }

        };

        // Periodo
        const periodo = this.calculaPeriodo(this.medida.altura);

        // Monta lista com os cálculos da aceleração
        for (const tempo of this.pontosTempo) {
            const point = [];
            point.push(parseFloat(tempo.toFixed(3)));
            const ace = this.formulas.aceleracaoPendulo(periodo, this.medida.altura, tempo);
            point.push(ace);

            // console.log('Item: ', point);
            this.listaAceleracao.push(point);
        }

        // console.log('Acelaração: ', this.listaAceleracao);

        // Adiciona os dados no objeto do gráfico
        objGrafico.series.push({
            name: 'Aceleração',
            data: this.listaAceleracao,
            marker: {
                enabled: true,
                radius: 3
            },
        });
        // console.log('Periodo: ', this.listaPeriodo);

        // Cria o gráfico
        Highcharts.chart('grafico-pendulo-aceleracao', objGrafico);
    }

    /**
     * Consrói o gráfico de energias (Gravitacional, Cinética e Mecânica)
     */
    graficoEnergias(): void {
        // Objeto com as configurações do gráfico
        const objGrafico = {

            title: {
                text: 'Energias',
                style: {
                    fontSize: '16px',
                    color: '#404040',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto, sans-serif'
                }
            },

            subtitle: {
                text: 'Comparação entre as energias Cinética, Potencial e Mecânica',
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
                // minTickInterval: 0.1
            },

            yAxis: {
                title: {
                    text: 'Engeria (J)'
                },
                min: 0
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
            },

            exporting: {
                printMaxWidth: 1200
            },

        };

        // Periodo
        const periodo = this.calculaPeriodo(this.medida.altura);

        // Monta lista com os cálculos da energia cinética
        for (let i = 0; i < this.pontosTempo.length; i++) {

            // Ponto do gráfico
            const point = [];

            // Adiciona o tempo
            point.push(parseFloat(this.pontosTempo[i].toFixed(3)));

            // Calcula a energia cinética
            const cin = this.formulas.energiaCinetica(this.massa, this.listaVelocidade[i][1]);

            // Adiciona a energia
            point.push(cin);

            // console.log('Item: ', point);

            // Adiciona o ponto na lista
            this.listaCinetica.push(point);
        }

        // Monta lista com os cálculos da energia potencial gravitacional
        for (const tempo of this.pontosTempo) {

            // Ponto do gráfico
            const point = [];

            // Adiciona o tempo
            point.push(parseFloat(tempo.toFixed(3)));

            // Calcula a altura
            const altura = this.formulas.alturaPendulo(this.medida.altura, 5, periodo, tempo);

            // Calcula a energia potencial
            const pot = this.formulas.energiaPotencial(this.massa, altura);

            // Adiciona a energia
            point.push(pot);

            // console.log('Item: ', point);

            // Adicona o ponto na lista
            this.listaPotencial.push(point);
        }

        // Monta lista com os cálculos da energia mecânica
        for (let i = 0; i < this.pontosTempo.length; i++) {
            const point = [];
            point.push(parseFloat(this.pontosTempo[i].toFixed(3)));
            // const altura = this.formulas.alturaPendulo(this.medida.altura, 5, periodo, tempo);
            const mec = parseFloat((this.listaCinetica[i][1] + this.listaPotencial[i][1]).toFixed(3));
            point.push(mec);

            // console.log('Item: ', point);
            this.listaMecanica.push(point);
        }

        // console.log('Vel: ', this.listaVelocidade);

        // console.log('Cinetica: ', this.listaCinetica);
        // console.log('Potencial: ', this.listaPotencial);
        // console.log('Mecânica: ', this.listaMecanica);

        // Adiciona os dados de energia cinética no objeto do gráfico
        objGrafico.series.push({
            name: 'Energia Cinética',
            data: this.listaCinetica,
            marker: {
                enabled: true,
                radius: 3
            },
        });

        // Adiciona os dados de energica potencial gravitacional no objeto do gráfico
        objGrafico.series.push({
            name: 'Energia Potencial Gravitacional',
            data: this.listaPotencial,
            marker: {
                enabled: true,
                radius: 3
            },
        });

        // Adiciona os dados de energia mecânica no objeto do gráfico
        objGrafico.series.push({
            name: 'Energia Mecânica',
            data: this.listaMecanica,
            marker: {
                enabled: true,
                radius: 3
            },
        });
        // console.log('Periodo: ', this.listaPeriodo);

        // Cria o gráfico
        Highcharts.chart('grafico-pendulo-energias', objGrafico);
    }

    /**
     * Consrói o gráfico de energias (Gravitacional, Cinética e Mecânica)
     */
    graficoAltura(): void {
        // Objeto com as configurações do gráfico
        const objGrafico = {

            title: {
                text: 'Altura x Tempo',
                style: {
                    fontSize: '16px',
                    color: '#404040',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto, sans-serif'
                }
            },

            subtitle: {
                text: 'Variação da altura ao decorrer do tempo',
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
                // minTickInterval: 0.1
            },

            yAxis: {
                title: {
                    text: 'Altura (m)'
                },
                min: 0
            },

            legend: {
                enabled: true,
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
            },

            exporting: {
                printMaxWidth: 1200
            },

        };

        // Periodo
        const periodo = this.calculaPeriodo(this.medida.altura);

        // Monta lista com os cálculos da altura x tempo
        for (const tempo of this.pontosTempo) {

            // Ponto do gráfico
            const point = [];

            // Adiciona o tempo
            point.push(parseFloat(tempo.toFixed(3)));

            // Calcula a altura
            const altura = this.formulas.alturaPendulo(this.medida.altura, 5, periodo, tempo);

            // Adiciona a altura
            point.push(altura);

            // console.log('Item: ', point);

            // Adicona o ponto na lista
            this.listaAltura.push(point);
        }

        // Adiciona os dados da altura no objeto do gráfico
        objGrafico.series.push({
            name: 'Altura',
            data: this.listaAltura,
            marker: {
                enabled: true,
                radius: 3
            },
        });
        // console.log('Periodo: ', this.listaPeriodo);

        // Cria o gráfico
        Highcharts.chart('grafico-pendulo-altura', objGrafico);
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
