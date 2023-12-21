import { SkillExpireStep } from '@labrute/core';
import { GlowFilter } from '@pixi/filter-glow';
import { Application } from 'pixi.js';

import { Easing, Tweener } from 'pixi-tweener';
import { getRandomPosition } from './fightPositions';
import findFighter, { AnimationFighter } from './findFighter';

const skillExpire = async (
  app: Application,
  fighters: AnimationFighter[],
  step: SkillExpireStep,
  speed: React.MutableRefObject<number>,
) => {
  const brute = findFighter(fighters, step.brute);
  if (!brute) {
    throw new Error('Brute not found');
  }

  if (step.skill === 'fierceBrute') {
    // Remove Glow filter
    brute.animation.container.filters = brute.animation.container.filters?.filter(
      (filter) => !(filter instanceof GlowFilter),
    ) || [];
  }

  // Flash flood
  if (step.skill === 'flashFlood') {
    // Set brute animation to `arrive`
    brute.animation.once('arrive:start', () => {
      brute.animation.pause();
    });
    brute.animation.setAnimation('arrive');

    // Get positions
    const { x, y } = getRandomPosition(fighters, brute.animation.team);

    // Move brute back
    await Tweener.add({
      target: brute.animation.container,
      duration: 0.4 / speed.current,
      ease: Easing.easeInCubic
    }, { x, y });

    const animationEnded = brute.animation.waitForEvent('arrive:end');

    // Continue brute animation
    brute.animation.play();

    // Wait for animation to end before going further
    await animationEnded;

    // Set animation to `idle`
    brute.animation.setAnimation('idle');
  }

  // TODO: different visual for every skill expiration
};

export default skillExpire;