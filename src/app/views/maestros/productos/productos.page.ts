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
import { DescripcionProductoComponent } from './contenidos/descripcion-producto/descripcion-producto.component';
import { RegistrarProductoComponent } from './formularios/registrar-producto/registrar-producto.component';
import { TablaProductosComponent } from './tablas/tabla-productos/tabla-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styles: [''],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    CommonModule,
    TablaProductosComponent,
    RegistrarProductoComponent,
    DescripcionProductoComponent,
  ],
})
export class ProductosPage implements OnInit {
  mostrarFormulario: boolean = false;
  mostrarEdicion: boolean = false;
  productoSeleccionado: any = null;

  constructor() {
    addIcons({ addCircleOutline });
  }

  ngOnInit() {}

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (this.mostrarFormulario) {
      this.mostrarEdicion = false;
      this.productoSeleccionado = null;
    }
  }

  ocultarFormulario() {
    this.mostrarFormulario = false;
  }

  onProductoSeleccionado(producto: any) {
    this.productoSeleccionado = producto;
    this.mostrarEdicion = true;
    this.mostrarFormulario = false;
  }

  ocultarEdicion() {
    this.mostrarEdicion = false;
    this.productoSeleccionado = null;
  }
}
