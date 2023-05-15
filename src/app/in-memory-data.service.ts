import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Character } from './models/character';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const characters = [
      { id: 11, name: 'Windstorm', strength: 3, type: 'hero' },
      { id: 12, name: 'Dr. Nice', strength: 3, type: 'hero' },
      { id: 13, name: 'Bombasto', strength: 3, type: 'hero' },
      { id: 14, name: 'Celeritas', strength: 3, type: 'hero' },
      { id: 15, name: 'Magneta', strength: 3, type: 'hero' },
      { id: 16, name: 'RubberMan', strength: 3, type: 'hero' },
      { id: 17, name: 'Dynama', strength: 3, type: 'hero' },
      { id: 18, name: 'Dr. IQ', strength: 3, type: 'hero' },
      { id: 19, name: 'Magma', strength: 3, type: 'hero' },
      { id: 20, name: 'Tornado', strength: 3, type: 'hero' },
      { id: 21, name: 'Bad Breathe', strength: 3, type: 'villian' },
      { id: 22, name: 'Algae', strength: 3, type: 'villian' },
      { id: 23, name: 'Crud', strength: 3, type: 'villian' },
      { id: 24, name: 'Mr MBA', strength: 3, type: 'villian' },
      { id: 25, name: 'NoTypeSafety', strength: 3, type: 'villian' },
      { id: 26, name: 'No Comments', strength: 3, type: 'villian' },
      { id: 27, name: 'WetWetWet', strength: 3, type: 'villian' },
      { id: 28, name: 'NoCode', strength: 3, type: 'villian' },
      { id: 29, name: 'PHP', strength: 3, type: 'villian' },
      { id: 30, name: 'VIM', strength: 3, type: 'villian' },
    ];
    return { characters };
  }

  // Overrides the genId method to ensure that a character always has an id.
  // If the characters array is empty,
  // the method below returns the initial number (11).
  // if the characters array is not empty, the method below returns the highest
  // character id + 1.
  genId(characters: Character[]): number {
    return characters.length > 0
      ? Math.max(...characters.map((characters) => characters.id)) + 1
      : 11;
  }
}
