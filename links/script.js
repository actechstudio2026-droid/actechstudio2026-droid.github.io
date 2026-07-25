// Rellena automáticamente el año actual en el pie de página
document.getElementById('year').textContent = new Date().getFullYear();

// Pequeño efecto de "presión" al tocar los botones de enlace
document.querySelectorAll('.link-btn').forEach(function (btn) {
  btn.addEventListener('pointerdown', function () {
    btn.style.transform = 'translateY(-1px) scale(0.98)';
  });
  btn.addEventListener('pointerup', function () {
    btn.style.transform = '';
  });
  btn.addEventListener('pointerleave', function () {
    btn.style.transform = '';
  });
});
