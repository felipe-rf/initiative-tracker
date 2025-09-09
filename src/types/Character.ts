/**
 * Represents a character in the initiative tracker.
 */
export interface Character {
  id: number;
  name: string;
  maxHp: number;
  currentHp: number;
  tempHp: number;
  ac: number;
  initiative: number;
  link?: string;
  dead: boolean;
  color: string;
}
