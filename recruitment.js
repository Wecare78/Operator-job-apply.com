(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');
  const modal = document.querySelector('#application-modal');
  const closeButtons = document.querySelectorAll('[data-close-application]');
  const openTriggers = document.querySelectorAll('[data-open-application]');
  let returnFocusTo = null;

  function closeMenu() {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navigation?.classList.toggle('is-open', !isOpen);
  });

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  function openApplication(event) {
    event.preventDefault();
    if (!modal) return;
    closeMenu();
    returnFocusTo = navigation?.contains(event.currentTarget) && menuToggle
      ? menuToggle
      : event.currentTarget;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close')?.focus();
  }

  function closeApplication() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (returnFocusTo instanceof HTMLElement) returnFocusTo.focus();
  }

  openTriggers.forEach((trigger) => trigger.addEventListener('click', openApplication));
  closeButtons.forEach((button) => button.addEventListener('click', closeApplication));

  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeApplication();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeApplication();
      closeMenu();
    }
  });
})();
