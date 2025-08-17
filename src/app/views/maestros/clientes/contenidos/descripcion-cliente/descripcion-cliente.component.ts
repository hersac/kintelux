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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-descripcion-cliente',
  templateUrl: './descripcion-cliente.component.html',
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
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class DescripcionClienteComponent implements OnInit {
  @Input() set cliente(value: any) {
    if (value) {
      this.cargarDatosCliente(value);
    }
  }

  @Output() guardadoExitoso = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  clienteForm: FormGroup;
  tipoPersona: string = 'natural';

  tiposDocumento: any[] = [
    { id: 1, nombre: 'Cédula de Ciudadanía' },
    { id: 2, nombre: 'NIT' },
    { id: 3, nombre: 'Pasaporte' },
    { id: 4, nombre: 'Cédula de Extranjería' },
  ];

  tiposPersona: any[] = [
    { id: 'natural', nombre: 'Persona Natural' },
    { id: 'juridica', nombre: 'Persona Jurídica' },
  ];

  estados: any[] = [
    { id: 'activo', nombre: 'Activo' },
    { id: 'inactivo', nombre: 'Inactivo' },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.clienteForm = this.formBuilder.group({
      tipoDocumento: ['', Validators.required],
      identificacion: ['', Validators.required],
      tipoPersona: ['natural', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      razonSocial: [''],
      estado: ['activo', Validators.required],
      fechaCreacion: [{ value: '', disabled: true }],
      fechaActualizacion: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    this.configurarValidacionesTipoPersona(this.tipoPersona);
  }

  cargarDatosCliente(cliente: any) {
    const tipoPersonaLower = cliente.tipoPersona.toLowerCase();

    const tipoDocumentoId =
      this.tiposDocumento.find(tipo => tipo.nombre === cliente.tipoDocumento)
        ?.id || '';

    this.tipoPersona = tipoPersonaLower;

    this.clienteForm.patchValue({
      tipoDocumento: tipoDocumentoId,
      identificacion: cliente.identificacion,
      tipoPersona: tipoPersonaLower,
      estado: cliente.estado.toLowerCase(),
      fechaCreacion: cliente.fechaCreacion,
      fechaActualizacion: cliente.fechaActualizacion,
      ...(tipoPersonaLower === 'natural' && {
        primerNombre: cliente.nombre.split(' ')[0] || '',
        segundoNombre: cliente.nombre.split(' ')[1] || '',
        primerApellido: cliente.nombre.split(' ')[2] || '',
        segundoApellido: cliente.nombre.split(' ')[3] || '',
      }),
      ...(tipoPersonaLower === 'juridica' && {
        razonSocial: cliente.razonSocial,
      }),
    });

    this.configurarValidacionesTipoPersona(tipoPersonaLower);
  }

  onTipoPersonaChange(event: any) {
    this.tipoPersona = event.detail.value;
    this.configurarValidacionesTipoPersona(this.tipoPersona);
  }

  configurarValidacionesTipoPersona(tipo: string) {
    if (tipo === 'natural') {
      this.clienteForm.get('primerNombre')?.setValidators(Validators.required);
      this.clienteForm
        .get('primerApellido')
        ?.setValidators(Validators.required);
      this.clienteForm.get('razonSocial')?.clearValidators();
    } else {
      this.clienteForm.get('primerNombre')?.clearValidators();
      this.clienteForm.get('primerApellido')?.clearValidators();
      this.clienteForm.get('razonSocial')?.setValidators(Validators.required);
    }

    this.clienteForm.get('primerNombre')?.updateValueAndValidity();
    this.clienteForm.get('primerApellido')?.updateValueAndValidity();
    this.clienteForm.get('razonSocial')?.updateValueAndValidity();
  }

  guardarCliente() {
    if (this.clienteForm.valid) {
      const fechaActual = new Date().toISOString().split('T')[0];

      // Actualizamos solo la fecha de actualización
      this.clienteForm.get('fechaActualizacion')?.setValue(fechaActual);

      console.log('Datos actualizados del cliente:', this.clienteForm.value);
      this.guardadoExitoso.emit();
    }
  }

  cancelarEdicion() {
    this.cancelar.emit();
  }
}
