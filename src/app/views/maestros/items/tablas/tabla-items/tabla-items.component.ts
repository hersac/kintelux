import { CommonModule, CurrencyPipe } from '@angular/common';
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
  selector: 'app-tabla-items',
  templateUrl: './tabla-items.component.html',
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
    CurrencyPipe,
  ],
})
export class TablaItemsComponent implements OnInit {
  @Output() itemSeleccionado = new EventEmitter<any>();

  itemsList: any[] = [
    {
      id: 1,
      codigo: 'PROD001',
      descripcion: 'Laptop HP Pavilion 15',
      cantidad: 10,
      categoria: 'Electrónicos',
      precioUnitario: 2500000,
      stock: 15,
      estaActivo: true,
    },
    {
      id: 2,
      codigo: 'PROD002',
      descripcion: 'Monitor Samsung 27"',
      cantidad: 8,
      categoria: 'Periféricos',
      precioUnitario: 850000,
      stock: 12,
      estaActivo: true,
    },
    {
      id: 3,
      codigo: 'PROD003',
      descripcion: 'Teclado Mecánico RGB',
      cantidad: 15,
      categoria: 'Periféricos',
      precioUnitario: 320000,
      stock: 20,
      estaActivo: true,
    },
    {
      id: 4,
      codigo: 'PROD004',
      descripcion: 'Mouse Inalámbrico Logitech',
      cantidad: 20,
      categoria: 'Periféricos',
      precioUnitario: 150000,
      stock: 30,
      estaActivo: false,
    },
    {
      id: 5,
      codigo: 'PROD005',
      descripcion: 'Impresora Multifuncional Epson',
      cantidad: 5,
      categoria: 'Impresoras',
      precioUnitario: 750000,
      stock: 8,
      estaActivo: true,
    },
  ];

  constructor() {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {}

  editarItem(item: any) {
    this.itemSeleccionado.emit(item);
  }
}
