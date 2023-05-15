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
  loser: Character | undefined;

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

  choosePower() {
    let min = Math.ceil(0);
    let max = Math.floor(4);
    return Math.floor(Math.random() * (max - min) + min);
  }

  fight() {
    const heroPower = this.choosePower();
    const villianPower = this.choosePower();

    if (heroPower === villianPower) {
      this.draw = true;
      this.selectedHero = undefined;
      this.selectedVillian = undefined;
    } else if (heroPower === 3 || villianPower === 3) {
      if (heroPower === 3) {
        this.selectedHero!.strength++;
        this.selectedVillian!.strength--;
        this.winner = this.selectedHero;
        this.loser = this.selectedVillian;
        this.save();
      } else if (villianPower === 3) {
        this.selectedVillian!.strength++;
        this.selectedHero!.strength--;
        this.winner = this.selectedVillian;
        this.loser = this.selectedHero;
        this.save();
      }
    } else if ((heroPower + 1) % 3 == villianPower) {
      this.selectedVillian!.strength++;
      this.selectedHero!.strength--;
      this.winner = this.selectedVillian;
      this.loser = this.selectedHero;
      this.save();
    } else {
      this.selectedHero!.strength++;
      this.selectedVillian!.strength--;
      this.winner = this.selectedHero;
      this.loser = this.selectedVillian;
      this.save();
    }

    // if ()
  }

  // fight() {
  //   setTimeout(this.fightResult, 3000);
  // }

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

  delete(character: Character): void {
    this.heroes = this.heroes.filter((char) => char !== character);
    this.villians = this.villians.filter((char) => char !== character);
    this.characterService.deleteCharacter(character.id).subscribe();
  }

  save(): void {
    if (this.loser && this.loser!.strength <= 0) {
      this.delete(this.loser);
    }
    if (this.selectedHero && this.selectedHero.strength > 0) {
      this.characterService.updateCharacter(this.selectedHero).subscribe();
    }
    if (this.selectedVillian && this.selectedVillian.strength > 0) {
      this.characterService.updateCharacter(this.selectedVillian).subscribe();
    }
  }
}
