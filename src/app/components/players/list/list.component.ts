import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SearchComponent } from '../../shared/search/search.component';
import { FlipCardComponent } from '../card-flip/card-flip.component';
import { PLAYERS } from './players'; //hacemos la importación del Array de jugadores


@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',

  imports: [NgFor, SearchComponent, FlipCardComponent]

})

export class ListComponent {

    players = PLAYERS;

    filteredPlayers = [...this.players];

    ngOnInit() {
      this.filteredPlayers = [...this.players];
    }


    /***
   * Método para filtrar jugadores basado en la búsqueda del usuario.
   */
    filterPlayers(searchTerm: string) {
      const term = searchTerm.toLowerCase();
      this.filteredPlayers = this.players.filter(player =>
        player.name.toLowerCase().includes(term) ||
        player.position.toLowerCase().includes(term) ||
        player.number.toString().includes(term)
      );
    }
  /**
     * Método para manejar la lógica del componente FlipCard
     */
  toggleFlip(player: any) {
    player.isFlipped = !player.isFlipped;
  }
  }
