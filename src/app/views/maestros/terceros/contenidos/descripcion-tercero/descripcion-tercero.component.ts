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
  selector: 'app-descripcion-tercero',
  templateUrl: './descripcion-tercero.component.html',
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
export class DescripcionTerceroComponenent implements OnInit {
  @Input() set tercero(value: any) {
    if (value) {
      this.cargarDatosTercero(value);
    }
  }

  @Output() guardadoExitoso = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

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
    this.configurarValidacionesTipoPersona(this.tipoPersona);
  }

  cargarDatosTercero(tercero: any) {
    const tipoPersonaLower = tercero.tipoPersona.toLowerCase();

    const tipoDocumentoId =
      this.tiposDocumento.find(tipo => tipo.nombre === tercero.tipoDocumento)
        ?.id || '';

    this.tipoPersona = tipoPersonaLower;

    this.terceroForm.patchValue({
      tipoDocumento: tipoDocumentoId,
      identificacion: tercero.identificacion,
      tipoPersona: tipoPersonaLower,
      ...(tipoPersonaLower === 'natural' && {
        primerNombre: tercero.nombre.split(' ')[0] || '',
        segundoNombre: tercero.nombre.split(' ')[1] || '',
        primerApellido: tercero.nombre.split(' ')[2] || '',
        segundoApellido: tercero.nombre.split(' ')[3] || '',
      }),
      ...(tipoPersonaLower === 'juridica' && {
        razonSocial: tercero.razonSocial,
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
      console.log('Datos actualizados del tercero:', this.terceroForm.value);
      this.guardadoExitoso.emit();
    }
  }

  cancelarEdicion() {
    this.cancelar.emit();
  }
}
