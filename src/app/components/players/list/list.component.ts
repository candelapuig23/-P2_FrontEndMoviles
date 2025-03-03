import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [NgIf, NgFor]
})
export class ListComponent {

    players = [
      { number: 10, name: 'Moses Moody', position: 'Guard', image: 'assets/img/moody.png', height: "6'4\"", weight: '205 lbs', age: 22, ppg: 10.1, rpg: 4.8, apg: 3.5 },
      { number: 30, name: 'Stephen Curry', position: 'Point Guard', image: 'assets/img/curry.png', height: "6'2\"", weight: '185 lbs', age: 35, ppg: 27.3, rpg: 5.3, apg: 6.5},
      { number: 11, name: 'Klay Thompson', position: 'Shooting Guard', image: 'assets/img/klay.png', height: "6'6\"", weight: '215 lbs', age: 33, ppg: 20.4, rpg: 4.1, apg: 2.5},
      { number: 23, name: 'LeBron James', position: 'Small Forward', image: 'assets/img/lebron.png', height: "6'9\"", weight: '250 lbs', age: 39, ppg: 25.0, rpg: 7.5, apg: 7.8},
      { number: 3, name: 'Anthony Davis', position: 'Power Forward', image: 'assets/img/davis.png', height: "6'10\"", weight: '253 lbs', age: 30, ppg: 24.0, rpg: 10.4, apg: 3.2},
      { number: 0, name: 'Jayson Tatum', position: 'Small Forward', image: 'assets/img/tatum.png', height: "6'8\"", weight: '210 lbs', age: 26, ppg: 26.8, rpg: 8.0, apg: 4.5},
      { number: 7, name: 'Jaylen Brown', position: 'Shooting Guard', image: 'assets/img/brown.png', height: "6'6\"", weight: '223 lbs', age: 27, ppg: 22.6, rpg: 5.5, apg: 3.2},
      { number: 77, name: 'Luka Doncic', position: 'Point Guard', image: 'assets/img/doncic.png', height: "6'7\"", weight: '230 lbs', age: 24, ppg: 30.5, rpg: 9.1, apg: 8.7},
      { number: 21, name: 'Joel Embiid', position: 'Center', image: 'assets/img/embiid.png', height: "7'0\"", weight: '280 lbs', age: 29, ppg: 32.0, rpg: 10.9, apg: 4.3},
      { number: 34, name: 'Giannis Antetokounmpo', position: 'Power Forward', image: 'assets/img/giannis.png', height: "6'11\"", weight: '242 lbs', age: 29, ppg: 31.3, rpg: 11.4, apg: 5.5},
      { number: 1, name: 'Victor Wembanyama', position: 'Center', image: 'assets/img/wemby.png', height: "7'4\"", weight: '220 lbs', age: 20, ppg: 20.1, rpg: 10.3, apg: 3.1},
      { number: 25, name: 'Ben Simmons', position: 'Point Guard', image: 'assets/img/simmons.png', height: "6'10\"", weight: '230 lbs', age: 27, ppg: 14.5, rpg: 7.5, apg: 6.3}
    ];

    selectedPlayer: any = null;

    openModal(player: any) {
      this.selectedPlayer = player;
      setTimeout(() => { // Asegurar que el DOM se actualiza antes de abrir el modal
        const modalElement = document.getElementById('playerModal');
        if (modalElement) {
          new bootstrap.Modal(modalElement).show();
        }
      }, 100);
    }
  }
