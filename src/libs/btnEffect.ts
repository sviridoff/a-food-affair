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
  };

export const clientWiggleEffect = (
  elSelector: string,
) => {
  const timeline = gsap.timeline();

  timeline
    .to(
      elSelector,
      .1,
      {
        rotation: -10,
        ease: 'Quad.easeInOut'
      })
    .to(
      elSelector,
      .1,
      {
        rotation: 10,
        repeat: 3,
        yoyo: true,
        ease: 'Quad.easeInOut'
      }
    )
    .to(
      elSelector,
      .15,
      {
        rotation: 0,
      }
    )
};

export const btnEffect = (onComplete: () => void) =>
  (event: SyntheticEvent) => {
    gsap.killTweensOf(event.currentTarget);
    gsap.to(event.currentTarget, 0, { y: 0, rotation: 0 });
    gsap.to(
      event.currentTarget,
      0.1,
      {
        y: '0.5rem',
        yoyo: true,
        repeat: 1,
        onComplete,
      });
  }

export const tableHideEffect = (
  elSelector: string,
  onComplete: () => void,
) =>
  gsap.to(
    elSelector,
    0.2,
    {
      y: '-8rem',
      opacity: 0,
      onComplete,
      delay: 1,
      ease: 'Quad.easeInOut',
    });

export const tableShowEffect = (
  elSelector: string,
) =>
  gsap.fromTo(
    elSelector,
    0.2,
    {
      y: '-8rem',
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      ease: 'Quad.easeInOut',
    });
