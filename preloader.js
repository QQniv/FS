/* Упрощённый прелоадер: «орб» плавно приземляется, 2 ряби расходятся, страница проявляется.
   Подключение: <link rel="stylesheet" href="preloader.css"> + <body class="preloading"> + контейнер #preloader.
   Контейнер (добавьте в каждую страницу в начале <body>):
     <div id="preloader" aria-hidden="true">
       <div class="loader-orb"></div>
       <div class="ripples"><span></span><span></span></div>
     </div>
*/
(function(){
  const root = document.getElementById('preloader');
  if(!root) return;

  // Если пользователь не любит анимации — мгновенно скрываем
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.remove('preloading'); root.remove(); return;
  }

  const orb = root.querySelector('.loader-orb');
  const rings = [...root.querySelectorAll('.ripples span')];

  // Орб: плавный прилёт
  orb.animate([
    { opacity:0, transform:'translateY(-36vh) scale(.98)' },
    { opacity:1, transform:'translateY(-8vh) scale(1.02)' },
    { opacity:1, transform:'translateY(0) scale(1)' }
  ], { duration:900, easing:'cubic-bezier(.16,1,.3,1)', fill:'forwards' });

  // Ряби: два кольца, сдвинутые по времени
  const ripple = (el, delay)=> el.animate([
    { opacity:0, transform:'translate(-50%,-50%) scale(.05)' },
    { opacity:1, offset:.12 },
    { opacity:0, transform:'translate(-50%,-50%) scale(32)' }
  ], { duration:1200, delay, easing:'cubic-bezier(.22,.61,.36,1)', fill:'forwards' });

  setTimeout(()=>{ rings.forEach((r,i)=>ripple(r, i*140)); }, 640);

  // Страница проявляется
  document.body.animate(
    [{ filter:'blur(10px) opacity(0)' }, { filter:'blur(0px) opacity(1)' }],
    { duration:550, delay:720, easing:'cubic-bezier(.16,1,.3,1)', fill:'forwards' }
  );

  // Снятие прелоадера
  setTimeout(()=>{ document.body.classList.remove('preloading'); root.remove(); }, 1500);
})();
