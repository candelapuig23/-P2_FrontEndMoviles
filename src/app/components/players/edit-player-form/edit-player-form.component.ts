import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-edit-player-form',
  standalone: true,
  templateUrl: './edit-player-form.component.html',
  styleUrls: ['./edit-player-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EditPlayerFormComponent {
  @Input() player!: Player;
  @Output() playerUpdated = new EventEmitter<void>();
  @Output() formCancel = new EventEmitter<void>();

  imageFile!: File;
  videoFile!: File;

  constructor(private firebaseService: FirebaseService) {}

  async onSubmit() {
    try {
      const imageUrl = this.imageFile
        ? await this.uploadToFirebase(this.imageFile, 'images')
        : this.player.image;
      const videoUrl = this.videoFile
        ? await this.uploadToFirebase(this.videoFile, 'videos')
        : this.player.videoFile;

      this.player.image = imageUrl;
      this.player.videoFile = videoUrl;

      if (this.player.id) {
        await this.firebaseService.updatePlayer(this.player.id, this.player);
        this.playerUpdated.emit();
      }
    } catch (error) {
      console.error('Error al editar jugador:', error);
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

  private async uploadToFirebase(
    file: File,
    folder: 'images' | 'videos'
  ): Promise<string> {
    const storage = getStorage();
    const uniqueName = `${uuidv4()}-${file.name}`;
    const fileRef = ref(storage, `${folder}/${uniqueName}`);

    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  }
}
