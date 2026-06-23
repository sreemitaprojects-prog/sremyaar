/* ============================================================
   SREMYAAR -- Personal Website
   script.js: active nav state + flipbook
   ============================================================ */

/* ============================================================
   ACTIVE NAV LINK
   Reads the current filename from the URL path and marks the
   matching nav link active with the gold underline.
   ============================================================ */
(function setActiveNav() {
  const filename = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === filename) {
      link.classList.add('active');
    }
    /* Home link is active on both / and index.html */
    if (
      (filename === '' || filename === 'index.html') &&
      href === 'index.html'
    ) {
      link.classList.add('active');
    }
  });
})();


/* ============================================================
   FLIPBOOK
   Only runs on writing.html (looks for .flipbook-wrapper).

   HOW TO ADD YOUR WRITING:
   Each object in the `pages` array below is one physical book
   page. Edit the `content` field with your text.
   Use <p> tags for paragraphs.
   Long pieces should be split across multiple page objects.
   Title pages use class="book-piece-title title-page".
   ============================================================ */
(function initFlipbook() {
  var wrapper = document.querySelector('.flipbook-wrapper');
  if (!wrapper) return;

  /* ---- Page content ---- */
  /* Each entry = one physical page of the book */
  var pages = [

    /* -- 1 -- */
    {
      content:
        '<p class="book-piece-title title-page">' +
        'list of things i\'d put into a time capsule<br>if i was still 17' +
        '</p>'
    },
    /* -- 2 -- */
    {
      content:
        '<p class="book-piece-title">list of things i\'d put into a time capsule if i was still 17</p>' +
        '<p>[Paste the text of this piece here. Split into more page objects below if the text is long.]</p>'
    },

    /* -- 3 -- */
    {
      content:
        '<p class="book-piece-title title-page">english language paper</p>'
    },
    /* -- 4 -- */
    {
      content:
        '<p class="book-piece-title">english language paper</p>' +
        '<p>[Paste the text of this piece here.]</p>'
    },

    /* -- 5 -- */
    {
      content:
        '<p class="book-piece-title title-page">letter to an old friend</p>'
    },
    /* -- 6 -- */
    {
      content:
        '<p class="book-piece-title">letter to an old friend</p>' +
        '<p>[Paste the text of this piece here.]</p>'
    },

    /* -- 7 -- */
    {
      content:
        '<p class="book-piece-title title-page">missed calls</p>'
    },
    /* -- 8 -- */
    {
      content:
        '<p class="book-piece-title">missed calls</p>' +
        '<p>[Paste the text of this piece here.]</p>'
    },

    /* -- 9 -- */
    {
      content:
        '<p class="book-piece-title title-page">The Prodigal Sun</p>'
    },
    /* -- 10 -- */
    {
      content:
        '<p class="book-piece-title">The Prodigal Sun</p>' +
        '<p>[Paste the text of this piece here.]</p>'
    },

    /* -- 11 -- */
    {
      content:
        '<p class="book-piece-title title-page">somewhat hopeful letter</p>'
    },
    /* -- 12 -- */
    {
      content:
        '<p class="book-piece-title">somewhat hopeful letter</p>' +
        '<p>[Paste the text of this piece here.]</p>'
    },

    /* -- 13 -- */
    {
      content:
        '<p class="book-piece-title title-page">very angry letter pt. 2</p>'
    },
    /* -- 14 -- */
    {
      content:
        '<p class="book-piece-title">very angry letter pt. 2</p>' +
        '<p>[Paste the text of this piece here.]</p>'
    },

    /* -- 15 -- */
    {
      content:
        '<p class="book-piece-title title-page">some july night</p>'
    },
    /* -- 16 -- */
    {
      content:
        '<p class="book-piece-title">some july night</p>' +
        '<p>[Paste the text of this piece here.]</p>'
    },

    /* -- 17 -- */
    {
      content:
        '<p class="book-piece-title title-page">clawed</p>'
    },
    /* -- 18 -- */
    {
      content:
        '<p class="book-piece-title">clawed</p>' +
        '<p>[Paste the text of this piece here.]</p>'
    },

    /* -- 19 -- */
    {
      content:
        '<p class="book-piece-title title-page">so it is</p>'
    },
    /* -- 20 -- */
    {
      content:
        '<p class="book-piece-title">so it is</p>' +
        '<p>[Paste the text of this piece here.]</p>'
    },

    /* -- 21 -- */
    {
      content:
        '<p class="book-piece-title title-page">see you</p>'
    },
    /* -- 22 -- */
    {
      content:
        '<p class="book-piece-title">see you</p>' +
        '<p>[Paste the text of this piece here.]</p>'
    }

  ];

  var total = pages.length;
  /* currentIndex is the 0-based index of the left-page currently shown */
  var currentIndex = 0;

  var leftPage  = document.querySelector('.book-page.page-left');
  var rightPage = document.querySelector('.book-page.page-right');
  var prevBtn   = document.querySelector('.flipbook-arrow.prev');
  var nextBtn   = document.querySelector('.flipbook-arrow.next');
  var counter   = document.querySelector('.flipbook-page-count');

  function isDesktop() {
    return window.innerWidth > 640;
  }

  function render() {
    var desktop = isDesktop();

    if (desktop) {
      /* Two-page spread */
      rightPage.style.display = 'block';
      leftPage.classList.add('page-left');

      leftPage.innerHTML  = pages[currentIndex] ? pages[currentIndex].content : '';
      rightPage.innerHTML =
        currentIndex + 1 < total ? pages[currentIndex + 1].content : '';

      counter.textContent = (currentIndex + 1) + ' / ' + total;
      prevBtn.disabled = currentIndex <= 0;
      nextBtn.disabled = currentIndex + 2 >= total;

    } else {
      /* Single page on mobile */
      rightPage.style.display = 'none';
      leftPage.classList.remove('page-left'); /* no spine border on mobile */

      leftPage.innerHTML = pages[currentIndex] ? pages[currentIndex].content : '';

      counter.textContent = (currentIndex + 1) + ' / ' + total;
      prevBtn.disabled = currentIndex <= 0;
      nextBtn.disabled = currentIndex + 1 >= total;
    }
  }

  prevBtn.addEventListener('click', function () {
    if (isDesktop()) {
      /* Go back a spread (2 pages), stay on even index */
      currentIndex = Math.max(0, currentIndex - 2);
    } else {
      currentIndex = Math.max(0, currentIndex - 1);
    }
    render();
  });

  nextBtn.addEventListener('click', function () {
    if (isDesktop()) {
      if (currentIndex + 2 < total) {
        currentIndex += 2;
      }
    } else {
      if (currentIndex + 1 < total) {
        currentIndex += 1;
      }
    }
    render();
  });

  /* Re-render on resize -- snap to even index on desktop */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (isDesktop() && currentIndex % 2 !== 0) {
        currentIndex -= 1;
      }
      render();
    }, 120);
  });

  render();
})();
