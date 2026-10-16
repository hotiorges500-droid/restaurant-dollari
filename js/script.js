const menuButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

if (menuButtons.length) {
  menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;

      menuButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      menuCards.forEach((card) => {
        const shouldShow = category === 'all' || card.dataset.category === category;
        card.style.display = shouldShow ? 'block' : 'none';
      });
    });
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuIcon?.classList.toggle('fa-bars', !isOpen);
    menuIcon?.classList.toggle('fa-xmark', isOpen);
  });
}

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 220) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Ju lutemi plotësoni të gjitha fushat e kërkuara.';
      formMessage.style.color = '#8c2b2b';
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      formMessage.textContent = 'Ju lutemi shkruani një email të vlefshëm.';
      formMessage.style.color = '#8c2b2b';
      return;
    }

    formMessage.textContent = 'Faleminderit! Mesazhi juaj u përgatit me sukses.';
    formMessage.style.color = '#2d6b41';
    contactForm.reset();
  });
}

const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeLightbox = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');

if (lightbox && lightboxImage && galleryImages.length) {
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    lightboxImage.src = galleryImages[index].src;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  const close = () => {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => openLightbox(index));
  });

  closeLightbox.addEventListener('click', close);

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentIndex].src;
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentIndex].src;
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('show')) return;

    if (event.key === 'Escape') close();
    if (event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      lightboxImage.src = galleryImages[currentIndex].src;
    }
    if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImage.src = galleryImages[currentIndex].src;
    }
  });
}

const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.main-nav a');

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});
