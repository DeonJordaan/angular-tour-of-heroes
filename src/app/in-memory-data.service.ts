import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Character } from './models/character';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const characters = [
      { id: 11, name: 'Windstorm', strength: 3, type: 'hero', superpower: 'Aerokinesis' },
      { id: 12, name: 'Dr. Nice', strength: 3, type: 'hero', superpower: 'Being nice' },
      { id: 13, name: 'Bombasto', strength: 3, type: 'hero', superpower: 'Explosions & shockwaves' },
      { id: 14, name: 'Celeritas', strength: 3, type: 'hero', superpower: 'Speed & agility' },
      { id: 15, name: 'Magneta', strength: 3, type: 'hero', superpower: 'Magnetism' },
      { id: 16, name: 'RubberMan', strength: 3, type: 'hero', superpower: 'Elasticity' },
      { id: 17, name: 'Dynama', strength: 3, type: 'hero', superpower: 'Electrical energy' },
      { id: 18, name: 'Dr. IQ', strength: 3, type: 'hero', superpower: 'Genius' },
      { id: 19, name: 'Magma', strength: 3, type: 'hero', superpower: 'Lava' },
      { id: 20, name: 'Tornado', strength: 3, type: 'hero', superpower: 'Aerokinesis' },
      { id: 21, name: 'Calculator', strength: 3, type: 'villain', superpower: 'Math' },
      { id: 22, name: 'Mister Fear', strength: 3, type: 'villain', superpower: 'Inducing fear' },
      { id: 23, name: 'Chameleon', strength: 3, type: 'villain', superpower: 'Shape-shifting' },
      { id: 24, name: 'Tattooed Man', strength: 3, type: 'villain', superpower: 'Living tattoos' },
      { id: 25, name: 'Shocker', strength: 3, type: 'villain', superpower: 'Shockwaves' },
      { id: 26, name: 'Thinker', strength: 3, type: 'villain', superpower: 'Advanced intellect' },
      { id: 27, name: 'Mad Hatter', strength: 3, type: 'villain', superpower: 'Mind-control' },
      { id: 28, name: 'Trickster', strength: 3, type: 'villain', superpower: 'Deception' },
      { id: 29, name: 'Wizard', strength: 3, type: 'villain', superpower: 'Genius' },
      { id: 30, name: 'Gentleman Ghost', strength: 3, type: 'villain', superpower: 'Invisible' },
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
