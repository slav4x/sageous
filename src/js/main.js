document.addEventListener('DOMContentLoaded', () => {
  // Константы и конфигурации
  const BREAKPOINTS = { mobile: 1024, desktop: 1600 };
  const fullImageWidth = window.innerWidth < BREAKPOINTS.desktop ? 'calc(100% - 40px)' : 'calc(100% - 80px)';
  const fontSizeSm = window.innerWidth < BREAKPOINTS.desktop ? '20px' : '24px';
  const widthApproachBG = window.innerWidth < BREAKPOINTS.mobile ? 'calc(100% + 375px)' : 'calc(100% + 960px)';
  const approachBgBorderRadius = window.innerWidth < BREAKPOINTS.desktop ? '0 0 20px 20px' : '0 0 40px 40px';
  const fullImageBorderRadius = window.innerWidth < BREAKPOINTS.desktop ? '20px' : '40px';
  const fullImageTrigger = window.innerWidth < BREAKPOINTS.mobile ? 'top 80%' : 'top 50%';
  const fullImageY = window.innerWidth < BREAKPOINTS.mobile ? 100 : 200;

  // Инициализация плагинов
  Fancybox.bind('[data-fancybox]', {
    dragToClose: false,
    autoFocus: false,
    placeFocusBack: false,
    Thumbs: false,
  });

  const maskOptions = {
    mask: '+7 (000) 000-00-00',
    onFocus() {
      if (this.value === '') this.value = '+7 ';
    },
    onBlur() {
      if (this.value === '+7 ') this.value = '';
    },
  };

  // Инициализация масок
  document.querySelectorAll('.masked').forEach((item) => new IMask(item, maskOptions));

  // Бургер-меню
  const header = document.querySelector('.header');
  const toggleBurger = () => {
    header.querySelector('.header-burger__popup').classList.toggle('show');
    header.classList.toggle('show');
  };
  header.querySelectorAll('.header-burger__button').forEach((btn) => btn.addEventListener('click', toggleBurger));

  // GSAP конфигурация
  gsap.config({ autoSleep: 60, force3D: true, nullTargetWarn: false });
  gsap.registerPlugin(ScrollTrigger);

  // Анимации
  gsap.set('.exp-image img', {
    xPercent: -50,
    yPercent: -50,
    scale: 1,
  });

  const animations = [
    {
      selector: '.hero',
      props: { yPercent: 50 },
      trigger: {
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          const headerBurger = document.querySelector('.header-burger');
          if (self.progress === 1) {
            headerBurger.classList.add('show');
          } else {
            headerBurger.classList.remove('show');
          }
        },
      },
    },
    { selector: '.full-image', props: { width: '100%' }, trigger: { start: fullImageTrigger, end: 'bottom bottom' } },
    { selector: '.full-image img', props: { y: fullImageY }, trigger: { start: fullImageTrigger, end: 'bottom bottom' } },
    {
      selector: '.exp-image img',
      props: { scale: 1.4, filter: 'blur(50px) grayscale(100%)', opacity: 0.2 },
      trigger: { trigger: '.exp', start: 'top top', end: 'bottom bottom' },
    },
    {
      selector: '.approach-bg__right, .approach-bg__left',
      props: { width: widthApproachBG },
      trigger: { trigger: '.approach', start: 'top bottom', end: 'top top' },
    },
    {
      selector: '.approach-image img',
      props: { yPercent: -60 },
      trigger: { trigger: '.approach', start: 'top bottom', end: 'bottom bottom' },
    },
    {
      selector: '.approach-bg',
      props: { borderRadius: approachBgBorderRadius, scale: 0.96 },
      trigger: { trigger: '.approach', start: 'bottom center', end: 'bottom top' },
    },
    {
      selector: '.full-image-2',
      props: { width: fullImageWidth, borderRadius: fullImageBorderRadius },
      trigger: { start: fullImageTrigger, end: 'bottom bottom' },
    },
    { selector: '.full-image-2 img', props: { y: fullImageY }, trigger: { start: fullImageTrigger, end: 'bottom bottom' } },
  ];

  animations.forEach(({ selector, props, trigger }) => {
    gsap.to(selector, {
      ...props,
      ease: 'none',
      scrollTrigger: { trigger: selector, scrub: true, ...trigger },
    });
  });

  // Marketing items
  if (window.innerWidth > BREAKPOINTS.mobile) {
    gsap.utils.toArray('.marketing-item').forEach((item) => {
      const content = item.querySelector('.marketing-item__content');
      const heading = item.querySelector('h3');
      const originalFontSize = window.getComputedStyle(heading).fontSize;
      const originalHeight = content.offsetHeight;

      heading.style.fontSize = fontSizeSm;
      const reducedHeight = heading.offsetHeight;
      heading.style.fontSize = originalFontSize;

      ScrollTrigger.create({
        trigger: item,
        start: 'top 25%',
        toggleActions: 'play reverse play reverse',
        onEnter: () => {
          gsap.to(heading, { fontSize: fontSizeSm, duration: 0.5, ease: 'power2.out' });
          gsap.to(content, { height: reducedHeight, duration: 0.5, ease: 'power2.out', onUpdate: ScrollTrigger.refresh });
        },
        onLeaveBack: () => {
          gsap.to(heading, { fontSize: originalFontSize, duration: 0.5, ease: 'power2.out' });
          gsap.to(content, { height: originalHeight, duration: 0.5, ease: 'power2.out', onUpdate: ScrollTrigger.refresh });
        },
      });
    });
  }

  // Toggle классов при скролле
  const toggleClassTriggers = [
    { selector: '.strategies-list li', span: 'span', start: (i) => `top ${50 - i * 5}%` },
    { selector: '.about-list li', span: 'span', start: (i) => `top ${50 - i * 5}%` },
    { selector: '.footer-feedback__ready span', start: 'top 50%' },
    { selector: '.exp-switch span', start: 'top 50%' },
    { selector: '.approach-switch span', start: 'top 50%' },
    { selector: '.services-steps__switch span', start: 'top 50%' },
    { selector: '.services-projects__switch span', start: 'top 50%' },
  ];

  toggleClassTriggers.forEach(({ selector, span, start }) => {
    gsap.utils.toArray(selector).forEach((item, i) => {
      const target = span ? item.querySelector(span) : item;
      ScrollTrigger.create({
        trigger: item,
        start: typeof start === 'function' ? start(i) : start,
        onEnter: () => target.classList.add('active'),
        onLeaveBack: () => target.classList.remove('active'),
      });
    });
  });

  // Lenis smooth scroll
  const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Плавная прокрутка по якорям
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(anchor.getAttribute('href').substring(1));
      if (target) lenis.scrollTo(target, { offset: 0, duration: 2 });
    });
  });

  // Бесконечный скролл клиентов
  document.querySelectorAll('.clients-row').forEach((row, index) => {
    const list = row.querySelector('.clients-list');
    const clone = list.cloneNode(true);
    row.appendChild(clone);

    const totalWidth = list.offsetWidth;
    const direction = index % 2 === 0 ? -1 : 1;

    const scrollTween = gsap.to(row, {
      x: direction * totalWidth,
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
  });

  // Approach items
  if (window.innerWidth > BREAKPOINTS.mobile) {
    document.querySelectorAll('.approach-item').forEach((item) => {
      const title = item.querySelector('.approach-item__title');
      const content = item.querySelector('.approach-item__content');
      if (!title || !content) return;

      const heights = {
        collapsed: `${title.offsetHeight}px`,
        expanded: `${content.scrollHeight}px`,
      };
      content.style.height = heights.collapsed;

      item.addEventListener('mouseenter', () => (content.style.height = heights.expanded));
      item.addEventListener('mouseleave', () => (content.style.height = heights.collapsed));
    });
  }

  // Марки
  const marquee = {
    container: document.querySelector('.marquee-container'),
    text: document.querySelector('.marquee-text'),
  };

  if (marquee.container && marquee.text?.offsetWidth > marquee.container.offsetWidth) {
    const widths = {
      text: marquee.text.offsetWidth + 40,
      container: marquee.container.offsetWidth + 40,
    };
    const speed = 100;

    const animateMarquee = () => {
      gsap.to(marquee.text, {
        x: -widths.text,
        duration: widths.text / speed,
        ease: 'linear',
        onComplete: () => {
          gsap.set(marquee.text, { x: widths.container });
          animateMarquee();
        },
      });
    };
    gsap.set(marquee.text, { x: 0 });
    animateMarquee();
  }

  // Карточки сервисов
  if (window.innerWidth >= 1200) {
    gsap.utils.toArray('.services-steps__card').forEach((card, i, cards) => {
      const step = 0.05;
      const finalScale = 1 - (cards.length - 1 - i) * step;

      Object.assign(card.style, {
        top: `${20 + i * 20}px`,
        marginBottom: `${(cards.length - 1 - i) * 20}px`,
        marginTop: `${(cards.length - 1 - i) * -20 - 20}px`,
        zIndex: i + 1,
      });

      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top top+=20',
          end: `top+=${card.offsetHeight} top`,
          scrub: true,
        },
        scale: finalScale,
        opacity: i === cards.length - 1 ? 1 : 0.5,
      });
    });
  }

  // Слайдер проектов
  new Swiper('.projects-slider__carousel', {
    spaceBetween: 10,
    pagination: { el: '.projects-slider__pagination' },
    navigation: {
      nextEl: '.projects-slider__arrow-next',
      prevEl: '.projects-slider__arrow-prev',
    },
    breakpoints: {
      1024: {
        spaceBetween: 20,
      },
    },
  });

  // Анимация текста
  document.querySelectorAll('[data-animate-text]').forEach((element) => {
    const text = new SplitType(element, { types: ['chars', 'words'] });
    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      },
      opacity: 0.2,
      stagger: 0.1,
    });
  });

  const root = document.documentElement;
  let minHeight = window.innerHeight;
  let maxHeight = window.innerHeight;

  const updateViewportHeights = () => {
    const viewport = window.visualViewport || window;
    const currentHeight = viewport.height || window.innerHeight;

    minHeight = Math.min(minHeight, currentHeight);
    maxHeight = Math.max(maxHeight, currentHeight);
    const vh = currentHeight;

    root.style.setProperty('--100vh', `${vh}px`);
    root.style.setProperty('--100svh', `${minHeight}px`);
    root.style.setProperty('--100lvh', `${maxHeight}px`);
  };

  updateViewportHeights();

  let timeout;
  const debounceUpdate = () => {
    clearTimeout(timeout);
    timeout = setTimeout(updateViewportHeights, 100);
  };

  window.addEventListener('resize', debounceUpdate);
  window.addEventListener('scroll', debounceUpdate);

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', debounceUpdate);
    window.visualViewport.addEventListener('scroll', debounceUpdate);
  }

  const rafUpdate = () => {
    updateViewportHeights();
    requestAnimationFrame(rafUpdate);
  };
  requestAnimationFrame(rafUpdate);
});
