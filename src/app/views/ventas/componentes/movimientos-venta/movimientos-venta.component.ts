import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline } from 'ionicons/icons';

export interface ProductoMovimiento {
  id: number;
  codigo: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
}

@Component({
  selector: 'app-movimientos-venta',
  templateUrl: './movimientos-venta.component.html',
  styles: [
    `
      .total-row {
        font-weight: bold;
        border-top: 1px solid var(--ion-color-medium);
      }
      .precio {
        color: var(--ion-color-primary);
        font-weight: bold;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonText,
  ],
})
export class MovimientosVentaComponent implements OnInit {
  @Output() abrirModal = new EventEmitter<void>();

  // Lista de productos en la venta
  productosVenta: ProductoMovimiento[] = [];

  constructor() {
    addIcons({ addCircleOutline, trashOutline });
  }

  ngOnInit() {}

  // Abrir modal para agregar producto
  agregarProducto() {
    this.abrirModal.emit();
  }

  // Agregar nuevo producto a la lista de movimientos
  addProductoToList(producto: ProductoMovimiento) {
    // Verificar si el producto ya existe en la lista
    const productoExistente = this.productosVenta.find(
      p => p.id === producto.id,
    );

    if (productoExistente) {
      // Si ya existe, actualizar cantidad y recalcular total
      productoExistente.cantidad += producto.cantidad;
      productoExistente.total =
        productoExistente.cantidad * productoExistente.precioUnitario;
    } else {
      // Si no existe, agregarlo a la lista
      this.productosVenta.push({
        ...producto,
        total: producto.cantidad * producto.precioUnitario,
      });
    }
  }

  // Eliminar producto de la lista
  eliminarProducto(index: number) {
    this.productosVenta.splice(index, 1);
  }

  // Reiniciar la lista de productos
  reiniciarMovimientos() {
    this.productosVenta = [];
  }

  // Calcular el total de la venta
  get totalVenta(): number {
    return this.productosVenta.reduce(
      (total, producto) => total + producto.total,
      0,
    );
  }

  // Formatear moneda
  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  }
}
