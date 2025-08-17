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
  selector: 'app-descripcion-proveedor',
  templateUrl: './descripcion-proveedor.component.html',
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
export class DescripcionProveedorComponent implements OnInit {
  @Input() set proveedor(value: any) {
    if (value) {
      this.cargarDatosProveedor(value);
    }
  }

  @Output() guardadoExitoso = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  proveedorForm: FormGroup;
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
    this.proveedorForm = this.formBuilder.group({
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

  cargarDatosProveedor(proveedor: any) {
    const tipoPersonaLower = proveedor.tipoPersona.toLowerCase();

    const tipoDocumentoId =
      this.tiposDocumento.find(tipo => tipo.nombre === proveedor.tipoDocumento)
        ?.id || '';

    this.tipoPersona = tipoPersonaLower;

    this.proveedorForm.patchValue({
      tipoDocumento: tipoDocumentoId,
      identificacion: proveedor.identificacion,
      tipoPersona: tipoPersonaLower,
      estado: proveedor.estado.toLowerCase(),
      fechaCreacion: proveedor.fechaCreacion,
      fechaActualizacion: proveedor.fechaActualizacion,
      ...(tipoPersonaLower === 'natural' && {
        primerNombre: proveedor.nombre.split(' ')[0] || '',
        segundoNombre: proveedor.nombre.split(' ')[1] || '',
        primerApellido: proveedor.nombre.split(' ')[2] || '',
        segundoApellido: proveedor.nombre.split(' ')[3] || '',
      }),
      ...(tipoPersonaLower === 'juridica' && {
        razonSocial: proveedor.razonSocial,
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
      this.proveedorForm
        .get('primerNombre')
        ?.setValidators(Validators.required);
      this.proveedorForm
        .get('primerApellido')
        ?.setValidators(Validators.required);
      this.proveedorForm.get('razonSocial')?.clearValidators();
    } else {
      this.proveedorForm.get('primerNombre')?.clearValidators();
      this.proveedorForm.get('primerApellido')?.clearValidators();
      this.proveedorForm.get('razonSocial')?.setValidators(Validators.required);
    }

    this.proveedorForm.get('primerNombre')?.updateValueAndValidity();
    this.proveedorForm.get('primerApellido')?.updateValueAndValidity();
    this.proveedorForm.get('razonSocial')?.updateValueAndValidity();
  }

  guardarProveedor() {
    if (this.proveedorForm.valid) {
      const fechaActual = new Date().toISOString().split('T')[0];

      // Actualizamos solo la fecha de actualización
      this.proveedorForm.get('fechaActualizacion')?.setValue(fechaActual);

      console.log(
        'Datos actualizados del proveedor:',
        this.proveedorForm.value,
      );
      this.guardadoExitoso.emit();
    }
  }

  cancelarEdicion() {
    this.cancelar.emit();
  }
}
