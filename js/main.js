// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Inject the waveform divider into every .waveform placeholder.
  // Path goes from jagged/noisy (left) to a calm even line (right):
  // the record's arc from chaos into listening.
  const wf = `
  <svg viewBox="0 0 1200 34" preserveAspectRatio="none" aria-hidden="true">
    <polyline points="0,17 15,4 30,29 45,9 60,25 75,2 90,31 105,12 120,22 135,6 150,27 165,15 180,4 195,29 210,10 225,24 240,17 255,17 270,13 285,21 300,17 320,17 340,15 360,19 380,17 400,17 420,16 440,18 460,17 480,17 500,17 520,17 540,17 560,17 580,17 600,17 650,17 700,17 750,17 800,17 850,17 900,17 950,17 1000,17 1050,17 1100,17 1150,17 1200,17"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  document.querySelectorAll('img.cover-art').forEach(img => {
    img.addEventListener('error', () => {
      img.classList.add('img-missing');
      img.alt = img.alt + ' (not uploaded yet)';
    }, { once: true });
  });

  document.querySelectorAll('.waveform').forEach(el => {
    el.innerHTML = wf;
    el.style.color = el.dataset.color === 'noise' ? 'var(--noise)' : 'var(--listen)';
  });

  // Contact form: Web3Forms, submitted via fetch so the person
  // gets an inline confirmation instead of leaving the page.
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = document.getElementById('form-status');
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      status.textContent = 'Sending...';
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(contactForm)
        });
        const data = await res.json();
        if (data.success) {
          status.textContent = 'Message sent. Thanks, you will hear back soon.';
          contactForm.reset();
        } else {
          status.textContent = 'Something went wrong. Please try again or email mockedmonkey@proton.me directly.';
        }
      } catch (err) {
        status.textContent = 'Network error. Please try again or email mockedmonkey@proton.me directly.';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Shows page: load dates from assets/data/shows.json.
  // Editing that JSON file is all that's needed to add/remove a show.
  const showsList = document.getElementById('shows-list');
  const showsEmpty = document.getElementById('shows-empty');
  if (showsList && showsEmpty) {
    fetch('assets/data/shows.json')
      .then(r => r.ok ? r.json() : { shows: [] })
      .then(data => {
        const today = new Date().toISOString().slice(0, 10);
        const upcoming = (data.shows || [])
          .filter(s => s.date >= today)
          .sort((a, b) => a.date.localeCompare(b.date));

        if (upcoming.length === 0) {
          showsEmpty.style.display = '';
          showsList.style.display = 'none';
          return;
        }

        showsList.innerHTML = upcoming.map(s => {
          const mapQuery = encodeURIComponent([s.venue, s.city].filter(Boolean).join(', '));
          const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
          return `
          <li class="show-item">
            <span class="date">${s.displayDate || s.date}</span>
            <span class="place">${s.venue || ''}${s.venue && s.city ? ', ' : ''}${s.city || ''}
              <small>
                ${s.link ? `<a href="${s.link}" target="_blank" rel="noopener">${s.linkLabel || 'Details'}</a> &middot; ` : ''}<a href="${mapUrl}" target="_blank" rel="noopener">Map</a>
              </small>
            </span>
          </li>`;
        }).join('');
        showsList.style.display = '';
        showsEmpty.style.display = 'none';
      })
      .catch(() => {
        // JSON missing or malformed: fall back to the empty state
        // rather than showing a broken page.
        showsEmpty.style.display = '';
        showsList.style.display = 'none';
      });
  }
});
