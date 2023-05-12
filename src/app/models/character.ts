// export interface Character {
// 	id: number;
// 	name: string;
// 	strength: number;
// 	type: string; // hero or villian
// 	nemesis: Character | null;
// };

export class Character {

	constructor (
		public id: number,
		public name: string,
		public strength: number,
		public type: string, // hero or villian
		public nemesis?: Character | null,
	) {};

}

export type AddCharacter = Omit<Character, "id">;