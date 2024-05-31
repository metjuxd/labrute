import { Fighter } from '@labrute/core';
import * as PIXI from 'pixi.js';
import FighterHolder from '../FighterHolder';

export interface AnimationFighter extends Omit<Fighter, 'shield'> {
  type: 'brute' | 'pet' | 'boss';
  hypnotised?: boolean;
  hpBar?: PIXI.Graphics;
  hpBarPhantom?: PIXI.Graphics;
  weaponsIllustrations: PIXI.Sprite[];
  animation: FighterHolder;
  bust: PIXI.Sprite | undefined;
}

const findFighter = (
  fighters: AnimationFighter[],
  stepFighter?: number,
) => (stepFighter ? fighters.find((f) => f.id === stepFighter) : undefined);

export default findFighter;