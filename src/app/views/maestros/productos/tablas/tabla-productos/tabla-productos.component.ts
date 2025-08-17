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
  IonItem,
  IonLabel,
  IonRow,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  unidadMedida: string;
  precioBase: number;
  estadoActivo: boolean;
}

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styles: [
    `
      .precio {
        font-weight: bold;
        color: var(--ion-color-primary);
      }
      .inactivo {
        opacity: 0.6;
        text-decoration: line-through;
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
    IonSearchbar,
    IonItem,
    IonLabel,
  ],
})
export class TablaProductosComponent implements OnInit {
  @Output() productoSeleccionado = new EventEmitter<Producto>();

  terminoBusqueda: string = '';

  // Datos simulados de productos (en un caso real vendrían de un servicio)
  productos: Producto[] = [
    {
      id: 1,
      codigo: 'PRD001',
      nombre: 'Computador Portátil',
      descripcion: 'Computador portátil para uso profesional',
      unidadMedida: 'Unidad',
      precioBase: 2500000,
      estadoActivo: true,
    },
    {
      id: 2,
      codigo: 'PRD002',
      nombre: 'Monitor 24"',
      descripcion: 'Monitor LED de 24 pulgadas Full HD',
      unidadMedida: 'Unidad',
      precioBase: 850000,
      estadoActivo: true,
    },
    {
      id: 3,
      codigo: 'PRD003',
      nombre: 'Teclado mecánico',
      descripcion: 'Teclado mecánico con retroiluminación',
      unidadMedida: 'Unidad',
      precioBase: 320000,
      estadoActivo: true,
    },
    {
      id: 4,
      codigo: 'PRD004',
      nombre: 'Mouse inalámbrico',
      descripcion: 'Mouse ergonómico inalámbrico',
      unidadMedida: 'Unidad',
      precioBase: 85000,
      estadoActivo: true,
    },
    {
      id: 5,
      codigo: 'PRD005',
      nombre: 'Impresora láser',
      descripcion: 'Impresora láser monocromática',
      unidadMedida: 'Unidad',
      precioBase: 750000,
      estadoActivo: false,
    },
  ];

  constructor() {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {}

  buscarProductos(evento: any) {
    this.terminoBusqueda = evento.target.value.toLowerCase();
  }

  get productosFiltrados(): Producto[] {
    if (!this.terminoBusqueda) {
      return this.productos;
    }

    return this.productos.filter(
      producto =>
        producto.codigo.toLowerCase().includes(this.terminoBusqueda) ||
        producto.nombre.toLowerCase().includes(this.terminoBusqueda) ||
        producto.descripcion.toLowerCase().includes(this.terminoBusqueda) ||
        producto.unidadMedida.toLowerCase().includes(this.terminoBusqueda),
    );
  }

  seleccionarProducto(producto: Producto) {
    this.productoSeleccionado.emit(producto);
  }

  obtenerClaseProducto(producto: Producto): string {
    return producto.estadoActivo ? '' : 'inactivo';
  }

  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio);
  }
}
