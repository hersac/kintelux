import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabla-terceros',
  templateUrl: './tabla-terceros.component.html',
  styles: [
    `
      .table-container {
        overflow-x: auto;
      }
      .ion-table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
      }
      .ion-table th,
      .ion-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
      }
      .ion-table th {
        background-color: var(--ion-color-light);
        font-weight: bold;
      }
      .ion-table tr:nth-child(even) {
        background-color: var(--ion-color-light-shade);
      }
      .ion-table tr:hover {
        background-color: var(--ion-color-light-tint);
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSearchbar,
    IonButton,
    IonIcon,
  ],
})
export class TablaTercerosComponent implements OnInit {
  @Output() terceroSeleccionado = new EventEmitter<any>();

  tercerosList: any[] = [
    {
      id: 1,
      tipoDocumento: 'Cédula de Ciudadanía',
      identificacion: '1023456789',
      tipoPersona: 'Natural',
      nombre: 'Juan Carlos Pérez Gómez',
      razonSocial: '',
    },
    {
      id: 2,
      tipoDocumento: 'NIT',
      identificacion: '900123456-7',
      tipoPersona: 'Jurídica',
      nombre: '',
      razonSocial: 'Comercial El Éxito S.A.S.',
    },
    {
      id: 3,
      tipoDocumento: 'Cédula de Ciudadanía',
      identificacion: '52345678',
      tipoPersona: 'Natural',
      nombre: 'María Fernanda López Castro',
      razonSocial: '',
    },
    {
      id: 4,
      tipoDocumento: 'Cédula de Extranjería',
      identificacion: 'E345678',
      tipoPersona: 'Natural',
      nombre: 'John Smith Rogers',
      razonSocial: '',
    },
    {
      id: 5,
      tipoDocumento: 'NIT',
      identificacion: '800123456-1',
      tipoPersona: 'Jurídica',
      nombre: '',
      razonSocial: 'Distribuciones Colombia Ltda.',
    },
    {
      id: 6,
      tipoDocumento: 'Cédula de Ciudadanía',
      identificacion: '79876543',
      tipoPersona: 'Natural',
      nombre: 'Carlos Andrés Rodríguez Torres',
      razonSocial: '',
    },
    {
      id: 7,
      tipoDocumento: 'Pasaporte',
      identificacion: 'P123456789',
      tipoPersona: 'Natural',
      nombre: 'Ana María González Díaz',
      razonSocial: '',
    },
    {
      id: 8,
      tipoDocumento: 'NIT',
      identificacion: '901234567-8',
      tipoPersona: 'Jurídica',
      nombre: '',
      razonSocial: 'Inversiones Andinas S.A.',
    },
    {
      id: 9,
      tipoDocumento: 'Cédula de Ciudadanía',
      identificacion: '1020345678',
      tipoPersona: 'Natural',
      nombre: 'Sandra Patricia Muñoz Vargas',
      razonSocial: '',
    },
    {
      id: 10,
      tipoDocumento: 'NIT',
      identificacion: '860123456-2',
      tipoPersona: 'Jurídica',
      nombre: '',
      razonSocial: 'Importadora Global E.U.',
    },
  ];

  constructor() {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {}

  editarTercero(tercero: any) {
    this.terceroSeleccionado.emit(tercero);
  }
}
