import { Gender, BodyColors } from '@eternaltwin/labrute-core/types';
import React from 'react';

interface LeftHandProps {
  id: number;
  gender: Gender;
  colors: BodyColors;
  type: number;
}

const LeftHand = ({ id, gender, colors, type }: LeftHandProps) => {
  if (gender === 'male') {
    switch (type) {
      case 1:
        return (
          <>
            <use height="26.45" transform="matrix(0.912, 0.4071, -0.4071, 0.912, 47.8817, 117.6663)" width="23.2" xlinkHref={`#${id}-leftHand`} />
            <defs>
              <g id={`${id}-leftHand`} transform="matrix(1.0, 0.0, 0.0, 1.0, 14.9, 4.35)">
                <use height="26.45" transform="matrix(1.0, 0.0, 0.0, 1.0, -14.9, -4.35)" width="23.2" xlinkHref={`#${id}-leftHand-sprite87`} />
              </g>
              <g id={`${id}-leftHand-sprite87`} transform="matrix(1.0, 0.0, 0.0, 1.0, 14.15, 7.5)">
                <use height="22.7" transform="matrix(1.0, 0.0, 0.0, 1.0, -13.6, -3.75)" width="21.65" xlinkHref={`#${id}-leftHand-sprite88`} />
                <use height="26.45" transform="matrix(1.0, 0.0, 0.0, 1.0, -14.15, -7.5)" width="23.2" xlinkHref={`#${id}-leftHand-sprite89`} />
              </g>
              <g id={`${id}-leftHand-sprite88`} transform="matrix(1.0, 0.0, 0.0, 1.0, 13.6, 3.75)">
                <use height="22.7" transform="matrix(1.0, 0.0, 0.0, 1.0, -13.6, -3.75)" width="21.65" xlinkHref={`#${id}-leftHand-shape23`} />
              </g>
              <g id={`${id}-leftHand-shape23`} transform="matrix(1.0, 0.0, 0.0, 1.0, 13.6, 3.75)">
                <path d="M-10.75 15.3 L-10.75 14.95 Q-10.75 14.45 -10.4 14.1 -10.25 13.45 -9.9 13.1 L-9.6 12.0 Q-9.1 9.95 -9.75 7.65 -11.1 9.15 -10.9 10.65 L-11.55 10.65 -13.55 10.65 Q-13.75 7.2 -12.75 4.2 L-11.7 1.35 -9.9 -0.45 -8.6 -1.5 -7.8 -2.25 -7.0 -2.8 -5.15 -3.5 -4.8 -3.75 0.85 -3.6 1.25 0.05 Q1.6 6.15 0.65 12.3 0.35 12.65 0.35 12.95 L-1.45 14.6 -3.3 14.1 Q-5.8 13.1 -6.45 15.45 L-10.75 15.3" fill={colors.skin.color} fillRule="evenodd" stroke="none" />
                <path d="M6.5 -3.15 L6.7 -2.35 6.8 -1.8 Q8.8 6.0 7.65 11.3 L4.35 14.3 Q2.5 15.8 0.65 15.8 L0.2 15.6 Q-0.15 15.6 -0.3 15.95 L-2.5 17.6 -4.95 17.75 -7.6 18.95 Q-8.95 18.25 -9.9 17.1 L-10.05 16.95 Q-10.75 16.1 -10.75 15.3 L-6.45 15.45 Q-5.8 13.1 -3.3 14.1 L-1.45 14.6 0.35 12.95 Q0.35 12.65 0.65 12.3 1.6 6.15 1.25 0.05 L0.85 -3.6 6.5 -3.15 M-10.4 14.1 L-13.55 12.0 -13.55 11.6 -13.55 10.65 -11.55 10.65 -10.9 10.65 Q-11.1 9.15 -9.75 7.65 -9.1 9.95 -9.6 12.0 L-9.9 13.1 Q-10.25 13.45 -10.4 14.1 M-0.3 15.95 L-1.15 16.25 Q-2.8 17.1 -4.45 17.25 L-6.45 15.45 -4.45 17.25 Q-2.8 17.1 -1.15 16.25 L-0.3 15.95 M-4.45 17.25 L-4.95 17.75 -4.45 17.25" fill={colors.skin.shade} fillRule="evenodd" stroke="none" />
                <path d="M6.5 -3.15 L6.7 -2.35 6.8 -1.8 Q8.8 6.0 7.65 11.3 L4.35 14.3 Q2.5 15.8 0.65 15.8 L0.2 15.6 Q-0.15 15.6 -0.3 15.95 L-2.5 17.6 -4.95 17.75 -7.6 18.95 Q-8.95 18.25 -9.9 17.1 L-10.05 16.95 Q-10.75 16.1 -10.75 15.3 L-10.75 14.95 Q-10.75 14.45 -10.4 14.1 L-13.55 12.0 -13.55 11.6 -13.55 10.65 Q-13.75 7.2 -12.75 4.2 L-11.7 1.35 -9.9 -0.45 -8.6 -1.5 -7.8 -2.25 -7.0 -2.8 M-6.45 15.45 L-4.45 17.25 Q-2.8 17.1 -1.15 16.25 L-0.3 15.95 M-9.75 7.65 Q-9.1 9.95 -9.6 12.0 L-9.9 13.1 Q-10.25 13.45 -10.4 14.1 M-4.95 17.75 L-4.45 17.25" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3019608" strokeWidth="0.05" />
              </g>
            </defs>
          </>
        );
      default:
        return null;
    }
  }

  switch (type) {
    case 1:
      return (
        <>
          <use height="22.75" transform="matrix(0.9834, -0.0863, 0.0863, 0.9834, 22.0203, 106.4943)" width="24.65" xlinkHref={`#${id}-leftHand`} />
          <defs>
            <g id={`${id}-leftHand`} transform="matrix(1.0, 0.0, 0.0, 1.0, 21.25, 9.65)">
              <use height="15.85" transform="matrix(0.9083, 0.1732, -0.2258, 1.1839, -17.6497, -9.6619)" width="23.15" xlinkHref={`#${id}-leftHand-sprite87`} />
              <use height="18.25" transform="matrix(1.0, 0.0, 0.0, 1.0, -12.1, -7.8)" width="13.85" xlinkHref={`#${id}-leftHand-sprite88`} />
            </g>
            <g id={`${id}-leftHand-sprite87`} transform="matrix(1.0, 0.0, 0.0, 1.0, 11.55, 5.5)">
              <use height="15.85" transform="matrix(1.0, 0.0, 0.0, 1.0, -11.55, -5.5)" width="23.15" xlinkHref={`#${id}-leftHand-shape27`} />
            </g>
            <g id={`${id}-leftHand-shape27`} transform="matrix(1.0, 0.0, 0.0, 1.0, 11.55, 5.5)">
              <path d="M6.35 -3.2 L6.5 -3.15 6.55 -3.25 6.6 -3.25 6.6 -3.3 6.85 -3.25 7.45 -3.1 8.25 -2.85 8.35 -2.75 8.75 -2.45 9.0 -2.35 9.35 -2.2 9.4 -2.15 9.6 -1.95 9.8 -1.75 9.85 -1.75 11.3 0.95 Q11.8 2.75 11.4 4.4 L8.45 5.2 Q5.2 5.8 2.25 4.65 L1.2 4.2 -0.45 3.8 -0.75 3.75 0.0 3.15 Q1.05 2.6 0.15 1.9 L-0.1 1.9 -0.85 2.7 -2.4 2.95 -3.3 3.05 -5.75 3.4 -7.9 3.55 -5.65 2.45 -3.85 1.7 -2.15 0.8 -1.9 0.7 -1.2 0.4 -0.9 0.1 -0.7 -0.05 -0.7 -0.15 -0.7 -0.3 -0.85 -0.5 -2.65 -0.2 -4.45 0.2 -6.3 0.7 -8.2 1.2 -10.2 1.7 -11.4 1.9 -11.55 1.45 -11.5 0.95 -11.3 0.65 -11.3 0.6 Q-10.15 -0.15 -8.85 -0.6 L-5.2 -1.7 -0.75 -2.1 -0.4 -2.15 -0.3 -2.2 0.1 -2.25 0.5 -2.75 0.75 -3.3 0.6 -3.4 -1.25 -3.5 -2.55 -3.8 -3.55 -3.85 -4.55 -3.9 -5.55 -3.8 -6.65 -3.75 -7.65 -3.55 -8.7 -3.3 -9.7 -2.95 -10.8 -2.55 -10.65 -3.35 -9.85 -4.4 -9.3 -4.75 -7.75 -5.5 1.75 -5.15 1.75 -5.1 2.05 -5.0 2.85 -4.9 2.9 -4.9 4.4 -3.95 Q5.4 -3.5 6.35 -3.2 M9.0 -2.35 L8.65 -2.45 6.5 -3.15 8.65 -2.45 9.0 -2.35 M-2.55 7.15 Q-3.2 8.1 -4.2 8.8 L-5.15 9.2 -4.65 7.85 -3.75 6.6 -2.3 6.7 -2.55 7.15" fill={colors.skin.color} fillRule="evenodd" stroke="none" />
              <path d="M11.4 4.4 L11.35 4.65 10.3 6.75 10.15 7.0 9.75 7.4 9.35 7.75 7.75 8.35 7.1 8.6 4.4 8.8 Q2.5 8.15 0.95 7.4 L-0.2 6.8 -1.65 7.6 -2.35 8.45 -3.1 9.2 Q-3.8 9.75 -4.55 10.15 L-5.2 10.35 -6.15 9.65 -6.25 9.35 -6.4 9.25 -4.6 6.25 -3.85 5.1 -3.9 5.1 -4.65 5.35 -5.15 5.5 -6.35 5.65 -7.15 5.65 -8.8 5.2 Q-9.75 4.8 -9.9 4.2 L-9.6 2.9 -10.6 2.65 -11.4 1.9 -10.2 1.7 -8.2 1.2 -6.3 0.7 -4.45 0.2 -2.65 -0.2 -0.85 -0.5 -0.7 -0.3 -0.7 -0.15 -0.7 -0.05 -0.9 0.1 -1.2 0.4 -1.9 0.7 -2.15 0.8 -3.85 1.7 -5.65 2.45 -7.9 3.55 -5.75 3.4 -3.3 3.05 -2.4 2.95 -0.85 2.7 -0.1 1.9 0.15 1.9 Q1.05 2.6 0.0 3.15 L-0.75 3.75 -0.45 3.8 1.2 4.2 2.25 4.65 Q5.2 5.8 8.45 5.2 L11.4 4.4 M-5.2 -1.7 L-7.8 -1.5 -10.6 -1.65 -10.75 -1.9 -10.9 -2.45 -10.8 -2.55 -9.7 -2.95 -8.7 -3.3 -7.65 -3.55 -6.65 -3.75 -5.55 -3.8 -4.55 -3.9 -3.55 -3.85 -2.55 -3.8 -1.25 -3.5 0.6 -3.4 0.75 -3.3 0.5 -2.75 0.1 -2.25 -0.3 -2.2 -0.4 -2.15 -0.75 -2.1 -5.2 -1.7 M-9.6 2.9 L-2.15 0.8 -9.6 2.9 M-0.3 -2.2 L-0.75 -2.1 -0.3 -2.2 M-3.15 4.7 L-3.85 5.1 -3.15 4.7 M-2.55 7.15 L-2.3 6.7 -3.75 6.6 -4.65 7.85 -5.15 9.2 -4.2 8.8 Q-3.2 8.1 -2.55 7.15" fill={colors.skin.shade} fillRule="evenodd" stroke="none" />
              <path d="M2.9 -4.9 L4.4 -4.0 6.35 -3.2 6.5 -3.15 8.65 -2.45 9.0 -2.35 9.35 -2.2 9.4 -2.15 M9.6 -1.95 L9.8 -1.75 M9.35 7.75 L7.75 8.35 7.1 8.6 4.4 8.8 Q2.5 8.15 0.95 7.4 L-0.2 6.8 -1.65 7.6 -2.35 8.45 -3.1 9.2 Q-3.8 9.75 -4.55 10.15 L-5.2 10.35 -6.15 9.65 -6.25 9.35 -6.4 9.25 -4.6 6.25 -3.85 5.1 -3.9 5.1 -4.65 5.35 -5.15 5.5 -6.35 5.65 -7.15 5.65 -8.8 5.2 Q-9.75 4.8 -9.9 4.2 L-9.6 2.9 -10.6 2.65 -11.4 1.9 -11.55 1.45 -11.5 0.95 -11.3 0.65 -11.3 0.6 Q-10.15 -0.15 -8.85 -0.6 L-5.2 -1.7 -7.8 -1.5 -10.6 -1.65 -10.75 -1.9 -10.9 -2.45 -10.65 -3.35 -9.85 -4.4 -9.3 -4.75 -7.75 -5.5 1.75 -5.15 M1.75 -5.1 L2.05 -5.0 2.85 -4.9 2.9 -4.9 M-2.15 0.8 L-9.6 2.9 M-0.75 -2.1 L-0.3 -2.2 0.1 -2.25 M-5.2 -1.7 L-0.75 -2.1 M-2.15 0.8 L-1.9 0.7 -1.2 0.4 M-3.85 5.1 L-3.15 4.7" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3019608" strokeWidth="0.05" />
            </g>
          </defs>
        </>
      );
    default:
      return null;
  }
};

export default LeftHand;