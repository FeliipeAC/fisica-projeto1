import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosInclinadoComponent } from './graficos-inclinado.component';

describe('GraficosInclinadoComponent', () => {
  let component: GraficosInclinadoComponent;
  let fixture: ComponentFixture<GraficosInclinadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficosInclinadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosInclinadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
