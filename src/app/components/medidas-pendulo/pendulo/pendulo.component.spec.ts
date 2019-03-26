import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenduloComponent } from './pendulo.component';

describe('PenduloComponent', () => {
  let component: PenduloComponent;
  let fixture: ComponentFixture<PenduloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenduloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenduloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
