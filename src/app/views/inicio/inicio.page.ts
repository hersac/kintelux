import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { GlobalStore } from '../../store';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styles: [
    `
      .welcome-section {
        margin-top: var(--app-spacing-lg);
      }
    `,
  ],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule],
})
export class InicioPage implements OnInit {
  private store = inject(GlobalStore);

  constructor() {}

  ngOnInit() {
    this.store.establecerTituloSeccion('Inicio');
  }
}
