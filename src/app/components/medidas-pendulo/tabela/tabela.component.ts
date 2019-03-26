import {Component, OnInit} from '@angular/core';

export interface PeriodicElement {
  altura: number;
  tempo1: number;
  tempo2: number;
  tempo3: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {altura: 14, tempo1: 3.42, tempo2: 3.55, tempo3: 3.55},
  {altura: 26.3, tempo1: 5.06, tempo2: 4.88, tempo3: 4.98},
  {altura: 43.1, tempo1: 6.17, tempo2: 6.30, tempo3: 6.31},
  {altura: 89, tempo1: 8.92, tempo2: 9.12, tempo3: 9.33},
  {altura: 103.9, tempo1: 9.90, tempo2: 9.82, tempo3: 9.98},
  {altura: 116.1, tempo1: 10.62, tempo2: 10.56, tempo3: 10.43},
];

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  displayedColumns: string[] = ['altura', 'tempo1', 'tempo2', 'tempo3'];
  dataSource = ELEMENT_DATA;

  constructor() {
  }

  ngOnInit() {
  }

}
