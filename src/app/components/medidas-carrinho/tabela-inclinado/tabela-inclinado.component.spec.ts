import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaInclinadoComponent } from './tabela-inclinado.component';

describe('TabelaInclinadoComponent', () => {
  let component: TabelaInclinadoComponent;
  let fixture: ComponentFixture<TabelaInclinadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaInclinadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaInclinadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
