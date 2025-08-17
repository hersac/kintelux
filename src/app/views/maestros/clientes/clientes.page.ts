import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { DescripcionClienteComponent } from './contenidos/descripcion-cliente/descripcion-cliente.component';
import { RegistrarClienteComponent } from './formularios/registrar-cliente/registrar-cliente.component';
import { TablaClientesComponent } from './tablas/tabla-clientes/tabla-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styles: [],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    CommonModule,
    TablaClientesComponent,
    RegistrarClienteComponent,
    DescripcionClienteComponent,
  ],
})
export class ClientesPage implements OnInit {
  mostrarFormulario: boolean = false;
  mostrarEdicion: boolean = false;
  clienteSeleccionado: any = null;

  constructor() {
    addIcons({ addCircleOutline });
  }

  ngOnInit() {}

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (this.mostrarFormulario) {
      this.mostrarEdicion = false;
      this.clienteSeleccionado = null;
    }
  }

  ocultarFormulario() {
    this.mostrarFormulario = false;
  }

  onClienteSeleccionado(cliente: any) {
    this.clienteSeleccionado = cliente;
    this.mostrarEdicion = true;
    this.mostrarFormulario = false;
  }

  ocultarEdicion() {
    this.mostrarEdicion = false;
    this.clienteSeleccionado = null;
  }
}
