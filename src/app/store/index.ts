import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface EstadoApp {
  tituloSeccion: string | null;
}

export const estadoInicial: EstadoApp = {
  tituloSeccion: null,
};

@Injectable({
  providedIn: 'root',
})
export class GlobalStore {
  private estado: WritableSignal<EstadoApp> = signal(estadoInicial);

  constructor(private router: Router) {
    this.escucharCambiosDeRuta();
  }

  readonly tituloSeccion: Signal<string | null> = computed(
    () => this.estado().tituloSeccion,
  );

  establecerTituloSeccion(titulo: string): void {
    this.estado.update(estado => ({
      ...estado,
      tituloSeccion: titulo,
    }));
  }

  reiniciarEstado(): void {
    this.estado.set(estadoInicial);
  }

  private escucharCambiosDeRuta(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const ruta = event.urlAfterRedirects;
        const seccion = this.extraerNombreSeccion(ruta);
        this.establecerTituloSeccion(seccion);
      });
  }

  private extraerNombreSeccion(ruta: string): string {
    if (ruta === '/') {
      return 'Inicio';
    }
    const rutaLimpia = ruta.split('?')[0].split('#')[0];
    const segmentos = rutaLimpia.split('/').filter(segment => segment);
    if (segmentos.length === 0) {
      return 'Inicio';
    }
    const ultimoSegmento = segmentos[segmentos.length - 1];

    return ultimoSegmento
      .split('-')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  }
}
