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

@Component({
  selector: 'app-registrar-item',
  templateUrl: './registrar-item.component.html',
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
export class RegistrarItemComponent implements OnInit {
  @Output() guardadoExitoso = new EventEmitter<void>();

  itemForm: FormGroup;

  categorias: any[] = [
    { id: 'electronico', nombre: 'Electrónicos' },
    { id: 'perifericos', nombre: 'Periféricos' },
    { id: 'impresoras', nombre: 'Impresoras' },
    { id: 'accesorios', nombre: 'Accesorios' },
    { id: 'otros', nombre: 'Otros' },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      estaActivo: [true],
    });
  }

  ngOnInit() {}

  guardarItem() {
    if (this.itemForm.valid) {
      console.log('Datos del item:', this.itemForm.value);
      // Aquí iría la lógica para guardar el item

      // Resetear el formulario después de guardar
      this.itemForm.reset({
        estaActivo: true,
        cantidad: 0,
        precioUnitario: 0,
        stock: 0,
      });

      // Emitir evento de guardado exitoso
      this.guardadoExitoso.emit();
    } else {
      console.log('Formulario inválido');
      this.itemForm.markAllAsTouched();

      // Mostrar mensaje al usuario (podrías usar un toast o alerta)
      console.log('Por favor, complete todos los campos obligatorios');
    }
  }

  // Método para formatear el valor del precio como moneda
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
