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

  gsap.config({
    autoSleep: 60,
    force3D: false,
    nullTargetWarn: false,
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
      // onUpdate: (self) => {
      //   const image = document.querySelector('.full-image');
      //   self.progress >= 1 ? image.classList.add('change') : image.classList.remove('change');
      // },
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

  const footerFeedbackReady = document.querySelector('.footer-feedback__ready span');
  gsap.to('.footer-feedback__ready span', {
    ease: 'none',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top top',
      onEnter: () => footerFeedbackReady?.classList.add('active'),
      onLeaveBack: () => footerFeedbackReady?.classList.remove('active'),
    },
  });

  gsap.to('.exp-image img', {
    scale: 1.4,
    filter: 'blur(50px) grayscale(100%)',
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: {
      trigger: '.exp',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });

  const expSwitch = document.querySelector('.exp-switch span');
  gsap.to('.exp-switch span', {
    ease: 'none',
    scrollTrigger: {
      trigger: '.exp-wrapper',
      start: 'top top',
      onEnter: () => expSwitch?.classList.add('active'),
      onLeaveBack: () => expSwitch?.classList.remove('active'),
    },
  });

  gsap.to('.approach-bg__right, .approach-bg__left', {
    width: 'calc(100% + 960px)',
    ease: 'none',
    scrollTrigger: {
      trigger: '.approach',
      start: 'top bottom',
      end: 'top top',
      scrub: true,
    },
  });

  gsap.to('.approach-image img', {
    yPercent: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.approach',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true,
    },
  });

  gsap.to('.approach-bg', {
    borderRadius: '0 0 40px 40px',
    scale: '0.96',
    ease: 'none',
    scrollTrigger: {
      trigger: '.approach',
      start: 'bottom center',
      end: 'bottom top',
      scrub: true,
    },
  });

  const approachSwitch = document.querySelector('.approach-switch span');
  gsap.to('.approach-switch span', {
    ease: 'none',
    scrollTrigger: {
      trigger: '.approach',
      start: 'top top',
      onEnter: () => approachSwitch?.classList.add('active'),
      onLeaveBack: () => approachSwitch?.classList.remove('active'),
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

  function createInfiniteScroll(row, index) {
    const list = row.querySelector('.clients-list');
    const clone = list.cloneNode(true);
    row.appendChild(clone);

    const totalWidth = list.offsetWidth;
    const direction = index % 2 === 0 ? -1 : 1;

    gsap.set([list, clone], {});

    const scrollTween = gsap.to(row, {
      x: direction * totalWidth + 'px',
      duration: 60,
      ease: 'none',
      repeat: -1,
      paused: true,
      modifiers: {
        x: gsap.utils.unitize((x) => (direction > 0 ? -totalWidth + (parseFloat(x) % totalWidth) : parseFloat(x) % totalWidth)),
      },
    });

    ScrollTrigger.create({
      trigger: '.clients',
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => scrollTween.play(),
      onLeave: () => scrollTween.pause(),
      onEnterBack: () => scrollTween.play(),
      onLeaveBack: () => scrollTween.pause(),
    });
  }

  document.querySelectorAll('.clients-row').forEach(createInfiniteScroll);

  document.querySelectorAll('.approach-item').forEach((item) => {
    const title = item.querySelector('.approach-item__title');
    const content = item.querySelector('.approach-item__content');

    if (title && content) {
      const titleHeight = title.offsetHeight + 'px';
      const contentHeight = content.scrollHeight + 'px';

      content.style.height = titleHeight;

      item.addEventListener('mouseenter', () => {
        content.style.height = contentHeight;
      });

      item.addEventListener('mouseleave', () => {
        content.style.height = titleHeight;
      });
    }
  });

  const container = document.querySelector('.marquee-container');
  const text = document.querySelector('.marquee-text');

  if (text.offsetWidth > container.offsetWidth) {
    const textWidth = text.offsetWidth + 40;
    const containerWidth = container.offsetWidth + 40;
    const speed = 150;

    function animate() {
      gsap.to(text, {
        x: -textWidth,
        duration: textWidth / speed,
        ease: 'linear',
        onComplete: () => {
          gsap.set(text, { x: containerWidth });
          animate();
        },
      });
    }

    gsap.set(text, { x: 0 });
    animate();
  }

  gsap.to('.full-image-2', {
    width: 'calc(100% - 80px)',
    borderRadius: '40px',
    ease: 'none',
    scrollTrigger: {
      trigger: '.full-image-2',
      start: 'top 50%',
      end: 'bottom: 20%',
      scrub: true,
    },
  });
});
