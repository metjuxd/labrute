import {
  Animation, BruteWithBodyColors,
} from '@labrute/core';
import { Resvg } from '@resvg/resvg-js';
import SpriteSmith from 'spritesmith';
import Vynil from 'vinyl';
import getFrame, { FRAMES } from '../animations/getFrame';

const createSpritesheet = async (brute: BruteWithBodyColors) => {
  const model = brute.gender;

  // Get every model animation
  const frames: Vynil.BufferFile[] = [];
  const animations = Object.keys(FRAMES[model]) as Animation[];
  for (let i = 0; i < animations.length; i += 1) {
    const animation = animations[i];

    // Get every animation frame
    for (let j = 0; j < FRAMES[model][animation].length; j += 1) {
      // Get frame getter
      const frameGetter = getFrame(animation, model, j);

      if (!frameGetter) {
        throw new Error(`No frame for ${animation} ${model} ${j}`);
      }

      if (!brute.body || !brute.colors) {
        throw new Error('Brute body or colors not found');
      }

      // Convert SVG to PNG
      const resvg = new Resvg(frameGetter({
        body: brute.body,
        colors: brute.colors,
      }));
      const pngData = resvg.render();
      const png = pngData.asPng();

      // Create vinyl
      const vynil = new Vynil({
        contents: png,
        path: `${animation}_${model}_${j + 1}.png`,
      });

      frames.push(vynil);
    }
  }

  const spritesheet = await new Promise<SpriteSmith.SpriteResult>((resolve, reject) => {
    // Create spritesheet
    SpriteSmith.run({ src: frames }, (err, result) => {
      if (err) {
        reject(err);
        throw err;
      }

      resolve(result);
    });
  });

  return spritesheet;
};

export default createSpritesheet;