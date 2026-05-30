import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = {
  from: { opacity: 0, y: 50 },
  to: { opacity: 1, y: 0 },
  duration: 0.8,
};

export const staggerChildren = {
  stagger: 0.1,
};

export const parallaxConfig = {
  speed: 0.5,
  direction: 'y',
};

export function initScrollAnimations() {
  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
      ...fadeInUp,
    });
  });
}

export function animateValue(element, start, end, duration = 1000) {
  gsap.to(
    { value: start },
    {
      value: end,
      duration: duration / 1000,
      ease: 'power2.out',
      onUpdate: function () {
        element.textContent = Math.round(this.targets()[0].value).toLocaleString();
      },
    }
  );
}

export default { fadeInUp, staggerChildren, parallaxConfig, initScrollAnimations, animateValue };