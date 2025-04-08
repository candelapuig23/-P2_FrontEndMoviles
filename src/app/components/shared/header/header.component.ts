import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.backgroundVideo.nativeElement;

    video.muted = true; // Asegura que está silenciado para evitar restricciones
    video.loop = true; // Activa el loop por seguridad

    // Intentar reproducir al inicio
    video.play().catch((error) => {
      console.warn(
        'Autoplay bloqueado, esperando interacción del usuario',
        error
      );

      // Si se bloquea, esperar un clic del usuario para reproducir
      document.addEventListener(
        'click',
        () => {
          video.play();
        },
        { once: true }
      ); // Solo ejecuta esto una vez
    });

    // Si el video se pausa inesperadamente, lo reiniciamos
    video.addEventListener('pause', () => {
      setTimeout(() => {
        if (video.paused) video.play();
      }, 500);
    });
  }
}
