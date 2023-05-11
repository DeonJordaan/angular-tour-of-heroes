export interface Weapon {
	id: number;
	name: string;
}

export enum WeaponType {
	rock = 'ROCK',
	paper = 'PAPER',
	scissors = 'SCISSORS',
	superpower = 'SUPERPOWER',
}

export const WeaponSortOrder: Record<WeaponType, number> = {
	'ROCK' : 0,
	'PAPER' : 1,
	'SCISSORS' : 2, 
	'SUPERPOWER' : 3,
}