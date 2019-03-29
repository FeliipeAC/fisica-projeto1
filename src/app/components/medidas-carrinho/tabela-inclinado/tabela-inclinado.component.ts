import { Component, OnInit } from '@angular/core';

export interface PlanoDados {
  distancia: number;
  tempo: number;
}

const ELEMENT_DATA: PlanoDados[] = [
  {distancia: 0.118, tempo: 1.108},
  {distancia: 0.488, tempo: 2.422},
  {distancia: 1.038, tempo: 3.575},
  {distancia: 1.582, tempo: 4.287},
];

@Component({
  selector: 'app-tabela-inclinado',
  templateUrl: './tabela-inclinado.component.html',
  styleUrls: ['./tabela-inclinado.component.scss']
})
export class TabelaInclinadoComponent implements OnInit {

  displayedColumns: string[] = ['distancia', 'tempo'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
