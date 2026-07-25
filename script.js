document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. ACTUALIZAR EL AÑO DEL FOOTER AUTOMÁTICAMENTE
     ========================================= */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================================
     2. BOTÓN COMPARTIR — copia la URL de la página al portapapeles
     ========================================= */
  const shareBtn = document.getElementById('shareBtn');
  const toast = document.getElementById('toast');
  let toastTimeout;

  shareBtn.addEventListener('click', async () => {
    // CAMBIAR: reemplazá window.location.href por una URL fija
    // si querés que el botón siempre comparta un link específico
    const urlToShare = window.location.href;

    try {
      // Usa la Web Share API nativa en navegadores móviles compatibles
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: urlToShare
        });
        return;
      }

      // Alternativa: copiar al portapapeles
      await navigator.clipboard.writeText(urlToShare);
      showToast('¡Enlace copiado! 🔗');

    } catch (err) {
      // El usuario canceló el share sheet o falló el portapapeles
      console.warn('Error al compartir/copiar:', err);
      showToast('No se pudo copiar el enlace — intentá manualmente.');
    }
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  /* =========================================
     3. EFECTO GLOW — sigue al mouse en escritorio
     ========================================= */
  const glowCursor = document.getElementById('glowCursor');
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  if (glowCursor && !isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
      // Usar transform vía requestAnimationFrame mantiene esto fluido y eficiente
      requestAnimationFrame(() => {
        glowCursor.style.left = `${e.clientX}px`;
        glowCursor.style.top = `${e.clientY}px`;
      });
    });

    // Ocultar el glow cuando el mouse sale de la ventana
    document.addEventListener('mouseleave', () => {
      glowCursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      glowCursor.style.opacity = '1';
    });
  } else if (glowCursor) {
    // Sin efecto glow en dispositivos táctiles — se oculta directamente
    glowCursor.style.display = 'none';
  }

  /* =========================================
     4. OPCIONAL: hook simple de analítica de clics
     CAMBIAR: conectá esto con tu proveedor de analítica (Plausible, GA, etc.)
     ========================================= */
  document.querySelectorAll('.link-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      console.log(`Click en link: ${btn.classList[1]}`); // ej: "link-youtube"
      // Ejemplo: gtag('event', 'link_click', { link: btn.href });
    });
  });

});
