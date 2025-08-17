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
} from '@ionic/angular/standalone';

interface Proveedor {
  id: string;
  nombre: string;
}

interface TipoDocumento {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-encabezado-compra',
  templateUrl: './encabezado-compra.component.html',
  styles: [''],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
  ],
})
export class EncabezadoCompraComponent implements OnInit {
  @Output() encabezadoValid = new EventEmitter<boolean>();

  encabezadoForm!: FormGroup;

  // Datos de ejemplo para tipos de documento
  tiposDocumento: TipoDocumento[] = [
    { id: 'FCO', nombre: 'Factura de Compra' },
    { id: 'RCO', nombre: 'Remisión de Compra' },
    { id: 'DCO', nombre: 'Devolución de Compra' },
  ];

  // Datos de ejemplo para proveedores
  proveedores: Proveedor[] = [
    { id: '9001234567', nombre: 'Tecnologías del Sur S.A.S' },
    { id: '9009876543', nombre: 'Distribuidora Oriental Ltda.' },
    { id: '9005678901', nombre: 'Importaciones del Norte S.A.' },
  ];

  // Datos de ejemplo para centros de operación
  centrosOperacion = [
    { id: 'P01', nombre: 'Principal Bogotá' },
    { id: 'S01', nombre: 'Sucursal Medellín' },
    { id: 'S02', nombre: 'Sucursal Cali' },
  ];

  constructor(private fb: FormBuilder) {
    this.inicializarFormulario();
  }

  ngOnInit() {
    this.configurarEscuchasFormulario();
  }

  // Método para buscar un proveedor (se implementaría con un servicio real)
  buscarProveedor() {
    const idProveedor = this.encabezadoForm.get('idProveedor')?.value;
    if (idProveedor) {
      // Aquí iría la lógica para buscar el proveedor en un servicio
      console.log('Buscando proveedor con ID:', idProveedor);
    }
  }

  // Método para reiniciar el formulario
  reiniciarFormulario() {
    this.encabezadoForm.reset({
      moneda: 'COP',
    });
    // Emitir estado de validez
    this.encabezadoValid.emit(false);
  }

  // Método para inicializar el formulario
  private inicializarFormulario() {
    this.encabezadoForm = this.fb.group({
      centroOperacion: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      idProveedor: ['', Validators.required],
      nombreProveedor: [{ value: '', disabled: true }],
      moneda: [{ value: 'COP', disabled: true }],
    });
  }

  // Configura los listeners del formulario
  private configurarEscuchasFormulario() {
    // Escuchar cambios en el id del proveedor para actualizar el nombre
    this.encabezadoForm
      .get('idProveedor')
      ?.valueChanges.subscribe(idProveedor => {
        const proveedorSeleccionado = this.proveedores.find(
          p => p.id === idProveedor,
        );
        if (proveedorSeleccionado) {
          this.encabezadoForm
            .get('nombreProveedor')
            ?.setValue(proveedorSeleccionado.nombre);
        } else {
          this.encabezadoForm.get('nombreProveedor')?.setValue('');
        }
      });

    // Emitir el estado de validez del formulario cuando cambie
    this.encabezadoForm.statusChanges.subscribe(status => {
      this.encabezadoValid.emit(status === 'VALID');
    });
  }
}
