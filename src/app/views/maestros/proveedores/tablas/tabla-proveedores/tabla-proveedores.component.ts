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
  selector: 'app-tabla-proveedores',
  templateUrl: './tabla-proveedores.component.html',
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
export class TablaProveedoresComponent implements OnInit {
  @Output() proveedorSeleccionado = new EventEmitter<any>();

  proveedoresList: any[] = [
    {
      id: 1,
      tipoDocumento: 'Cédula de Ciudadanía',
      identificacion: '1023456789',
      tipoPersona: 'Natural',
      nombre: 'Juan Carlos Pérez Gómez',
      razonSocial: '',
      fechaCreacion: '2023-05-15',
      fechaActualizacion: '2023-07-20',
      estado: 'Activo',
    },
    {
      id: 2,
      tipoDocumento: 'NIT',
      identificacion: '900123456-7',
      tipoPersona: 'Jurídica',
      nombre: '',
      razonSocial: 'Comercial El Éxito S.A.S.',
      fechaCreacion: '2023-02-10',
      fechaActualizacion: '2023-08-05',
      estado: 'Activo',
    },
    {
      id: 3,
      tipoDocumento: 'Cédula de Ciudadanía',
      identificacion: '52345678',
      tipoPersona: 'Natural',
      nombre: 'María Fernanda López Castro',
      razonSocial: '',
      fechaCreacion: '2022-11-30',
      fechaActualizacion: '2023-06-12',
      estado: 'Activo',
    },
    {
      id: 4,
      tipoDocumento: 'Cédula de Extranjería',
      identificacion: 'E345678',
      tipoPersona: 'Natural',
      nombre: 'John Smith Rogers',
      razonSocial: '',
      fechaCreacion: '2023-01-05',
      fechaActualizacion: '2023-05-25',
      estado: 'Inactivo',
    },
    {
      id: 5,
      tipoDocumento: 'NIT',
      identificacion: '800123456-1',
      tipoPersona: 'Jurídica',
      nombre: '',
      razonSocial: 'Distribuciones Colombia Ltda.',
      fechaCreacion: '2022-09-18',
      fechaActualizacion: '2023-04-30',
      estado: 'Activo',
    },
  ];

  constructor() {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {}

  editarProveedor(proveedor: any) {
    this.proveedorSeleccionado.emit(proveedor);
  }
}
