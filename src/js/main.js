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
});
