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

@Component({
  selector: 'app-registrar-proveedor',
  templateUrl: './registrar-proveedor.component.html',
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
  ],
})
export class RegistrarProveedorComponent implements OnInit {
  @Output() guardadoExitoso = new EventEmitter<void>();

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
    });
  }

  ngOnInit() {
    this.configurarValidacionesTipoPersona(this.tipoPersona);
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

      // Agregamos las fechas de creación y actualización
      const proveedorData = {
        ...this.proveedorForm.value,
        fechaCreacion: fechaActual,
        fechaActualizacion: fechaActual,
      };

      console.log('Datos del proveedor:', proveedorData);
      // Aquí iría la lógica para guardar el proveedor

      // Resetear el formulario después de guardar
      this.proveedorForm.reset({
        tipoPersona: 'natural', // Valor por defecto
        estado: 'activo', // Valor por defecto
      });
      this.tipoPersona = 'natural';
      this.configurarValidacionesTipoPersona('natural');

      // Emitir evento de guardado exitoso
      this.guardadoExitoso.emit();
    } else {
      console.log('Formulario inválido');
      this.proveedorForm.markAllAsTouched();

      // Mostrar mensaje al usuario (podrías usar un toast o alerta)
      console.log('Por favor, complete todos los campos obligatorios');
    }
  }
}
