import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { SearchComponent } from '../../shared/search/search.component';
import { FlipCardComponent } from '../card-flip/card-flip.component';
import { EditPlayerFormComponent } from '../edit-player-form/edit-player-form.component';
import { Player } from '../player/player.model';
import { PlayerFilterPipe } from '../../pipes/player-filter.pipe';
import { FirebaseService } from '../../../services/firebase.service';
import { Observable } from 'rxjs';
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
    EditPlayerFormComponent
  ],
})
export class ListComponent implements OnInit {
  players$!: Observable<Player[]>;
  searchTerm: string = '';
  filterBy: any = {};

  jugadorParaEditar: Player | null = null;

  constructor(
    public firebaseService: FirebaseService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.cargarJugadores();
  }

  cargarJugadores(): void {
    this.players$ = this.firebaseService.getPlayers();
  }

  onEditPlayer(player: Player) {
    this.jugadorParaEditar = player;
  }

  onPlayerUpdated() {
    this.jugadorParaEditar = null;
    this.cargarJugadores(); // Recarga los jugadores después de editar
  }

  toggleFlip(player: any) {
    player.isFlipped = !player.isFlipped;
  }
}
