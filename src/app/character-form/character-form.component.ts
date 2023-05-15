import { Component } from '@angular/core';

import { CharacterService } from '../services/character.service';

import { Character } from '../models/character';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css'],
})
export class CharacterFormComponent {
  heroes: Character[] = [];
  villians: Character[] = [];

  constructor(private characterService: CharacterService) {}

  types = ['hero', 'villian'];

  add(name: string, type: string): void {
    const model: Partial<Character> = {
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
}
