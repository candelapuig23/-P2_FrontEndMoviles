import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPlayerFormComponent } from './edit-player-form.component';
import { Player } from '../player/player.model';

describe('EditPlayerFormComponent', () => {
  let component: EditPlayerFormComponent;
  let fixture: ComponentFixture<EditPlayerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlayerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlayerFormComponent);
    component = fixture.componentInstance;

    // Añadimos un jugador falso para evitar errores de entrada
    component.player = {
      id: '123',
      name: 'Jugador Test',
      position: 'Base',
      number: 7,
      height: '1.90',
      weight: '80kg',
      age: 25,
      ppg: 10,
      rpg: 5,
      apg: 7,
      image: 'assets/img/tatum.png',
      videoFile: 'assets/media/video1.mp4'
    } as Player;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
