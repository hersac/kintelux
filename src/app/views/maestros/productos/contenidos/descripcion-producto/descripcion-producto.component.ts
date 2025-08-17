import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from '@ionic/angular/standalone';

interface Producto {
  id?: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  unidadMedida: string;
  precioBase: number;
  estadoActivo: boolean;
}

@Component({
  selector: 'app-descripcion-producto',
  templateUrl: './descripcion-producto.component.html',
  styles: [''],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonToggle,
  ],
})
export class DescripcionProductoComponent implements OnInit {
  @Input() producto: Producto | null = null;
  @Output() guardadoExitoso = new EventEmitter<Producto>();
  @Output() cancelar = new EventEmitter<void>();

  productoForm!: FormGroup;
  modoEdicion = false;

  unidadesMedida: string[] = [
    'Unidad',
    'Kilogramo',
    'Litro',
    'Metro',
    'Paquete',
    'Docena',
    'Caja',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  ngOnChanges() {
    if (this.producto) {
      this.inicializarFormulario();
    }
  }

  inicializarFormulario() {
    this.productoForm = this.fb.group({
      codigo: [
        this.producto?.codigo || '',
        [Validators.required, Validators.maxLength(10)],
      ],
      nombre: [
        this.producto?.nombre || '',
        [Validators.required, Validators.maxLength(50)],
      ],
      descripcion: [
        this.producto?.descripcion || '',
        [Validators.required, Validators.maxLength(200)],
      ],
      unidadMedida: [this.producto?.unidadMedida || '', Validators.required],
      precioBase: [
        this.producto?.precioBase || 0,
        [Validators.required, Validators.min(0)],
      ],
      estadoActivo: [this.producto?.estadoActivo ?? true],
    });

    this.productoForm.disable(); // Inicialmente en modo visualización
  }

  activarEdicion() {
    this.modoEdicion = true;
    this.productoForm.enable();
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.inicializarFormulario();
    this.cancelar.emit();
  }

  guardarCambios() {
    if (this.productoForm.valid && this.producto) {
      const productoActualizado: Producto = {
        ...this.producto,
        codigo: this.productoForm.value.codigo,
        nombre: this.productoForm.value.nombre,
        descripcion: this.productoForm.value.descripcion,
        unidadMedida: this.productoForm.value.unidadMedida,
        precioBase: Number(this.productoForm.value.precioBase),
        estadoActivo: this.productoForm.value.estadoActivo,
      };

      this.guardadoExitoso.emit(productoActualizado);
      this.modoEdicion = false;
      this.productoForm.disable();
    }
  }

  volver() {
    this.cancelar.emit();
  }

  formatearPrecio(event: any) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    if (valor) {
      const precioNumerico = parseInt(valor, 10);
      this.productoForm.get('precioBase')?.setValue(precioNumerico);

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
}
