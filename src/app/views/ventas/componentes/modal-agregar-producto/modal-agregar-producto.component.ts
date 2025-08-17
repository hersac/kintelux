import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, searchOutline } from 'ionicons/icons';
import { ProductoMovimiento } from '../movimientos-venta/movimientos-venta.component';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precioUnitario: number;
}

@Component({
  selector: 'app-modal-agregar-producto',
  templateUrl: './modal-agregar-producto.component.html',
  styles: [
    `
      .producto-item {
        cursor: pointer;
      }
      .producto-item:hover {
        background-color: var(--ion-color-light);
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
    FormsModule,
    ReactiveFormsModule,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
  ],
})
export class ModalAgregarProductoComponent implements OnInit {
  @Output() productoAgregado = new EventEmitter<ProductoMovimiento>();
  @Output() cerrarModal = new EventEmitter<void>();

  isOpen = false;
  productoForm: FormGroup;
  terminoBusqueda: string = '';
  productoSeleccionado: Producto | null = null;

  // Lista de productos de ejemplo
  productos: Producto[] = [
    {
      id: 1,
      codigo: 'P001',
      nombre: 'Laptop HP Pavilion',
      precioUnitario: 3200000,
    },
    {
      id: 2,
      codigo: 'P002',
      nombre: 'Monitor Dell 24"',
      precioUnitario: 1100000,
    },
    {
      id: 3,
      codigo: 'P003',
      nombre: 'Teclado Mecánico Logitech',
      precioUnitario: 420000,
    },
    {
      id: 4,
      codigo: 'P004',
      nombre: 'Mouse Inalámbrico Microsoft',
      precioUnitario: 110000,
    },
    {
      id: 5,
      codigo: 'P005',
      nombre: 'Impresora HP LaserJet',
      precioUnitario: 950000,
    },
  ];

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
    });

    addIcons({ closeOutline, searchOutline });
  }

  ngOnInit() {}

  abrirModal() {
    this.isOpen = true;
    this.resetearFormulario();
  }

  cerrar() {
    this.isOpen = false;
    this.cerrarModal.emit();
  }

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
        producto.nombre.toLowerCase().includes(this.terminoBusqueda),
    );
  }

  seleccionarProducto(producto: Producto) {
    this.productoSeleccionado = producto;
    this.productoForm.get('precioUnitario')?.setValue(producto.precioUnitario);
  }

  formatearPrecio(event: any) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    if (valor) {
      const precioNumerico = parseInt(valor, 10);
      this.productoForm.get('precioUnitario')?.setValue(precioNumerico);

      // Formatear como moneda colombiana para mostrar en el input
      const precioFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(precioNumerico);

      event.target.value = precioFormateado;
    }
  }

  agregarProducto() {
    if (this.productoForm.valid && this.productoSeleccionado) {
      const nuevoMovimiento: ProductoMovimiento = {
        id: this.productoSeleccionado.id,
        codigo: this.productoSeleccionado.codigo,
        nombre: this.productoSeleccionado.nombre,
        cantidad: this.productoForm.value.cantidad,
        precioUnitario: this.productoForm.value.precioUnitario,
        total:
          this.productoForm.value.cantidad *
          this.productoForm.value.precioUnitario,
      };

      this.productoAgregado.emit(nuevoMovimiento);
      this.cerrar();
    }
  }

  private resetearFormulario() {
    this.productoSeleccionado = null;
    this.terminoBusqueda = '';
    this.productoForm.reset({
      cantidad: 1,
      precioUnitario: 0,
    });
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  }
}
