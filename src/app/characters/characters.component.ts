import { Component } from '@angular/core';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent {
  heroes: Character[] = [];
  villains: Character[] = [];

  characterTypes = ['hero', 'villain'];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters().subscribe((characters) => {
      (this.heroes = characters.filter(
        (character) => character.type === 'hero'
      )),
        (this.villains = characters.filter(
          (character) => character.type === 'villain'
        ));
    });
  }

  add(name: string, type: string): void {
    const model: Partial<Character> = {
      name: name.trim(),
      type: type.trim(),
      strength: 3,
    };

    if (!name) {
      return;
    }
    this.characterService
      .addCharacter(model as Character)
      .subscribe((character) => {
        if (character.type === 'hero') {
          this.heroes.push(character);
        } else {
          this.villains.push(character);
        }
      });
  }

  delete(character: Character): void {
    this.heroes = this.heroes.filter((char) => char !== character);
    this.villains = this.villains.filter((char) => char !== character);
    this.characterService.deleteCharacter(character.id).subscribe();
  }
}
