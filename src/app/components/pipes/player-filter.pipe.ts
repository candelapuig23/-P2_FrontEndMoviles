import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../players/player/player.model';
import { ToNumberPipe } from './toNumber.pipe';

@Pipe({
  name: 'playerFilter',
  standalone: true,
  pure: false, // Permite cambios dinámicos
})
export class PlayerFilterPipe implements PipeTransform {
  constructor(private toNumberPipe: ToNumberPipe) {} // Inyectamos la pipe de conversión numérica

  transform(
    players: Player[],
    searchTerm: string,
    position: string = '',
    height: string = '',
    weight: string = '',
    age: string = '',
    ppg: string = '',
    rpg: string = '',
    apg: string = ''
  ): Player[] {
    if (!players) return [];

    return players.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.number.toString().includes(searchTerm);

      const matchesPosition =
        position === '' ||
        player.position.toLowerCase() === position.toLowerCase();

      //Convertimos la altura con `ToNumberPipe`
      const heightValue = this.toNumberPipe.transform(player.height);
      console.log(`Altura procesada: ${player.height} -> ${heightValue}`); //Debug para ver qué valores están entrando

      const matchesHeight =
        height === '' ||
        (height === 'short' && heightValue > 0 && heightValue < 6.6) || // Evitamos valores negativos
        (height === 'medium' && heightValue >= 6.6 && heightValue <= 7.0) ||
        (height === 'tall' && heightValue > 7.0);

      const weightValue = this.toNumberPipe.transform(player.weight);
      const matchesWeight =
        weight === '' ||
        (weight === 'light' && weightValue < 200) ||
        (weight === 'medium' && weightValue >= 200 && weightValue <= 250) ||
        (weight === 'heavy' && weightValue > 250);

      const ageValue = this.toNumberPipe.transform(player.age);
      const matchesAge =
        age === '' ||
        (age === 'young' && ageValue < 25) ||
        (age === 'middle' && ageValue >= 25 && ageValue <= 30) ||
        (age === 'old' && ageValue > 30);


      return matchesSearch && matchesPosition && matchesHeight && matchesWeight && matchesAge;
    });
  }
}
