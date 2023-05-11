import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Character } from './models/character';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const characters = [
      { id: 11, name: 'Windstorm', strength: 10, type: 'hero' },
      { id: 12, name: 'Dr. Nice', strength: 9, type: 'hero' },
      { id: 13, name: 'Bombasto', strength: 10, type: 'hero' },
      { id: 14, name: 'Celeritas', strength: 10, type: 'hero' },
      { id: 15, name: 'Magneta', strength: 1, type: 'hero' },
      { id: 16, name: 'RubberMan', strength: 10, type: 'hero' },
      { id: 17, name: 'Dynama', strength: 10, type: 'hero' },
      { id: 18, name: 'Dr. IQ', strength: 10, type: 'hero' },
      { id: 19, name: 'Magma', strength: 10, type: 'hero' },
      { id: 20, name: 'Tornado', strength: 3, type: 'hero' },
      { id: 21, name: 'Bad Breathe', strength: 10, type: 'villian' },
      { id: 22, name: 'Algae', strength: 10, type: 'villian' },
      { id: 23, name: 'Crud', strength: 6, type: 'villian' },
      { id: 24, name: 'Mr MBA', strength: 10, type: 'villian' },
      { id: 25, name: 'NoTypeSafety', strength: 5, type: 'villian' },
      { id: 26, name: 'No Comments', strength: 10, type: 'villian' },
      { id: 27, name: 'WetWetWet', strength: 10, type: 'villian' },
      { id: 28, name: 'NoCode', strength: 10, type: 'villian' },
      { id: 29, name: 'PhpIsJustAScriptingLanguage', strength: 7, type: 'villian' },
      { id: 30, name: 'VIM', strength: 10, type: 'villian' },
    ];
    return {characters};
  }

  // Overrides the genId method to ensure that a character always has an id.
  // If the characters array is empty,
  // the method below returns the initial number (11).
  // if the characters array is not empty, the method below returns the highest
  // character id + 1.
  genId(characters: Character[]): number {
    return characters.length > 0 ? Math.max(...characters.map(characters => characters.id)) + 1 : 11;
  }
}