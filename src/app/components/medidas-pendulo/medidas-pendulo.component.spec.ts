import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasPenduloComponent } from './medidas-pendulo.component';

describe('MedidasPenduloComponent', () => {
  let component: MedidasPenduloComponent;
  let fixture: ComponentFixture<MedidasPenduloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidasPenduloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidasPenduloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
