import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { SearchComponent } from '../../shared/search/search.component';
import { FlipCardComponent } from '../card-flip/card-flip.component';
import { Player } from '../player/player.model';
import { PlayerFilterPipe } from '../../pipes/player-filter.pipe';
import { FirebaseService } from '../../../services/firebase.service';
import { Observable } from 'rxjs';
import { AddPlayerFormComponent } from '../add-player-form/add-player-form.component';
import { EditPlayerFormComponent } from '../edit-player-form/edit-player-form.component';

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
    AddPlayerFormComponent,
    EditPlayerFormComponent,
  ],
})
export class ListComponent implements OnInit {
  players$!: Observable<Player[]>;
  searchTerm: string = '';
  filterBy: any = {};

  mostrarForm: boolean = false;
  jugadorParaEditar: Player | null = null;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.players$ = this.firebaseService.getPlayers();
  }

  mostrarFormulario() {
    this.mostrarForm = true;
  }

  cerrarFormulario() {
    this.mostrarForm = false;
  }

  onPlayerUpdated() {
    this.jugadorParaEditar = null;
  }

  editarJugador(player: Player) {
    this.jugadorParaEditar = player;
  }

  eliminarJugador(id: string) {
    this.firebaseService.deletePlayer(id).then(() => {
      console.log(`Jugador ${id} eliminado`);
    });
  }
}
