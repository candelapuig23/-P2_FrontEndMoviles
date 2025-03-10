import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../players/player/player.model';

@Pipe({
  name: 'playerFilter',
  standalone: true,
})
export class PlayerFilterPipe implements PipeTransform {
  transform(players: Player[], searchTerm: string): Player[] {
    if (!players || !searchTerm) {
      return players;
    }

    searchTerm = searchTerm.toLowerCase();

    return players.filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm) ||
        player.position.toLowerCase().includes(searchTerm) ||
        player.number.toString().includes(searchTerm)
    );
  }
}
