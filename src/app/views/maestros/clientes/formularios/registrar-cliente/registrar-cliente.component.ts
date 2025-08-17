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
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
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
export class RegistrarClienteComponent implements OnInit {
  @Output() guardadoExitoso = new EventEmitter<void>();

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

      // Agregamos las fechas de creación y actualización
      const clienteData = {
        ...this.clienteForm.value,
        fechaCreacion: fechaActual,
        fechaActualizacion: fechaActual,
      };

      console.log('Datos del cliente:', clienteData);
      // Aquí iría la lógica para guardar el cliente

      // Resetear el formulario después de guardar
      this.clienteForm.reset({
        tipoPersona: 'natural', // Valor por defecto
        estado: 'activo', // Valor por defecto
      });
      this.tipoPersona = 'natural';
      this.configurarValidacionesTipoPersona('natural');

      // Emitir evento de guardado exitoso
      this.guardadoExitoso.emit();
    } else {
      console.log('Formulario inválido');
      this.clienteForm.markAllAsTouched();

      // Mostrar mensaje al usuario (podrías usar un toast o alerta)
      console.log('Por favor, complete todos los campos obligatorios');
    }
  }
}
