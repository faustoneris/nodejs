import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/valorant-characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit { 

constructor(private readonly characters: CharacterService) {}


charactersFrom: any = []; 

  async ngOnInit(): Promise<void> {
    const char = await this.characters.findCharacters(); 
    this.charactersFrom = char; 
  }
}
