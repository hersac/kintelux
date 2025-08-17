import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimientoInventarioPage } from './movimiento-inventario.page';

describe('MovimientoInventarioPage', () => {
  let component: MovimientoInventarioPage;
  let fixture: ComponentFixture<MovimientoInventarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
