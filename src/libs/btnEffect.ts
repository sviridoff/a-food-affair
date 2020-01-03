import { TweenMax } from "gsap";

const btnEffect = (
  onComplete: () => void,
  target: any,
) => {
  TweenMax.fromTo(
    target,
    0.1,
    { y: 0 },
    {
      y: 4,
      yoyo: true,
      repeat: 1,
      onComplete,
    });
};

export default btnEffect;
