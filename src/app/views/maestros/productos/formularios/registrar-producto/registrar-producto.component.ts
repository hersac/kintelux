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
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
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
export class RegistrarProductoComponent implements OnInit {
  @Output() guardadoExitoso = new EventEmitter<void>();

  productoForm: FormGroup;

  unidadesMedida: string[] = [
    'Unidad',
    'Kilogramo',
    'Litro',
    'Metro',
    'Paquete',
    'Docena',
    'Caja',
  ];

  constructor(private formBuilder: FormBuilder) {
    this.productoForm = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      unidadMedida: ['', Validators.required],
      precioBase: [0, [Validators.required, Validators.min(0)]],
      estadoActivo: [true],
    });
  }

  ngOnInit() {}

  guardarProducto() {
    if (this.productoForm.valid) {
      console.log('Datos del producto:', this.productoForm.value);
      // Aquí iría la lógica para guardar el producto

      // Resetear el formulario después de guardar
      this.productoForm.reset({
        estadoActivo: true,
        precioBase: 0,
      });

      // Emitir evento de guardado exitoso
      this.guardadoExitoso.emit();
    } else {
      console.log('Formulario inválido');
      this.productoForm.markAllAsTouched();

      // Mostrar mensaje al usuario (podrías usar un toast o alerta)
      console.log('Por favor, complete todos los campos obligatorios');
    }
  }

  // Método para formatear el valor del precio como moneda
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
