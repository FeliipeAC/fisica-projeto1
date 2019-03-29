import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPlanoComponent } from './tabela-plano.component';

describe('TabelaPlanoComponent', () => {
  let component: TabelaPlanoComponent;
  let fixture: ComponentFixture<TabelaPlanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaPlanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
