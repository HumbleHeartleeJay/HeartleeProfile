var toggle = document.getElementById('menuToggle');
    var panel = document.getElementById('mobileNav');
    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { panel.classList.remove('open'); });
    });

    // Scrollspy: highlight the current section in the sidebar
    var navLinks = document.querySelectorAll('[data-nav]');
    var sections = Array.from(navLinks).map(function (a) {
      return document.querySelector(a.getAttribute('href'));
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { if (s) observer.observe(s); });