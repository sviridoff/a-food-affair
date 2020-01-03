import gsap from 'gsap';
import { SyntheticEvent } from 'react';

export const wiggleEffect = (onComplete: () => void) =>
  (event: SyntheticEvent) => {
    const timeline = gsap.timeline();

    timeline
      .to(
        event.currentTarget,
        .1,
        {
          rotation: -10,
          ease: 'Quad.easeInOut'
        })
      .to(
        event.currentTarget,
        .1,
        {
          rotation: 10,
          repeat: 3,
          yoyo: true,
          ease: 'Quad.easeInOut'
        }
      )
      .to(
        event.currentTarget,
        .15,
        {
          rotation: 0,
          onComplete,
        }
      )
  }

export const btnEffect = (onComplete: () => void) =>
  (event: SyntheticEvent) =>
    gsap.to(
      event.currentTarget,
      0.1,
      {
        y: '0.5rem',
        yoyo: true,
        repeat: 1,
        onComplete,
      });

