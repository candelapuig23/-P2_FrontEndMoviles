import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SearchComponent } from '../../shared/search/search.component';
import { FlipCardComponent } from '../card-flip/card-flip.component';
import { PLAYERS } from '../../../data/players'; //hacemos la importación del Array de jugadores
import { Player } from '../player/player.model'; // importamos la interfaz
import { PlayerFilterPipe } from '../../pipes/player-filter.pipe'; // IMPORTAMOS EL PIPE



@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',

  imports: [NgFor, SearchComponent, FlipCardComponent, PlayerFilterPipe],
})
export class ListComponent {
  players: Player[] = PLAYERS; // Definimos que `players` es un array de Player
  searchTerm: string = ''; // Se usará en el Pipe

  /**
   * Método para manejar la lógica del componente FlipCard
   */
  toggleFlip(player: any) {
    player.isFlipped = !player.isFlipped;
  }
}
