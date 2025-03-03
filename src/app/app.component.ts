import { Component } from '@angular/core';
import { ListComponent } from './components/players/list/list.component'; // 👈 Importar el componente

@Component({
  selector: 'app-root',
  standalone: true, // 👈 Asegurar que AppComponent también sea standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ListComponent] // 👈 Importar el ListComponent
})
export class AppComponent {
  title = 'equipo-basket';
}
