document.addEventListener('DOMContentLoaded', function () {
  const maskOptions = {
    mask: '+7 (000) 000-00-00',
    onFocus: function () {
      if (this.value === '') this.value = '+7 ';
    },
    onBlur: function () {
      if (this.value === '+7 ') this.value = '';
    },
  };

  const maskedElements = document.querySelectorAll('.masked');
  maskedElements.forEach((item) => new IMask(item, maskOptions));

  const header = document.querySelector('.header');
  const headerBurgerButton = header.querySelectorAll('.header-burger__button');
  const headerBurgerPopup = header.querySelector('.header-burger__popup');
  headerBurgerButton.forEach((button) => {
    button.addEventListener('click', () => {
      headerBurgerPopup.classList.toggle('show');
      header.classList.toggle('show');
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.hero', {
    yPercent: 50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to('.full-image', {
    scale: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.full-image',
      start: 'top 80%',
      end: 'bottom: 20%',
      scrub: true,
      onUpdate: (self) => {
        const image = document.querySelector('.full-image');
        self.progress >= 1 ? image.classList.add('change') : image.classList.remove('change');
      },
    },
  });

  // gsap.to('.footer-content', {
  //   yPercent: 100,
  //   ease: 'none',
  //   scrollTrigger: {
  //     trigger: '.footer',
  //     start: 'top bottom',
  //     end: 'bottom bottom',
  //     scrub: true,
  //   },
  // });

  gsap.utils.toArray('.marketing-item').forEach((item) => {
    let content = item.querySelector('.marketing-item__content');
    let heading = item.querySelector('h3');

    let originalFontSize = window.getComputedStyle(heading).fontSize;
    let originalHeight = content.offsetHeight;

    heading.style.fontSize = '24px';
    let reducedHeight = heading.offsetHeight;
    heading.style.fontSize = originalFontSize;

    let trigger = ScrollTrigger.create({
      trigger: item,
      start: 'top 25%',
      toggleActions: 'play reverse play reverse',
      scrub: true,
      onEnter: () => {
        gsap.to(heading, { fontSize: '24px', duration: 0.5, ease: 'power2.out' });
        gsap.to(content, { height: reducedHeight, duration: 0.5, ease: 'power2.out', onUpdate: () => ScrollTrigger.refresh() });
      },
      onLeaveBack: () => {
        gsap.to(heading, { fontSize: originalFontSize, duration: 0.5, ease: 'power2.out' });
        gsap.to(content, { height: originalHeight, duration: 0.5, ease: 'power2.out', onUpdate: () => ScrollTrigger.refresh() });
      },
    });

    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });
  });

  gsap.utils.toArray('.strategies-list li').forEach((item) => {
    let span = item.querySelector('span');

    ScrollTrigger.create({
      trigger: item,
      start: 'top 30%',
      onEnter: () => span.classList.add('active'),
      onLeaveBack: () => span.classList.remove('active'),
    });
  });

  gsap.to('.footer-feedback__ready span', {
    ease: 'none',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top top',
      onEnter: () => document.querySelector('.footer-feedback__ready span').classList.add('active'),
      onLeaveBack: () => document.querySelector('.footer-feedback__ready span').classList.remove('active'),
    },
  });

  const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
