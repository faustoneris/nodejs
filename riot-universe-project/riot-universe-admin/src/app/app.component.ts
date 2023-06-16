import { Component, OnInit } from '@angular/core';
import { CharacterService } from './services/valorant-characters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './global.css']
})
export class AppComponent {

  constructor() {
    
  }
  title = 'valorant-admin';
}
