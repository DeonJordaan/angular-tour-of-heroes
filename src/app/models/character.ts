export interface Character {
  id: number;
  name: string;
  strength: number;
  type: string; // hero or villain
  nemesis: Character | null;
  superpower: string;
}