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
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-registrar-tercero',
  templateUrl: './registrar-tercero.component.html',
  styles: [''],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
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
export class RegistrarTerceroComponent implements OnInit {
  @Output() guardadoExitoso = new EventEmitter<void>();

  terceroForm: FormGroup;
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

  constructor(private formBuilder: FormBuilder) {
    this.terceroForm = this.formBuilder.group({
      tipoDocumento: ['', Validators.required],
      identificacion: ['', Validators.required],
      tipoPersona: ['natural', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      razonSocial: [''],
    });
  }

  ngOnInit() {
    // Al iniciar, configuramos las validaciones según el tipo de persona
    this.configurarValidacionesTipoPersona(this.tipoPersona);
  }

  onTipoPersonaChange(event: any) {
    this.tipoPersona = event.detail.value;
    this.configurarValidacionesTipoPersona(this.tipoPersona);
  }

  configurarValidacionesTipoPersona(tipo: string) {
    if (tipo === 'natural') {
      this.terceroForm.get('primerNombre')?.setValidators(Validators.required);
      this.terceroForm
        .get('primerApellido')
        ?.setValidators(Validators.required);
      this.terceroForm.get('razonSocial')?.clearValidators();
    } else {
      this.terceroForm.get('primerNombre')?.clearValidators();
      this.terceroForm.get('primerApellido')?.clearValidators();
      this.terceroForm.get('razonSocial')?.setValidators(Validators.required);
    }

    this.terceroForm.get('primerNombre')?.updateValueAndValidity();
    this.terceroForm.get('primerApellido')?.updateValueAndValidity();
    this.terceroForm.get('razonSocial')?.updateValueAndValidity();
  }

  guardarTercero() {
    if (this.terceroForm.valid) {
      console.log('Datos del tercero:', this.terceroForm.value);
      // Aquí iría la lógica para guardar el tercero

      // Resetear el formulario después de guardar
      this.terceroForm.reset({
        tipoPersona: 'natural', // Valor por defecto
      });
      this.tipoPersona = 'natural';
      this.configurarValidacionesTipoPersona('natural');

      // Emitir evento de guardado exitoso
      this.guardadoExitoso.emit();
    } else {
      console.log('Formulario inválido');
      this.terceroForm.markAllAsTouched();

      // Mostrar mensaje al usuario (podrías usar un toast o alerta)
      console.log('Por favor, complete todos los campos obligatorios');
    }
  }
}
