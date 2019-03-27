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
  showLegend = true;
  autoScale = false;
  showXAxisLabel = true;
  xAxisLabel = 'Verificações';
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
<<<<<<< HEAD
      cor1: '#ddd',
=======
      cor1: '',
>>>>>>> 3f8de110d0845d1318ff54046d5afe5b2cdd7dd3
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

  multi: any[] = [
    {
      name: '14 cm',
      series: [
        {
          name: 'Primeira',
          value: 3.42
        },
        {
          name: 'Segunda',
          value: 3.55
        },
        {
          name: 'Terceira',
          value: 3.55
        },
      ]
    },
    {
      name: '26.3 cm',
      series: [
        {
          name: 'Primeira',
          value: 5.06
        },
        {
          name: 'Segunda',
          value: 4.88
        },
        {
          name: 'Terceira',
          value: 4.98
        },
      ]
    },
    {
      name: '43.1 cm',
      series: [
        {
          name: 'Primeira',
          value: 6.17
        },
        {
          name: 'Segunda',
          value: 6.30
        },
        {
          name: 'Terceira',
          value: 6.31
        },
      ]
    },
    {
      name: '89.0 cm',
      series: [
        {
          name: 'Primeira',
          value: 8.92
        },
        {
          name: 'Segunda',
          value: 9.12
        },
        {
          name: 'Terceira',
          value: 9.33
        },
      ]
    },
    {
      name: '103.9 cm',
      series: [
        {
          name: 'Primeira',
          value: 9.90
        },
        {
          name: 'Segunda',
          value: 9.82
        },
        {
          name: 'Terceira',
          value: 9.98
        },
      ]
    },
    {
      name: '116.3 cm',
      series: [
        {
          name: 'Primeira',
          value: 10.62
        },
        {
          name: 'Segunda',
          value: 10.56
        },
        {
          name: 'Terceira',
          value: 10.43
        },
      ]
    },
  ];

  @Output() element = new EventEmitter();
  @Input() disabledAnimation;

  constructor() {
  }

  /**
   * Dispara evento para animação do pêndulo
   * @param event
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
  }

}
