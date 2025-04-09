import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MdbPopoverDirective, MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, MdbPopoverModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],

})
export class SearchComponent {
  searchQuery: string = '';
  filterByPosition: string = '';
  filterByHeight: string = '';
  filterByWeight: string = '';
  filterByAge: string = '';

  @Output() searchEvent = new EventEmitter<string>();
  @Output() filterEvent = new EventEmitter<any>();

  // Referencia al popover
  @ViewChild('popover', { static: false }) popover!: MdbPopoverDirective;

  // Emitir búsqueda al escribir
  onSearchChange(): void {
    this.searchEvent.emit(this.searchQuery);
  }

  // Emitir filtros al cambiar
  onFilterChange(): void {
    this.filterEvent.emit({
      position: this.filterByPosition,
      height: this.filterByHeight,
      weight: this.filterByWeight,
      age: this.filterByAge,
    });
  }

  // Restablecer filtros
  resetFilters(): void {
    this.filterByPosition = '';
    this.filterByHeight = '';
    this.filterByWeight = '';
    this.filterByAge = '';
    this.onFilterChange();
  }

  // Cerrar el popover
  cerrarPopover(): void {
    if (this.popover) {
      this.popover.hide();
    }
  }

  // Alternativo por compatibilidad
  closeFilters(): void {
    this.cerrarPopover();
  }
}
