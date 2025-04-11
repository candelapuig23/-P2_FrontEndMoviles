import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-media',
  standalone: true,
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  imports: [CommonModule, SafeUrlPipe],
})
export class MediaComponent implements AfterViewInit {
  @Input() videoSrc!: string;
  @Input() playerName!: string;

  modalInstance: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    import('bootstrap').then((bootstrap) => {
      const modalElement = this.el.nativeElement.querySelector('#videoModal');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
      } else {
        console.error('❌ No se encontró el modal en el DOM');
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
      this.stopVideo();
    }
  }

  stopVideo() {
    const iframe: HTMLIFrameElement | null =
    this.el.nativeElement.querySelector('iframe');
    if (iframe) {
      iframe.src = '';
    }
  }
}
