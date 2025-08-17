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

interface Cliente {
  id: string;
  nombre: string;
}

interface TipoDocumento {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-encabezado-venta',
  templateUrl: './encabezado-venta.component.html',
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
export class EncabezadoVentaComponent implements OnInit {
  @Output() encabezadoValid = new EventEmitter<boolean>();

  encabezadoForm!: FormGroup;

  // Datos de ejemplo para tipos de documento
  tiposDocumento: TipoDocumento[] = [
    { id: 'FVE', nombre: 'Factura de Venta' },
    { id: 'RVE', nombre: 'Remisión de Venta' },
    { id: 'DVE', nombre: 'Devolución de Venta' },
  ];

  // Datos de ejemplo para clientes
  clientes: Cliente[] = [
    { id: '8001234567', nombre: 'Comercial del Este S.A.S' },
    { id: '8009876543', nombre: 'Supermercados Centro Ltda.' },
    { id: '8005678901', nombre: 'Tiendas del Oeste S.A.' },
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

  // Método para buscar un cliente (se implementaría con un servicio real)
  buscarCliente() {
    const idCliente = this.encabezadoForm.get('idCliente')?.value;
    if (idCliente) {
      // Aquí iría la lógica para buscar el cliente en un servicio
      console.log('Buscando cliente con ID:', idCliente);
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
      idCliente: ['', Validators.required],
      nombreCliente: [{ value: '', disabled: true }],
      moneda: [{ value: 'COP', disabled: true }],
    });
  }

  // Configura los listeners del formulario
  private configurarEscuchasFormulario() {
    // Escuchar cambios en el id del cliente para actualizar el nombre
    this.encabezadoForm.get('idCliente')?.valueChanges.subscribe(idCliente => {
      const clienteSeleccionado = this.clientes.find(c => c.id === idCliente);
      if (clienteSeleccionado) {
        this.encabezadoForm
          .get('nombreCliente')
          ?.setValue(clienteSeleccionado.nombre);
      } else {
        this.encabezadoForm.get('nombreCliente')?.setValue('');
      }
    });

    // Emitir el estado de validez del formulario cuando cambie
    this.encabezadoForm.statusChanges.subscribe(status => {
      this.encabezadoValid.emit(status === 'VALID');
    });
  }
}
