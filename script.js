document.addEventListener('DOMContentLoaded', function () {
  var boot = document.getElementById('boot');
  var page = document.getElementById('page');
  var footer = document.querySelector('footer');
  var menuItems = document.querySelectorAll('.menu-item');
  var yearSpan = document.getElementById('year');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  function revealPage() {
    if (boot) boot.classList.add('hide');
    if (page) page.classList.add('show');
    menuItems.forEach(function (item, i) {
      setTimeout(function () {
        item.classList.add('in');
      }, i * 120);
    });
    setTimeout(function () {
      if (footer) footer.classList.add('in');
    }, menuItems.length * 120 + 200);
  }

  // If the visitor prefers reduced motion, skip the boot animation entirely
  if (reduceMotion) {
    if (boot) boot.style.display = 'none';
    revealPage();
    return;
  }

  // Boot sequence: type out each terminal line, then reveal the page
  var bootLines = [
    { el: document.getElementById('boot-line-1'), text: '> iniciando sistema...' },
    { el: document.getElementById('boot-line-2'), text: '> cargando A.C. PHONE...' },
    { el: document.getElementById('boot-line-3'), text: '> listo_' }
  ];

  var TYPE_SPEED = 28; // ms per character
  var LINE_PAUSE = 220; // pause between lines

  function typeLine(index) {
    if (index >= bootLines.length) {
      setTimeout(revealPage, 300);
      return;
    }
    var line = bootLines[index];
    if (!line.el) { typeLine(index + 1); return; }

    var chars = line.text.split('');
    var pos = 0;

    // remove the blinking cursor from the previous finished line
    bootLines.forEach(function (l, i) {
      if (i < index && l.el) l.el.classList.add('no-cursor');
    });

    var timer = setInterval(function () {
      line.el.textContent = chars.slice(0, pos + 1).join('');
      pos++;
      if (pos >= chars.length) {
        clearInterval(timer);
        setTimeout(function () { typeLine(index + 1); }, LINE_PAUSE);
      }
    }, TYPE_SPEED);
  }

  typeLine(0);

  // small tactile feedback when a menu link is tapped
  menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.add('tapped');
      setTimeout(function () { item.classList.remove('tapped'); }, 250);
    });
  });
});
