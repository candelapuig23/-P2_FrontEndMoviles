import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Este component gestiona el campo de búsqueda y emite eventos. Lo podremos reutilizar más adelante.
  Ejemplo: Búsqueda de entrenador, etc. Porqué la lógica del filtro de búsqueda de los jugadores está
  dentro del componente de list.
*/

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchQuery: string = '';
  isFiltersVisible: boolean = false;

  filterByPosition: string = '';
  filterByHeight: string = '';
  filterByWeight: string = '';
  filterByAge: string = '';
  filterByPPG: string = '';
  filterByRPG: string = '';
  filterByAPG: string = '';

  // Emisor de eventos
  @Output() searchEvent = new EventEmitter<string>();
  @Output() filterEvent = new EventEmitter<any>();

  onSearchChange() {
    this.searchEvent.emit(this.searchQuery);
  }

  onFilterChange() {
    this.filterEvent.emit({
      position: this.filterByPosition || '',
      height: this.filterByHeight || '',
      weight: this.filterByWeight || '',
      age: this.filterByAge || '',
      ppg: this.filterByPPG || '',
      rpg: this.filterByRPG || '',
      apg: this.filterByAPG || '',
    });
  }

  toggleFilters() {
    this.isFiltersVisible = !this.isFiltersVisible;
  }

  closeFilters() {
    this.isFiltersVisible = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.filter-container')) {
      this.closeFilters();
    }
  }
}
