import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media',
  standalone: true,
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  imports: [CommonModule]
})
export class MediaComponent implements AfterViewInit {
  @Input() videoSrc!: string;
  modalInstance: any;

  constructor(private el: ElementRef) {}


  ngAfterViewInit() {
    import('bootstrap').then((bootstrap) => {
      console.log('🟢 Bootstrap cargado en MediaComponent');
      const modalElement = this.el.nativeElement.querySelector('#videoModal');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        console.log('✅ Modal inicializado correctamente');
      } else {
        console.error('❌ Error: No se encontró el modal en el DOM');
      }
    });
  }

  openModal() {
    if (this.modalInstance) {
      console.log('🟢 Abriendo modal...');
      this.modalInstance.show();
    } else {
      console.error('❌ Error: El modal no se inicializó correctamente.');
    }
  }

  closeModal() {
    if (this.modalInstance) {
      console.log('🟢 Cerrando modal...');
      this.modalInstance.hide();
    }
  }
}
