import { Component, OnInit } from '@angular/core';

export interface PlanoDados {
  distancia: number;
  tempo: number;
}

const ELEMENT_DATA: PlanoDados[] = [
  {distancia: 0.21, tempo: 0.297},
  {distancia: 0.395, tempo: 0.735},
  {distancia: 0.889, tempo: 1.077},
  {distancia: 1.26, tempo: 1.508},
];

@Component({
  selector: 'app-tabela-plano',
  templateUrl: './tabela-plano.component.html',
  styleUrls: ['./tabela-plano.component.scss']
})
export class TabelaPlanoComponent implements OnInit {

  displayedColumns: string[] = ['distancia', 'tempo'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
