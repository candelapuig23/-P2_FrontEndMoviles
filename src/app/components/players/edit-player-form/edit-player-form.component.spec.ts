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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
