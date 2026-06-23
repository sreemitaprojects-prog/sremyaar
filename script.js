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
   WORK CAROUSELS
   Only runs on work.html (looks for .work-carousel).
   ============================================================ */
(function initCarousels() {
  var carousels = document.querySelectorAll('.work-carousel, .home-carousel');
  if (!carousels.length) return;

  carousels.forEach(function (carousel) {
    var track   = carousel.querySelector('.carousel-track');
    var images  = track.querySelectorAll('img');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var dotsEl  = carousel.querySelector('.carousel-dots');
    var ui      = carousel.querySelector('.carousel-ui');
    var total   = images.length;
    var current = 0;

    if (total <= 1) {
      if (ui) ui.style.display = 'none';
      return;
    }

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

    function goTo(index) {
      current = index;
      track.style.transform = 'translateX(-' + (100 * current) + '%)';
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === total - 1;
      dotsEl.querySelectorAll('.carousel-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    prevBtn.addEventListener('click', function () {
      if (current > 0) goTo(current - 1);
    });

    nextBtn.addEventListener('click', function () {
      if (current < total - 1) goTo(current + 1);
    });

    goTo(0);
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
        '<p>Begin with the stuff you lose last –<br>' +
        'Photographs, uniforms, the yearbook,<br>' +
        'Badges, school shoes, the handwritten letters with<br>' +
        'promises too big to fit in the palm of our hands.<br>' +
        'Your long hair, your belief in yourself, the smell<br>' +
        'Of summer — these are things that existed as extensions of your being,<br>' +
        'like leaves hanging off a tree.<br>' +
        'but then, winter came and they shed, and the wind.<br>' +
        'well, the wind blew them away to some other place,<br>' +
        'you can no longer come home to, blew it away to<br>' +
        'some other time and you stayed rooted to your place.</p>'
    },
    /* -- 2b -- */
    {
      content:
        '<p class="book-piece-title">list of things i\'d put into a time capsule if i was still 17</p>' +
        '<p>Put in your softness next. The able-bodied sweetness<br>' +
        'you had beat to death the second you had run far enough to catch your breath.<br>' +
        'Materialise the bloom in your heart,<br>' +
        'the lust for all your coming winters,<br>' +
        'The want to dive in without knowing what surface awaits,<br>' +
        'Make them into charms adorning anklets to weigh you down,<br>' +
        'And pack them in with a bow stained with blood, hope and the<br>' +
        'Morbid thirst for happiness, place it beside your dreams<br>' +
        'And let it stay alive for longer than it actually did.</p>'
    },
    /* -- 2c -- */
    {
      content:
        '<p class="book-piece-title">list of things i\'d put into a time capsule if i was still 17</p>' +
        '<p>At some point, after you\'ve wept hard enough for the child you used to be,<br>' +
        'pack in the things you lose first:<br>' +
        'The bright, kind memories of all the people who have evaporated since.<br>' +
        'Grandmothers, parents of friends whose casket you lifted,<br>' +
        'Lovers you promised to meet again when you\'re looking for<br>' +
        'quiet mornings and soft forevers, sisters who have tread<br>' +
        'their fingers through your soul and the chosen parts of you to immortalise.<br>' +
        'The forgiving, doting moments of your parents,<br>' +
        'Droplets of peace in an otherwise burning youth.</p>' +
        '<p>Make sure to forget your anger, don\'t pack it in,<br>' +
        'It follows you everywhere nonetheless,<br>' +
        'You will forever run from it regardless.</p>'
    },
    /* -- 2d -- */
    {
      content:
        '<p class="book-piece-title">list of things i\'d put into a time capsule if i was still 17</p>' +
        '<p>Instead, put in dirt from the land that raised you.<br>' +
        'Because the stench of everything that has happened<br>' +
        'has been scrubbed off your face, arms and knees,<br>' +
        'but it can never be washed away from under your nails.<br>' +
        'So, they permeate every surface you touch, the food you eat,<br>' +
        'The destiny you lead. You bleed of the dirt you grew out of,<br>' +
        'But you can never return to it. Not yet at least.<br>' +
        'Tell yourself to put in dirt, so years later,<br>' +
        'You can dig your hands into the earth that birthed you,<br>' +
        'and know that you once had a home.</p>'
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
        '<p>I had this very morbid habit of killing off my grandmother in essays for my English Language test. It just seemed easy to arouse emotion in the reader that way, and since my teachers would change every year, there was thankfully no one to question how she died in very horrifying ways for 5 years straight. I made her read one such essay, where she died rather mundanely, in her sleep, because this was the first of these essays in Bengali, and I didn\'t possess the vocabulary to make it any more complicated than that. Back then, I hadn\'t understood what absence truly meant. I was the absent one all my life, choosing to step away and feel at a later convenience. She had laughed and told me, “You gave me a kind death.” I didn\'t think death was kind at all. I still don\'t. My grandmother died of organ failure, offset by a particularly nasty fall in the bathroom, which saw her break her hip.</p>'
    },
    /* -- 4b -- */
    {
      content:
        '<p class="book-piece-title">english language paper</p>' +
        '<p>She died surrounded by family, but I wasn\'t there to hold her hand when she left. In many ways, I am who I am because of her. Her stories shaped my morality, my understanding of the world. I may pretend to hate everything that tethers me to home, but I could never refuse the prawn curry she would make. The books she would read out to me, the songs she would sing to me, with me, while braiding my hair. I will never be untethered from the ends of her saree, which I would pull over my face while I slept with my head over her lap. The stoicism I showed to the outside world would crumble before her, but there was no more left of her to accept my undoing. So I wept alone on her bed that night, and the day after, and mourned that life was long and that I didn\'t believe in God, so those few years would have to be enough for all eternity.</p>'
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
