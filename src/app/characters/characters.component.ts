import { Component } from '@angular/core';
import { Character } from '../models/character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  heroes: Character[] = [];
  villians: Character[] = [];

  constructor(private characterService: CharacterService, private messageService: MessageService) { }
  
  type: string = 'hero';
  
  ngOnInit(): void {
    this.getCharacters();
  }


  getCharacters(): void {
    this.characterService.getCharacters()
    .subscribe(characters => {
      this.heroes = characters.filter(character => character.type === 'hero'),
      this.villians = characters.filter(character => character.type === 'villian')
    });
  }

  

  add(name: string): void {
    name = name.trim();
    if (!name) { return; };
    this.characterService.addCharacter({ name } as Character)
    .subscribe(character => {
      if (character.type === 'hero') {
        this.heroes.push(character);        
      } else {
        this.villians.push(character);
      }
    });
  };

  delete(character: Character): void {
    this.heroes = this.heroes.filter(char => char !== character);
    this.villians =  this.villians.filter(char => char !== character);
    this.characterService.deleteCharacter(character.id);
  }
}
