import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-player-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-player-form.component.html',
  styleUrls: ['./add-player-form.component.css'],
})
export class AddPlayerFormComponent {
  @Output() playerAdded = new EventEmitter<void>();
  @Output() formCancel = new EventEmitter<void>();

  player = {
    name: '',
    position: '',
    number: 0,
    height: '',
    weight: '',
    age: 0,
    ppg: 0,
    rpg: 0,
    apg: 0,
    image: '',
    videoFile: '',
  };

  // Arxius disponibles a assets/img i assets/media
  availableImages: string[] = [
    'lebron.png',
    'tatum.png',
    'terry.png',
    'davis.png',
    'brown.png',
    'bruzelis.png',
    'doncic.png',
    'embiid.png',
    'giannis.png',
    'hauser.png',
    'klay.png',
    'miller.png',
    'moody.png',
    'norris.png',
    'simmons.png',
    'tatum.png',
    'wemby.png',
    'williams.png'
  ];

  availableVideos: string[] = [
    'terry.mp4',
    'video1.mp4',
    'buzelis.mp4',
    'hauser.mp4',
    'miler.mp4',
    'williams.mp4',
    'norris.mp4',
    'video1.mp4',
    'video2.mp4',
    'video3.mp4',
    'video4.mp4',
    'video5.mp4',
    'video6.mp4',
    'video7.mp4',
    'video8.mp4',
    'video9.mp4',
    'video10.mp4',
    'video11.mp4',
    'video12.mp4'
  ];

  selectedImageName: string = '';
  selectedVideoName: string = '';

  constructor(private firebaseService: FirebaseService) {}

  cancelar() {
    this.formCancel.emit();
  }

  guardarJugador(): void {
    const imageRegex = /\.(png|jpg|jpeg)$/i;
    const videoRegex = /\.mp4$/i;

    // Validació d’extensions
    if (
      !imageRegex.test(this.selectedImageName) ||
      !videoRegex.test(this.selectedVideoName)
    ) {
      Swal.fire(
        'Error',
        'Els noms dels fitxers han de tenir extensió (.png, .jpg, .mp4)',
        'warning'
      );
      return;
    }

    // Construïm les rutes relatives
    this.player.image = `assets/img/${this.selectedImageName}`;
    this.player.videoFile = this.selectedVideoName;

    // Guardem a Firestore
    this.firebaseService
      .addPlayer(this.player)
      .then(() => {
        Swal.fire('✅ Èxit', 'Jugador afegit correctament', 'success');
        this.playerAdded.emit();
        this.cancelar();
      })
      .catch((err) => {
        console.error('❌ Error al afegir jugador:', err);
        Swal.fire('Error', 'No s’ha pogut afegir el jugador', 'error');
      });
  }
}
