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

    // Teacher's Score form
    var scoreForm = document.getElementById('scoreForm');
    var scoreFeedback = document.getElementById('feedback');

    if (scoreForm) {
      scoreForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var scoreInput = document.getElementById('score');
        if (scoreInput.value > 100) {
          scoreFeedback.textContent = "Score cannot be more than 100.";
          scoreFeedback.style.color = "#b23b3b";
          return;
        }

        var formData = new FormData(scoreForm);

        fetch("https://formspree.io/f/mnpnqkdq", {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
          .then(function (response) {
            if (response.ok) {
              scoreFeedback.textContent = "Score submitted successfully! Thank you.";
              scoreFeedback.style.color = "#1f5c43";
              scoreForm.reset();
            } else {
              scoreFeedback.textContent = "Something went wrong. Please try again.";
              scoreFeedback.style.color = "#b23b3b";
            }
          })
          .catch(function () {
            scoreFeedback.textContent = "Error submitting score. Check your connection.";
            scoreFeedback.style.color = "#b23b3b";
          });
      });
    }