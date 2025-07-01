// Beyond Career Main JS

// Wait for document to be ready
$(document).ready(function () {
  // Hamburger menu toggle
  $('.navbar-toggler').on('click', function () {
    const menu = $('#navbar-menu');
    menu.toggleClass('open');
    $(this).attr('aria-expanded', menu.hasClass('open'));
  });

  // Smooth scroll for nav links
  $('.nav-link').on('click', function (e) {
    if (this.hash) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(this.hash).offset().top - 80
      }, 700);
      // Close mobile menu after click
      $('#navbar-menu').removeClass('open');
      $('.navbar-toggler').attr('aria-expanded', 'false');
    }
  });

  // Initialize components when document is ready
  initTestimonialCarousel();
  initScrollAnimations();
  initServiceCarousel();
});

// Testimonial carousel
function initTestimonialCarousel() {
  const testimonials = $('.testimonial_item');
  if (testimonials.length === 0) return;

  let currentIndex = 0;
  const totalTestimonials = testimonials.length;

  function showTestimonial(index) {
    testimonials.removeClass('active').hide();
    testimonials.eq(index).addClass('active').fadeIn(500);
  }

  // Navigation arrows
  $('.testimonial-arrow.left-arrow').on('click', function() {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentIndex);
  });

  $('.testimonial-arrow.right-arrow').on('click', function() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(currentIndex);
  });

  // Auto-rotate testimonials
  setInterval(function() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(currentIndex);
  }, 5000);

  // Show first testimonial
  showTestimonial(0);
}

// Service carousel
function initServiceCarousel() {
  const cards = $('.services-carousel .service_card');
  if (cards.length === 0) return;

  let currentIndex = 0;
  const visibleCount = 2;
  const totalCards = cards.length;

  function showCards(startIndex) {
    cards.hide().removeClass('active');
    for (let i = 0; i < visibleCount; i++) {
      const idx = (startIndex + i) % totalCards;
      cards.eq(idx).show().addClass('active');
    }
  }

  $('.carousel-arrow.left-arrow').off('click').on('click', function() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    showCards(currentIndex);
  });

  $('.carousel-arrow.right-arrow').off('click').on('click', function() {
    currentIndex = (currentIndex + 1) % totalCards;
    showCards(currentIndex);
  });

  showCards(0);
}

// Scroll animations
function initScrollAnimations() {
  // Add scroll event for animations
  $(window).on('scroll', function() {
    $('.animate-on-scroll').each(function() {
      const elementTop = $(this).offset().top;
      const windowHeight = $(window).height();
      const scrollPosition = $(window).scrollTop();
      
      if (elementTop < (scrollPosition + windowHeight - 100)) {
        $(this).addClass('animated');
      }
    });
  });
  
  // Trigger scroll once to check initial positions
  $(window).trigger('scroll');
}

// Student (customer) carousel
function initCustomerCarousel() {
  const customers = $('.customer-carousel .customer_main');
  if (customers.length === 0) return;

  let currentIndex = 0;
  const totalCustomers = customers.length;
  const visibleCount = 2;

  function showCustomers(startIndex) {
    customers.removeClass('active').hide();
    for (let i = 0; i < visibleCount; i++) {
      const idx = (startIndex + i) % totalCustomers;
      customers.eq(idx).addClass('active').fadeIn(500);
    }
  }

  // Navigation arrows
  $('.customer-arrow.left-arrow').on('click', function() {
    currentIndex = (currentIndex - 1 + totalCustomers) % totalCustomers;
    showCustomers(currentIndex);
  });

  $('.customer-arrow.right-arrow').on('click', function() {
    currentIndex = (currentIndex + 1) % totalCustomers;
    showCustomers(currentIndex);
  });

  // Show first two customers
  showCustomers(0);
}

// Initialize on document ready
$(document).ready(function () {
  // ...existing code...
  initCustomerCarousel();
});

// Animated counters for stats
function animateCounters() {
  $('.stat_number').each(function () {
    const $this = $(this);
    const target = +$this.data('target');
    $({ countNum: 0 }).animate({ countNum: target }, {
      duration: 2000,
      easing: 'swing',
      step: function () {
        $this.text(Math.floor(this.countNum));
      },
      complete: function () {
        $this.text(target);
      }
    });
  });
}

// Contact form validation
function validateContactForm() {
  let valid = true;
  const name = $('#name').val().trim();
  const email = $('#email').val().trim();
  const message = $('#message').val().trim();
  // Reset error states
  $('#contactForm input, #contactForm textarea').removeClass('is-invalid');
  if (name === '') {
    $('#name').addClass('is-invalid');
    valid = false;
  }
  if (email === '' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    $('#email').addClass('is-invalid');
    valid = false;
  }
  if (message === '') {
    $('#message').addClass('is-invalid');
    valid = false;
  }
  return valid;
}

// Initialize on document ready
$(function() {
  // Add focus style for accessibility
  $('a, button, input, textarea').on('focus', function () {
    $(this).css('outline', '2px solid #3949ab');
  }).on('blur', function () {
    $(this).css('outline', 'none');
  });

  // Contact form submission
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    if (validateContactForm()) {
      // Simulate form submission (replace with AJAX if needed)
      alert('Thank you for contacting us! We will get back to you soon.');
      $('#contactForm')[0].reset();
    }
  });

  // Trigger animations on scroll
  function triggerAnimationsOnScroll() {
    const animatedEls = document.querySelectorAll('.animate-on-scroll, .animate-fadein, .animate-fadein-delay, .animate-fadein-delay-2, .animate-slideup, .animate-scalein, .animate-scalein-delay, .animate-scalein-delay-2, .animate-scalein-delay-3');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'none';
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    animatedEls.forEach(el => {
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', triggerAnimationsOnScroll);

  // Animate on load
  function animateOnLoad() {
    $('.animate-fadein').each(function (i, el) {
      $(el).css('opacity', 1);
    });
    $('.animate-slideup').each(function (i, el) {
      $(el).css('opacity', 1).css('transform', 'translateY(0)');
    });
    $('.animate-zoom').each(function (i, el) {
      $(el).css('opacity', 1).css('transform', 'scale(1)');
    });
    $('.animate-fadein-delay').each(function (i, el) {
      $(el).css('opacity', 1);
    });
  }
  setTimeout(animateOnLoad, 350);
});

$(function () {
  'use strict';

  // Smooth scrolling for navigation links
  $('a.nav-link').on('click', function (e) {
    if (this.hash !== '') {
      e.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 80
      }, 700);
    }
  });

  // Hamburger menu toggle for mobile (Bootstrap handles most, but ensure accessibility)
  $('.navbar-toggler').on('click', function () {
    $('#navbarSupportedContent').toggleClass('show');
  });

  // Simple testimonial carousel (auto-scroll)
  let testimonialIndex = 0;
  const testimonials = $('.testimonial_item');
  if (testimonials.length > 1) {
    testimonials.hide().eq(0).show();
    setInterval(function () {
      testimonials.eq(testimonialIndex).fadeOut(400, function () {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        testimonials.eq(testimonialIndex).fadeIn(400);
      });
    }, 3500);
  }

  // Contact form validation
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    let valid = true;
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();
    // Reset error states
    $('#contactForm input, #contactForm textarea').removeClass('is-invalid');
    if (name === '') {
      $('#name').addClass('is-invalid');
      valid = false;
    }
    if (email === '' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      $('#email').addClass('is-invalid');
      valid = false;
    }
    if (message === '') {
      $('#message').addClass('is-invalid');
      valid = false;
    }
    if (valid) {
      // Simulate form submission (replace with AJAX if needed)
      alert('Thank you for contacting us! We will get back to you soon.');
      $('#contactForm')[0].reset();
    }
  });

  // Add focus style for accessibility
  $('a, button, input, textarea').on('focus', function () {
    $(this).css('outline', '2px solid #3949ab');
  }).on('blur', function () {
    $(this).css('outline', 'none');
  });

});
