import { Component } from '@angular/core';

import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-fight-club',
  templateUrl: './fight-club.component.html',
  styleUrls: ['./fight-club.component.css'],
})
export class FightClubComponent {
  heroes: Character[] = [];
  villains: Character[] = [];
  selectedHero: Character | undefined;
  selectedVillain: Character | undefined;
  draw = false;
  winner: Character | undefined;
  loser: Character | undefined;

  reset() {
    this.selectedHero = undefined;
    this.selectedVillain = undefined;
    this.draw = false;
    this.winner = undefined;
  }

  constructor(
    private characterService: CharacterService,
  ) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  selectCharacter(character: Character) {
    if (character.type === 'hero') {
      this.selectedHero = character;
    } else {
      this.selectedVillain = character;
    }
  }

  choosePower() {
    let min = Math.ceil(0);
    let max = Math.floor(4);
    return Math.floor(Math.random() * (max - min) + min);
  }

  fight() {
    const heroPower = this.choosePower();
    const villainPower = this.choosePower();

    if (heroPower === villainPower) {
      this.draw = true;
      this.selectedHero = undefined;
      this.selectedVillain = undefined;
    } else if (heroPower === 3 || villainPower === 3) {
      if (heroPower === 3) {
        this.selectedHero!.strength++;
        this.selectedVillain!.strength--;
        this.winner = this.selectedHero;
        this.loser = this.selectedVillain;
        this.save();
      } else if (villainPower === 3) {
        this.selectedVillain!.strength++;
        this.selectedHero!.strength--;
        this.winner = this.selectedVillain;
        this.loser = this.selectedHero;
        this.save();
      }
    } else if ((heroPower + 1) % 3 == villainPower) {
      this.selectedVillain!.strength++;
      this.selectedHero!.strength--;
      this.winner = this.selectedVillain;
      this.loser = this.selectedHero;
      this.save();
    } else {
      this.selectedHero!.strength++;
      this.selectedVillain!.strength--;
      this.winner = this.selectedHero;
      this.loser = this.selectedVillain;
      this.save();
    }
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

  delete(character: Character): void {
    this.heroes = this.heroes.filter((char) => char !== character);
    this.villains = this.villains.filter((char) => char !== character);
    this.characterService.deleteCharacter(character.id).subscribe();
  }

  save(): void {
    if (this.loser && this.loser.strength <= 0) {
      this.delete(this.loser);
    }
    if (this.selectedHero && this.selectedHero.strength > 0) {
      this.characterService.updateCharacter(this.selectedHero).subscribe();
    }
    if (this.selectedVillain && this.selectedVillain.strength > 0) {
      this.characterService.updateCharacter(this.selectedVillain).subscribe();
    }
  }
}
