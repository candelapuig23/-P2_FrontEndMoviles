import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SearchComponent } from '../../shared/search/search.component';
import { FlipCardComponent } from '../card-flip/card-flip.component';


@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',

  imports: [NgFor, SearchComponent, FlipCardComponent]

})

export class ListComponent {

    players = [
      { number: 10, name: 'Moses Moody', position: 'Guard', image: 'assets/img/moody.png', height: "6'4\"", weight: '205 lbs', age: 22, ppg: 10.1, rpg: 4.8, apg: 3.5, videoFile: "video1.mp4"},
      { number: 30, name: 'Stephen Curry', position: 'Point Guard', image: 'assets/img/curry.png', height: "6'2\"", weight: '185 lbs', age: 35, ppg: 27.3, rpg: 5.3, apg: 6.5, videoFile: "video2.mp4"},
      { number: 11, name: 'Klay Thompson', position: 'Shooting Guard', image: 'assets/img/klay.png', height: "6'6\"", weight: '215 lbs', age: 33, ppg: 20.4, rpg: 4.1, apg: 2.5, videoFile: "video3.mp4"},
      { number: 23, name: 'LeBron James', position: 'Small Forward', image: 'assets/img/lebron.png', height: "6'9\"", weight: '250 lbs', age: 39, ppg: 25.0, rpg: 7.5, apg: 7.8, videoFile: "video4.mp4"},
      { number: 3, name: 'Anthony Davis', position: 'Power Forward', image: 'assets/img/davis.png', height: "6'10\"", weight: '253 lbs', age: 30, ppg: 24.0, rpg: 10.4, apg: 3.2, videoFile: "video5.mp4"},
      { number: 0, name: 'Jayson Tatum', position: 'Small Forward', image: 'assets/img/tatum.png', height: "6'8\"", weight: '210 lbs', age: 26, ppg: 26.8, rpg: 8.0, apg: 4.5, videoFile: "video6.mp4"},
      { number: 7, name: 'Jaylen Brown', position: 'Shooting Guard', image: 'assets/img/brown.png', height: "6'6\"", weight: '223 lbs', age: 27, ppg: 22.6, rpg: 5.5, apg: 3.2, videoFile: "video7.mp4"},
      { number: 77, name: 'Luka Doncic', position: 'Point Guard', image: 'assets/img/doncic.png', height: "6'7\"", weight: '230 lbs', age: 24, ppg: 30.5, rpg: 9.1, apg: 8.7, videoFile: "video8.mp4"},
      { number: 21, name: 'Joel Embiid', position: 'Center', image: 'assets/img/embiid.png', height: "7'0\"", weight: '280 lbs', age: 29, ppg: 32.0, rpg: 10.9, apg: 4.3, videoFile: "video9.mp4"},
      { number: 34, name: 'Giannis Antetokounmpo', position: 'Power Forward', image: 'assets/img/giannis.png', height: "6'11\"", weight: '242 lbs', age: 29, ppg: 31.3, rpg: 11.4, apg: 5.5, videoFile: "video10.mp4"},
      { number: 1, name: 'Victor Wembanyama', position: 'Center', image: 'assets/img/wemby.png', height: "7'4\"", weight: '220 lbs', age: 20, ppg: 20.1, rpg: 10.3, apg: 3.1, videoFile: "video11.mp4"},
      { number: 25, name: 'Ben Simmons', position: 'Point Guard', image: 'assets/img/simmons.png', height: "6'10\"", weight: '230 lbs', age: 27, ppg: 14.5, rpg: 7.5, apg: 6.3, videoFile: "video12.mp4"}
    ];

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
