import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { SearchComponent } from '../../shared/search/search.component';
import { FlipCardComponent } from '../card-flip/card-flip.component';
import { PlayerFilterPipe } from '../../pipes/player-filter.pipe';
import { FirebaseService } from '../../../services/firebase.service';
import { Observable } from 'rxjs';
import { AddPlayerFormComponent } from '../add-player-form/add-player-form.component';
import { EditPlayerFormComponent } from '../edit-player-form/edit-player-form.component';
import { Player } from '../player/player.model';

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
  jugadorParaEditar: Player | null = null;
  searchTerm: string = '';
  filterBy: any = {};
  mostrarForm: boolean = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.players$ = this.firebaseService.getPlayers();
  }

  mostrarFormulario() {
    this.mostrarForm = true;
    this.jugadorParaEditar = null;
  }

  cerrarFormulario() {
    this.mostrarForm = false;
  }

  editarJugador(player: Player) {
    this.jugadorParaEditar = player;
    this.mostrarForm = false;
  }

  eliminarJugador(player: Player) {
    if (confirm(`¿Estás seguro de que quieres eliminar a ${player.name}?`)) {
      this.firebaseService.deletePlayer(player.id!).then(() => {
        console.log(`Jugador ${player.name} eliminado`);
      });
    }
  }

  onPlayerUpdated() {
    this.jugadorParaEditar = null;
  }
}

