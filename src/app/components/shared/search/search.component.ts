import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


/* Este component gestiona el campo de búsqueda y emite eventos. Lo podremos reutilizar más adelante.
  Ejemplo: Búsqueda de entrenador, etc. Porqué la lógica del filtro de búsqueda de los jugadores está
  dentro del componente de list.
*/

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchTerm: string = '';

  @Output() searchEvent = new EventEmitter<string>(); // Emisor de eventos

  onSearchChange() {
    this.searchEvent.emit(this.searchTerm); // Envía el valor a ListComponent
  }
}

