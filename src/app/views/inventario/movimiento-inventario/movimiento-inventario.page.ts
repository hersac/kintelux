import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movimiento-inventario',
  templateUrl: './movimiento-inventario.page.html',
  styleUrls: ['./movimiento-inventario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MovimientoInventarioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
