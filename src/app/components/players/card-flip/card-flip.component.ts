import { Component, Input, ViewChild} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MediaComponent } from '../media/media.component';



@Component({
  selector: 'app-flip-card',
  standalone: true,
  templateUrl: './card-flip.component.html',
  styleUrls: ['./card-flip.component.css'],
  imports: [CommonModule, MediaComponent],

  animations: [
    trigger('flipState', [
      state('default', style({ transform: 'rotateY(0)' })),
      state('flipped', style({ transform: 'rotateY(180deg)' })),
      transition('default => flipped', animate('500ms ease-in')),
      transition('flipped => default', animate('500ms ease-out'))
    ])
  ]
})
export class FlipCardComponent {

  @Input() player: any;
  isFlipped: boolean = false;
  @ViewChild(MediaComponent) mediaComponent!: MediaComponent;

  ngAfterViewInit() {
    if (!this.mediaComponent) {
      console.error('❌ MediaComponent no está disponible en FlipCardComponent');
    } else {
      console.log('🟢 MediaComponent vinculado correctamente');
    }
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  openVideo(event: Event) {
    event.stopPropagation(); // Para que no haga flip
    if (this.mediaComponent) {
      console.log('🟢 Abriendo video desde FlipCardComponent...');
      this.mediaComponent.openModal();
    } else {
      console.error('❌ No se encontró el MediaComponent');
    }
  }
}
