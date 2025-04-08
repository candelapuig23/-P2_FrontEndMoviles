import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import Swal from 'sweetalert2';
import { Player } from '../player/player.model';

@Component({
  selector: 'app-edit-player-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-player-form.component.html',
  styleUrls: ['./edit-player-form.component.css'],
})
export class EditPlayerFormComponent {
  @Input() player!: Player;
  @Output() playerUpdated = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  selectedImageName = '';
  selectedVideoName = '';

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
    'williams.png',
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
    'video12.mp4',
  ];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.selectedImageName = this.player.image.replace('assets/img/', '');
    this.selectedVideoName = this.player.videoFile.replace('assets/media/', '');
  }

  cancelar() {
    this.cancelEdit.emit();
  }

  actualizarJugador() {
    const imageRegex = /\.(png|jpg|jpeg)$/i;
    const videoRegex = /\.mp4$/i;

    if (
      !imageRegex.test(this.selectedImageName) ||
      !videoRegex.test(this.selectedVideoName)
    ) {
      Swal.fire(
        'Error',
        'Los archivos deben tener extensiones válidas (.png, .jpg, .mp4)',
        'warning'
      );
      return;
    }

    const updatedData = {
      ...this.player,
      image: `assets/img/${this.selectedImageName}`,
      videoFile: this.selectedVideoName,
    };

    if (!this.player.id) {
      console.error('El jugador no tiene ID');
      return;
    }
    this.firebaseService
      .updatePlayer(this.player.id, updatedData)

      .then(() => {
        Swal.fire('✅ Éxito', 'Jugador actualizado correctamente', 'success');
        this.playerUpdated.emit();
        this.cancelar();
      })
      .catch((err) => {
        console.error('❌ Error al actualizar jugador:', err);
        Swal.fire('Error', 'No se pudo actualizar el jugador', 'error');
      });
  }
}