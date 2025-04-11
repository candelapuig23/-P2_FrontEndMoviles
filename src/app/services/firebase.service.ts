import { Injectable } from '@angular/core';
import {
  Database,
  ref,
  push,
  set,
  update,
  remove,
  onValue,
  get,
  child,
} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { NgZone, inject } from '@angular/core';



@Injectable({ providedIn: 'root' })
export class FirebaseService {
  //constructor(private db: Database, private ngZone: NgZone) {}
  private zone = inject(NgZone);

  // Crear jugador
  async addPlayer(player: any) {
    const jugadoresRef = ref(this.db, 'players');
    const nuevoJugadorRef = push(jugadoresRef);
    return set(nuevoJugadorRef, player);
  }

  // Obtener todos los jugadores como Observable (para async pipe)
  constructor(private db: Database) {}
  getPlayers(): Observable<any[]> {
    return new Observable((observer) => {
      const jugadoresRef = ref(this.db, 'players');
      onValue(jugadoresRef, (snapshot) => {
        const jugadores: any[] = [];
        snapshot.forEach((childSnapshot) => {
          jugadores.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });

        this.zone.run(() => {
          observer.next(jugadores);
        });
      });
    });
  }
  // Actualizar jugador
  updatePlayer(id: string, player: any) {
    const playerRef = ref(this.db, `players/${id}`);
    return update(playerRef, player);
  }

  // Borrar jugador
  deletePlayer(id: string) {
    const playerRef = ref(this.db, `players/${id}`);
    return remove(playerRef);
  }

  // Obtener un jugador por ID
  async getPlayerById(id: string) {
    const playerRef = ref(this.db);
    const snapshot = await get(child(playerRef, `players/${id}`));
    return snapshot.exists() ? snapshot.val() : null;
  }
}
