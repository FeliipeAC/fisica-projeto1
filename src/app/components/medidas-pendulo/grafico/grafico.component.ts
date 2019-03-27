import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as shape from 'd3-shape';
import * as d3 from 'd3';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  view: any[] = [700, 400];

  // Òptions
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

  cores = {
    14: {
      cor1: '',
      cor2: ''
    },
    26.3: {
      cor1: '',
      cor2: ''
    },
    43.1: {
      cor1: '',
      cor2: ''
    },
    89: {
      cor1: '',
      cor2: ''
    },
    103.9: {
      cor1: '',
      cor2: ''
    },
    116.3: {
      cor1: '',
      cor2: ''
    }
  };

  colorScheme = {
    domain: ['#0031e0', '#A10A28', '#C7B42C', '#4dd4ec', '#a517e0', '#5AA454']
  };

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

  dataChat;

  data: any[] = [
    {
      name: 'Altura/Tempo',
      series: [
        {
          name: 0.14,
          value: 3.50
        },
        {
          name: 0.263,
          value: 4.97
        },
        {
          name: 0.431,
          value: 6.26
        },

        {
          name: 0.89,
          value: 9.12
        },
        {
          name: 1.039,
          value: 9.9
        },
        {
          name: 1.161,
          value: 10.53
        },
      ]
    },
    // {
    //   name: '26.3 cm',
    //   series: [
    //     {
    //       name: 'Primeira',
    //       value: 5.06
    //     },
    //     {
    //       name: 'Segunda',
    //       value: 4.88
    //     },
    //     {
    //       name: 'Terceira',
    //       value: 4.98
    //     },
    //   ]
    // },
    // {
    //   name: '43.1 cm',
    //   series: [
    //     {
    //       name: 'Primeira',
    //       value: 6.17
    //     },
    //     {
    //       name: 'Segunda',
    //       value: 6.30
    //     },
    //     {
    //       name: 'Terceira',
    //       value: 6.31
    //     },
    //   ]
    // },
    // {
    //   name: '89.0 cm',
    //   series: [
    //     {
    //       name: 'Primeira',
    //       value: 8.92
    //     },
    //     {
    //       name: 'Segunda',
    //       value: 9.12
    //     },
    //     {
    //       name: 'Terceira',
    //       value: 9.33
    //     },
    //   ]
    // },
    // {
    //   name: '103.9 cm',
    //   series: [
    //     {
    //       name: 'Primeira',
    //       value: 9.90
    //     },
    //     {
    //       name: 'Segunda',
    //       value: 9.82
    //     },
    //     {
    //       name: 'Terceira',
    //       value: 9.98
    //     },
    //   ]
    // },
    // {
    //   name: '116.3 cm',
    //   series: [
    //     {
    //       name: 'Primeira',
    //       value: 10.62
    //     },
    //     {
    //       name: 'Segunda',
    //       value: 10.56
    //     },
    //     {
    //       name: 'Terceira',
    //       value: 10.43
    //     },
    //   ]
    // },
  ];

  g = 10;

  @Output() element = new EventEmitter();
  @Input() disabledAnimation;

  constructor() {
    console.log('Medidas: ', this.medidas);
    console.log('Data: ', this.data);
  }

  /**
   * Dispara evento para animação do pêndulo
   *
   */
  onSelect(event): void {
    console.log('Event: ', event);
    console.log('Cores: ', this.cores);

    // Verifica se event é tipo Object
    if (typeof event === 'object') {

      // Emite evento com os dados para animação do pêndulo
      this.element.emit({altura: event.series, tempo: event.value});
    }
  }


  ngOnInit() {
    this.setValores();
  }

  setValores() {

    this.dataChat = [
      {
        name: 'Perido/Tempo',
        series: []
      }
    ];

    for (let i = 0; i < this.medidas.length; i++) {
      this.dataChat[0].series[i] = {
        name: this.medidas[i].altura / 100,
        value: this.calculaPeriodo(this.medidas[i].altura / 100)
      };
    }
    console.log('Dados do gráfico: ', this.dataChat);

  }

  calculaPeriodo(altura: number): number {
    const valor = (2 * Math.PI * Math.sqrt(altura / this.g));
    console.log('Periodo: ', valor);
    // parseFloat(valor.toFixed(2));
    return parseFloat(valor.toFixed(2));
    // return valor;
  }

}
