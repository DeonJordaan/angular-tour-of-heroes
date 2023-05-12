import { Component } from '@angular/core';
import { AddCharacter, Character } from '../models/character';
import { CharacterService } from '../services/character.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent {
  heroes: Character[] = [];
  villians: Character[] = [];

  characterTypes = ['hero', 'villian'];

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters().subscribe((characters) => {
      (this.heroes = characters.filter(
        (character) => character.type === 'hero'
      )),
        (this.villians = characters.filter(
          (character) => character.type === 'villian'
        ));
    });
  }

  add(name: string, type: string): void {
    const model: AddCharacter = {
      name: name.trim(),
      type: type.trim(),
      strength: 10,
    };

    console.log(model);

    if (!name) {
      return;
    }
    this.characterService
      .addCharacter(model as Character)
      .subscribe((character) => {
        if (character.type === 'hero') {
          this.heroes.push(character);
        } else {
          this.villians.push(character);
        }
      });
  }

  delete(character: Character): void {
    this.heroes = this.heroes.filter((char) => char !== character);
    this.villians = this.villians.filter((char) => char !== character);
    this.characterService.deleteCharacter(character.id);
  }
}
