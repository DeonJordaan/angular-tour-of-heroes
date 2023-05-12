import { Component } from '@angular/core';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-fight-club',
  templateUrl: './fight-club.component.html',
  styleUrls: ['./fight-club.component.css']
})
export class FightClubComponent {

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

}
