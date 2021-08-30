'use strict';

/************************************
 * Initialize data
 */
const account1 = {
  owner: 'Otgonbaatar Ganbat',
  username: 'ganbat',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP', // de-DE
  // locale: 'ja-JP', // de-DE
};

const account2 = {
  owner: 'Batjargal Bayasgalan',
  username: 'bayasaa',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2021-03-01T12:01:20.894Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP',
};

const accounts = [account1, account2];

const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long',
};

/************************************
 * Selecting elements
 */
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const modalBtnSignUp = modal.querySelector('.btn');

// Learn more
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Navi links
const nav = document.querySelector('.nav');
const naviLinks = document.querySelector('.nav__links');
const navHeight = nav.getBoundingClientRect().height;

// Tab
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');

// Header
const header = document.querySelector('.header');

// Lazy load
const imgTargets = document.querySelectorAll('img[data-src]');

// All Sections
const allSections = document.querySelectorAll('.section');

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

/*********************************
 * Functions
 */
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Menu fade animation
const handleEvent = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sublings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sublings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// Header  Observer
const observeHeader = function () {
  const obsCallback = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  };

  const obsOption = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  };

  const headerObserver = new IntersectionObserver(obsCallback, obsOption);
  headerObserver.observe(header);
};

// Reveal All section
const observeAllSection = function () {
  const revealSection = function (entries, observe) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observe.unobserve(entry.target);
  };

  const revealOption = {
    root: null,
    threshold: 0.15,
  };

  const revealObserver = new IntersectionObserver(revealSection, revealOption);

  allSections.forEach(section => {
    revealObserver.observe(section);
    section.classList.add('section--hidden');
  });
};

// Lazy loading image
const lazyLoad = function () {
  const loadImg = function (entries, observe) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observe.unobserve(entry.target);
  };

  const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-200px',
  });

  imgTargets.forEach(img => imgObserver.observe(img));
};

let curSlide = 0;
const maxSlide = slides.length;

const createDot = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

// Next slide
const nexSlide = function () {
  curSlide = curSlide === maxSlide - 1 ? 0 : curSlide + 1;
  goToSlide(curSlide);
  activeDot(curSlide);
};

// Prev slide
const prevSlide = function () {
  curSlide = curSlide === 0 ? maxSlide - 1 : curSlide - 1;
  goToSlide(curSlide);
  activeDot(curSlide);
};

// Creating username
// const createUsernames = accs => {
//   accs.forEach(acc => {
//     acc.username = acc.owner
//       .toLocaleLowerCase()
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//   });
// };

// App initialize function
const init = function () {
  observeHeader();
  observeAllSection();
  lazyLoad();
  createDot();
  activeDot(0);
  goToSlide(0);

  if (!localStorage.getItem('accounts')) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }

  if (!localStorage.getItem('options')) {
    localStorage.setItem('options', JSON.stringify(options));
  }
};

init();

/*************************************
 *  Setting Events
 */
// Multi Modal event
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

// Create new acount
modalBtnSignUp.addEventListener('click', function (e) {
  e.preventDefault();

  const inputFirstName = modal.querySelector('#first_name');
  const inputListName = modal.querySelector('#last_name');
  const inputUserName = modal.querySelector('#user_name');
  const inputPin = document.querySelector('#pin');
  const inputPinConfirm = document.querySelector('#confirm_pin');

  if (
    !inputFirstName.value ||
    !inputListName.value ||
    !inputUserName.value ||
    !inputPin.value ||
    !inputPinConfirm.value
  ) {
    alert('All field is required!');
    return;
  }
  if (inputPin.value !== inputPinConfirm.value) {
    alert('Pin is not match!');
    return;
  }

  const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const accInd = accounts.findIndex(
    account => account.username === inputUserName.value
  );
  if (accInd > -1) {
    alert('Username is already existing!');
    return;
  }

  const account = {
    owner: `${inputFirstName.value} ${inputListName.value}`,
    username: inputUserName.value,
    movements: [],
    interestRate: 1.2, // %
    pin: +inputPin.value,
    movementsDates: [],
    currency: 'JPY',
    locale: 'ja-JP',
  };

  accounts.push(account);
  localStorage.setItem('accounts', JSON.stringify(accounts));
  alert('Sign up is successful');
  window.location.replace('/banking');
});

document.addEventListener('keydown', function (e) {
  e.key === 'Escape' && !modal.classList.contains('hidden') && closeModal();
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nexSlide();
});

// Scroll down event
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Navi events
naviLinks.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    if (id === '/banking') {
      window.location.replace(id);
      return;
    }
    if (id === '#') return;
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

nav.addEventListener('mouseover', handleEvent.bind(0.5));

nav.addEventListener('mouseout', handleEvent.bind(1));

// Tab event
tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Slide vents
btnRight.addEventListener('click', nexSlide);
btnLeft.addEventListener('click', prevSlide);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
  }
});
