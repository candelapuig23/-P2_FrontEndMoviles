import { Component } from '@angular/core';
import { ListComponent } from './components/players/list/list.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from "./components/shared/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ListComponent, HeaderComponent, NavbarComponent, FooterComponent]
})
export class AppComponent {
  title = 'ATLAS BC - WeScript';
}
