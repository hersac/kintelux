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

interface Item {
  id?: number;
  codigo: string;
  descripcion: string;
  cantidad: number;
  categoria: string;
  precioUnitario: number;
  stock: number;
  estaActivo: boolean;
}

@Component({
  selector: 'app-descripcion-item',
  templateUrl: './descripcion-item.component.html',
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
export class DescripcionItemComponent implements OnInit {
  @Input() item: Item | null = null;
  @Output() guardadoExitoso = new EventEmitter<Item>();
  @Output() cancelar = new EventEmitter<void>();

  itemForm!: FormGroup;
  modoEdicion = false;

  categorias: any[] = [
    { id: 'electronico', nombre: 'Electrónicos' },
    { id: 'perifericos', nombre: 'Periféricos' },
    { id: 'impresoras', nombre: 'Impresoras' },
    { id: 'accesorios', nombre: 'Accesorios' },
    { id: 'otros', nombre: 'Otros' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  ngOnChanges() {
    if (this.item) {
      this.inicializarFormulario();
    }
  }

  inicializarFormulario() {
    this.itemForm = this.fb.group({
      codigo: [
        this.item?.codigo || '',
        [Validators.required, Validators.maxLength(10)],
      ],
      descripcion: [
        this.item?.descripcion || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      cantidad: [
        this.item?.cantidad || 0,
        [Validators.required, Validators.min(0)],
      ],
      categoria: [this.item?.categoria || '', Validators.required],
      precioUnitario: [
        this.item?.precioUnitario || 0,
        [Validators.required, Validators.min(0)],
      ],
      stock: [this.item?.stock || 0, [Validators.required, Validators.min(0)]],
      estaActivo: [this.item?.estaActivo ?? true],
    });

    this.itemForm.disable(); // Inicialmente en modo visualización
  }

  activarEdicion() {
    this.modoEdicion = true;
    this.itemForm.enable();
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.inicializarFormulario();
    this.cancelar.emit();
  }

  guardarCambios() {
    if (this.itemForm.valid && this.item) {
      const itemActualizado: Item = {
        ...this.item,
        codigo: this.itemForm.value.codigo,
        descripcion: this.itemForm.value.descripcion,
        cantidad: Number(this.itemForm.value.cantidad),
        categoria: this.itemForm.value.categoria,
        precioUnitario: Number(this.itemForm.value.precioUnitario),
        stock: Number(this.itemForm.value.stock),
        estaActivo: this.itemForm.value.estaActivo,
      };

      this.guardadoExitoso.emit(itemActualizado);
      this.modoEdicion = false;
      this.itemForm.disable();
    }
  }

  volver() {
    this.cancelar.emit();
  }

  formatearPrecio(event: any) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    if (valor) {
      const precioNumerico = parseInt(valor, 10);
      this.itemForm.get('precioUnitario')?.setValue(precioNumerico);

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
