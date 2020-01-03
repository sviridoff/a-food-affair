import gsap from 'gsap';
import { SyntheticEvent } from 'react';

const btnEffect = (onComplete: () => void) => {
  return (event: SyntheticEvent) =>
    gsap.fromTo(
      event.target,
      0.1,
      { y: 0 },
      {
        y: '0.5rem',
        yoyo: true,
        repeat: 1,
        onComplete,
      });
};

export default btnEffect;
