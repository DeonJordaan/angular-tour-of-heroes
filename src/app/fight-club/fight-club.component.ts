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
  villains: Character[] = [];
  selectedHero: Character | undefined;
  selectedvillain: Character | undefined;
  draw = false;
  winner: Character | undefined;
  loser: Character | undefined;

  reset() {
    this.selectedHero = undefined;
    this.selectedvillain = undefined;
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
      this.selectedvillain = character;
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
      this.selectedvillain = undefined;
    } else if (heroPower === 3 || villainPower === 3) {
      if (heroPower === 3) {
        this.selectedHero!.strength++;
        this.selectedvillain!.strength--;
        this.winner = this.selectedHero;
        this.loser = this.selectedvillain;
        this.save();
      } else if (villainPower === 3) {
        this.selectedvillain!.strength++;
        this.selectedHero!.strength--;
        this.winner = this.selectedvillain;
        this.loser = this.selectedHero;
        this.save();
      }
    } else if ((heroPower + 1) % 3 == villainPower) {
      this.selectedvillain!.strength++;
      this.selectedHero!.strength--;
      this.winner = this.selectedvillain;
      this.loser = this.selectedHero;
      this.save();
    } else {
      this.selectedHero!.strength++;
      this.selectedvillain!.strength--;
      this.winner = this.selectedHero;
      this.loser = this.selectedvillain;
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
    if (this.loser && this.loser!.strength <= 0) {
      this.delete(this.loser);
    }
    if (this.selectedHero && this.selectedHero.strength > 0) {
      this.characterService.updateCharacter(this.selectedHero).subscribe();
    }
    if (this.selectedvillain && this.selectedvillain.strength > 0) {
      this.characterService.updateCharacter(this.selectedvillain).subscribe();
    }
  }
}
