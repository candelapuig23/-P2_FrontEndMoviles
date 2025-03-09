import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media',
  standalone: true,
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  imports: [CommonModule],
})
export class MediaComponent implements AfterViewInit {
  @Input() videoSrc!: string;
  modalInstance: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    import('bootstrap').then((bootstrap) => {
      const modalElement = this.el.nativeElement.querySelector('#videoModal');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        modalElement.addEventListener('hidden.bs.modal', () =>
          this.stopVideo()
        );
      }
    });
  }

  openModal() {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  private stopVideo() {
    const videoElement = this.el.nativeElement.querySelector('video');
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }
}
