  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },{threshold:0.15});
    reveals.forEach(el=>io.observe(el));
  } else {
    reveals.forEach(el=>el.classList.add('is-visible'));
  }

  // Nav: sombra sutil al hacer scroll
  const nav = document.querySelector('.nav');
  if(nav){
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  // Nav: menú móvil
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if(navToggle && mobileMenu){
    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded','false');
      mobileMenu.classList.remove('is-open');
    };
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    };
    navToggle.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if(window.innerWidth > 820) closeMenu(); });
  }
