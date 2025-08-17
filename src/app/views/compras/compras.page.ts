import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { EncabezadoCompraComponent } from './componentes/encabezado-compra/encabezado-compra.component';
import { ModalAgregarProductoComponent } from './componentes/modal-agregar-producto/modal-agregar-producto.component';
import {
  MovimientosCompraComponent,
  ProductoMovimiento,
} from './componentes/movimientos-compra/movimientos-compra.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styles: [''],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    EncabezadoCompraComponent,
    MovimientosCompraComponent,
    ModalAgregarProductoComponent,
  ],
})
export class ComprasPage implements OnInit {
  @ViewChild(ModalAgregarProductoComponent)
  modalProducto!: ModalAgregarProductoComponent;
  @ViewChild(MovimientosCompraComponent)
  movimientosCompra!: MovimientosCompraComponent;
  @ViewChild(EncabezadoCompraComponent)
  encabezadoCompra!: EncabezadoCompraComponent;

  encabezadoValido = false;

  constructor(private toastController: ToastController) {}

  ngOnInit() {}

  abrirModalProducto() {
    this.modalProducto.abrirModal();
  }

  onProductoAgregado(producto: ProductoMovimiento) {
    this.movimientosCompra.addProductoToList(producto);
  }

  onEncabezadoValidChange(esValido: boolean) {
    this.encabezadoValido = esValido;
  }

  async guardarCompra() {
    if (!this.encabezadoValido) {
      this.presentToast(
        'Por favor, complete todos los campos del encabezado.',
        'danger',
      );
      return;
    }

    if (this.movimientosCompra.productosCompra.length === 0) {
      this.presentToast(
        'Debe agregar al menos un producto a la compra.',
        'danger',
      );
      return;
    }

    // Aquí iría la lógica para guardar la compra
    console.log('Guardando compra...');
    console.log('Encabezado válido:', this.encabezadoValido);
    console.log('Productos:', this.movimientosCompra.productosCompra);
    console.log('Total:', this.movimientosCompra.totalCompra);

    // Simulamos el guardado con un timeout
    await this.presentToast('Guardando compra...', 'primary');

    setTimeout(() => {
      // Reiniciar formularios y listas
      this.reiniciarVista();

      // Mostrar mensaje de éxito
      this.presentToast('Compra guardada correctamente', 'success');
    }, 1500);
  }

  // Método para reiniciar toda la vista
  reiniciarVista() {
    // Reiniciar el encabezado
    this.encabezadoCompra.reiniciarFormulario();

    // Reiniciar los movimientos
    this.movimientosCompra.reiniciarMovimientos();

    // Reiniciar el estado de validación
    this.encabezadoValido = false;
  }

  // Método para mostrar mensajes toast
  async presentToast(mensaje: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'top',
    });
    toast.present();
  }
}
