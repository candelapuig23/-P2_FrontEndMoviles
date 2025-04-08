import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Player } from '../components/players/player/player.model'; // Asegúrate de que la ruta esté bien

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private playersRef: CollectionReference;

  constructor(private firestore: Firestore) {
    // Referencia a la colección "players"
    this.playersRef = collection(this.firestore, 'players');
  }

  /**
   * Obtiene todos los jugadores de Firebase como un Observable
   */
  getPlayers(): Observable<Player[]> {
    return collectionData(this.playersRef, { idField: 'id' }) as Observable<
      Player[]
    >;
  }

  /**
   * Añade un nuevo jugador a Firebase
   */
  addPlayer(player: Player): Promise<any> {
    return addDoc(this.playersRef, player);
  }

  /**
   * Elimina un jugador de Firebase por su ID
   */
  deletePlayer(id: string): Promise<void> {
    const docRef = doc(this.firestore, `players/${id}`);
    return deleteDoc(docRef);
  }

  /**
   * Actualiza los datos de un jugador en Firebase
   */
  updatePlayer(id: string, data: Partial<Player>): Promise<void> {
    const docRef = doc(this.firestore, `players/${id}`);
    return updateDoc(docRef, data);
  }
}
