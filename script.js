/* ============================================================
   SREMYAAR -- Personal Website
   script.js: active nav, carousels, work read-more
   ============================================================ */

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
(function setActiveNav() {
  var filename = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === filename) {
      link.classList.add('active');
    }
    if (
      (filename === '' || filename === 'index.html') &&
      href === 'index.html'
    ) {
      link.classList.add('active');
    }
  });
})();


/* ============================================================
   CAROUSELS
   Handles .work-carousel, .about-carousel, .work-project-carousel.
   Work-project carousels: no auto-advance, instant slide change.
   ============================================================ */
(function initCarousels() {
  var carousels = document.querySelectorAll(
    '.work-carousel, .about-carousel, .work-project-carousel'
  );
  if (!carousels.length) return;

  carousels.forEach(function (carousel) {
    var track   = carousel.querySelector('.carousel-track');
    var slides  = track.querySelectorAll('img, .photo-placeholder');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var dotsEl  = carousel.querySelector('.carousel-dots');
    var ui      = carousel.querySelector('.carousel-ui');
    var total   = slides.length;
    var current = 0;
    var isStatic = carousel.classList.contains('work-project-carousel');

    if (total <= 1) {
      if (ui) ui.style.display = 'none';
      return;
    }

    if (dotsEl) {
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
        dot.dataset.index = i;
        dot.addEventListener('click', function () {
          goTo(parseInt(this.dataset.index));
        });
        dotsEl.appendChild(dot);
      }
    }

    function goTo(index) {
      current = index;
      var vpWidth =
        track.parentElement.offsetWidth ||
        track.parentElement.getBoundingClientRect().width;
      track.style.transform = vpWidth
        ? 'translateX(-' + vpWidth * current + 'px)'
        : 'translateX(-' + 100 * current + '%)';
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current === total - 1;
      if (dotsEl) {
        dotsEl.querySelectorAll('.carousel-dot').forEach(function (d, i) {
          d.classList.toggle('active', i === current);
        });
      }
    }

    carousel.addEventListener('carousel-refresh', function () {
      goTo(current);
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (current > 0) goTo(current - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (current < total - 1) goTo(current + 1);
      });
    }

    goTo(0);

    /* Auto-advance only for non-static carousels */
    if (!isStatic) {
      var autoTimer = setInterval(function () {
        goTo(current + 1 < total ? current + 1 : 0);
      }, 4000);

      carousel.addEventListener('mouseenter', function () {
        clearInterval(autoTimer);
      });
      carousel.addEventListener('mouseleave', function () {
        autoTimer = setInterval(function () {
          goTo(current + 1 < total ? current + 1 : 0);
        }, 4000);
      });
    }
  });
})();


/* ============================================================
   WORK READ MORE / READ LESS TOGGLE
   ============================================================ */
(function initReadMore() {
  var btns = document.querySelectorAll('.work-read-btn');
  if (!btns.length) return;

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var entry    = btn.closest('.work-entry');
      var expanded = entry.querySelector('.work-expanded');
      var isOpen   = expanded.classList.contains('is-open');
      if (isOpen) {
        expanded.classList.remove('is-open');
        btn.textContent = 'read more';
      } else {
        expanded.classList.add('is-open');
        btn.textContent = 'read less';
      }
    });
  });
})();
