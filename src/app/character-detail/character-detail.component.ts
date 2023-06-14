import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent {
  @Input() character?: Character;

  @Input() nemeses: Character[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCharacter();
    this.getNemeses();
  }

  getCharacter(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.characterService
      .getCharacter(id)
      .subscribe((character) => (this.character = character));
  }

  getNemeses(): void {
    this.characterService.getCharacters().subscribe((characters) => {
      this.nemeses = characters.filter(
        (character) => character.type === 'villain'
      );
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.character) {
      this.characterService
        .updateCharacter(this.character)
        .subscribe(() => this.goBack());
    }
  }
}
