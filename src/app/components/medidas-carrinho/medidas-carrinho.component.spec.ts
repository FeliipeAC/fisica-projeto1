import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasCarrinhoComponent } from './medidas-carrinho.component';

describe('MedidasCarrinhoComponent', () => {
  let component: MedidasCarrinhoComponent;
  let fixture: ComponentFixture<MedidasCarrinhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidasCarrinhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidasCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
