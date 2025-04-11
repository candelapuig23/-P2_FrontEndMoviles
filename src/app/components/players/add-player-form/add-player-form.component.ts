import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { Player } from '../player/player.model';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-player-form',
  standalone: true,
  templateUrl: './add-player-form.component.html',
  styleUrls: ['./add-player-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AddPlayerFormComponent {
  @Output() playerAdded = new EventEmitter<void>();
  @Output() formCancel = new EventEmitter<void>();

  player: Player = {
    name: '',
    number: 0,
    position: '',
    image: '',
    height: '',
    weight: '',
    age: 0,
    ppg: 0,
    rpg: 0,
    apg: 0,
    videoFile: '',
  };

  imageFile!: File;
  videoFile!: File;

  constructor(private firebaseService: FirebaseService) {}

  async onSubmit() {
    try {
      const imageUrl = this.imageFile
        ? await this.uploadToFirebase(this.imageFile, 'images')
        : '';
      const videoUrl = this.videoFile
        ? await this.uploadToFirebase(this.videoFile, 'videos')
        : '';

      this.player.image = imageUrl;
      this.player.videoFile = videoUrl;

      await this.firebaseService.addPlayer(this.player);
      this.playerAdded.emit();
    } catch (error) {
      console.error('Error al añadir jugador:', error);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.imageFile = file;
  }

  onVideoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.videoFile = file;
  }

    private async uploadToFirebase(file: File, folder: 'images' | 'videos'): Promise<string> {
      const storage = getStorage();
      const uniqueName = `${uuidv4()}-${file.name}`;
      const fileRef = ref(storage, `${folder}/${uniqueName}`);

      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
    }

}
