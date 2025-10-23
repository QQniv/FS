/* Делюкс-прелоадер: плавное падение капли + мягкие ряби + блики и «искры».
   Подключение: <link rel="stylesheet" href="preloader.css"> и <body class="preloading"> + контейнер #preloader.
*/
(function(){
  const root = document.getElementById('preloader');
  if(!root) return;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.remove('preloading'); root.remove(); return;
  }

  const drop = root.querySelector('.drop-3d');
  const gloss = root.querySelector('.gloss');
  const sparkles = root.querySelector('.sparkles');
  const rings = [...root.querySelectorAll('.ripples span')];

  // 1) Плавный прилёт капли
  drop.animate([
    {opacity:0, transform:'translateY(-40vh) scale(1)'},
    {opacity:1, transform:'translateY(-8vh) scale(1.03)'},
    {opacity:1, transform:'translateY(0) scale(1)'}
  ], {duration:1100, easing:'cubic-bezier(.16,1,.3,1)', fill:'forwards'});

  // 2) Блики «дышат»
  gloss.animate([
    {transform:'translateY(0)'},
    {transform:'translateY(2px)'},
    {transform:'translateY(0)'}
  ], {duration:1800, iterations:Infinity, direction:'alternate', easing:'ease-in-out'});

  // 3) Искры вспыхивают
  sparkles.animate([
    {opacity:.0}, {opacity:.85}, {opacity:.0}
  ], {duration:1600, delay:400, easing:'ease-in-out', iterations:2, fill:'forwards'});

  // 4) Ряби расходятся тремя волнами
  const ripple = (el, delay)=> el.animate([
    {opacity:0, width:'10px', height:'10px'},
    {opacity:1, offset:.12},
    {opacity:0, width:'120vmin', height:'120vmin'}
  ], {duration:1800, delay, easing:'cubic-bezier(.22,.61,.36,1)', fill:'forwards'});

  setTimeout(()=>{ rings.forEach((r,i)=>ripple(r, i*180)); }, 760);

  // 5) Мягкое проявление страницы
  document.body.animate([
    {filter:'blur(12px) opacity(0)'},
    {filter:'blur(0px) opacity(1)'}
  ], {duration:700, delay:980, easing:'cubic-bezier(.16,1,.3,1)', fill:'forwards'});

  // 6) Убираем прелоадер
  setTimeout(()=>{
    document.body.classList.remove('preloading');
    root.remove();
  }, 1800);
})();
