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
      transition('flipped => default', animate('500ms ease-out')),
    ]),
  ],
})
export class FlipCardComponent {
  @Input() player: any;
  isFlipped: boolean = false;
  static activeCard: FlipCardComponent | null = null;

  @ViewChild(MediaComponent) mediaComponent!: MediaComponent;

  constructor() {}

  toggleFlip() {
    if (FlipCardComponent.activeCard && FlipCardComponent.activeCard !== this) {
      FlipCardComponent.activeCard.isFlipped = false;
    }
    this.isFlipped = !this.isFlipped;
    FlipCardComponent.activeCard = this.isFlipped ? this : null;
  }

  openVideo(event: Event) {
    event.stopPropagation(); // Evita que la carta gire cuando se abre el modal
    if (this.mediaComponent) {
      console.log(`🟢 Abriendo video de ${this.player.name}...`);
      this.mediaComponent.playerName = this.player.name; // Asigna el nombre del jugador al modal
      this.mediaComponent.openModal();
    } else {
      console.error('❌ No se encontró el MediaComponent');
    }
  }
}
