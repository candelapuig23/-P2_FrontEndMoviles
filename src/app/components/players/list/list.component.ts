import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { SearchComponent } from '../../shared/search/search.component';
import { FlipCardComponent } from '../card-flip/card-flip.component';
import { Player } from '../player/player.model';
import { PlayerFilterPipe } from '../../pipes/player-filter.pipe';
import { FirebaseService } from '../../../services/firebase.service';
import { Observable } from 'rxjs';
import { PLAYERS } from '../../../data/players'; // 👈 Importamos el array local
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    SearchComponent,
    FlipCardComponent,
    PlayerFilterPipe,
  ],
})
export class ListComponent implements OnInit {
  players$!: Observable<Player[]>;
  searchTerm: string = '';
  filterBy: any = {};

  constructor(
    private firebaseService: FirebaseService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.players$ = this.firebaseService.getPlayers();

    // No ejecutar: solo para migración inicial de datos desde archivo local a Firebase
    // this.uploadPlayersToFirebase();
  }

  toggleFlip(player: any) {
    player.isFlipped = !player.isFlipped;
  }

  /**
   MIGRACIÓN INICIAL
  * Este método sube los jugadores del archivo local `players.ts` a Firestore.
  * No ejecutar más

  uploadPlayersToFirebase(): void {
    PLAYERS.forEach((player) => {
      this.ngZone.run(() => {
        this.firebaseService
          .addPlayer(player)
          .then(() =>
            console.log(`Jugador ${player.name} añadido correctamente.`)
          )
          .catch((error) =>
            console.error(`Error al subir jugador ${player.name}:`, error)
          );
      });
    });
  } */
}

