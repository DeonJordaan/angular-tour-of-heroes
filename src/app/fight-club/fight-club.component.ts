import { Component } from '@angular/core';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-fight-club',
  templateUrl: './fight-club.component.html',
  styleUrls: ['./fight-club.component.css'],
})
export class FightClubComponent {
  heroes: Character[] = [];
  villians: Character[] = [];
  selectedHero: Character | undefined;
  selectedVillian: Character | undefined;
  draw = false;
  winner: Character | undefined;

  reset() {
    this.selectedHero = undefined;
    this.selectedVillian = undefined;
    this.draw = false;
    this.winner = undefined;
  }

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  selectCharacter(character: Character) {
    if (character.type === 'hero') {
      this.selectedHero = character;
    } else {
      this.selectedVillian = character;
    }
  }

  fight() {
    const heroPower = this.choosePower();
    const villianPower = this.choosePower();
    console.log(heroPower);
    console.log(villianPower);

    if (heroPower === villianPower) {
      this.draw = true;
      this.selectedHero = undefined;
      this.selectedVillian = undefined;
    } else if (heroPower === 3 && heroPower > villianPower) {
      this.selectedHero!.strength++;
      this.selectedVillian!.strength--;
      this.winner = this.selectedHero;
    } else if (villianPower === 3 && villianPower > heroPower) {
      this.selectedVillian!.strength++;
      this.selectedHero!.strength--;
      this.winner = this.selectedVillian;
    } else if ((heroPower + 1) % 3 == villianPower) {
      this.selectedVillian!.strength++;
      this.selectedHero!.strength--;
      this.winner = this.selectedVillian;
    } else {
      this.selectedHero!.strength++;
      this.selectedVillian!.strength--;
      this.winner = this.selectedHero;
    }

    console.log(this.winner);
  }

  choosePower() {
    let min = Math.ceil(0);
    let max = Math.floor(4);
    return Math.floor(Math.random() * (max - min) + min);
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
}
