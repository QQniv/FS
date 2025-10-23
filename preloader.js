/* Прелоадер «капля → рябь → проявление контента»
   Использование: <body class="preloading"> + <div id="preloader">...</div>
   Скрипт автоматически запустит анимацию и удалит прелоадер.
*/
(function(){
  const root = document.getElementById('preloader');
  if(!root) return;

  // Если пользователь не любит анимации — выходим
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.remove('preloading');
    root.remove();
    return;
  }

  const drop = root.querySelector('.drop');
  const ripples = [...root.querySelectorAll('.ripple')];

  // 1) «Появление» капли
  drop.animate([
    {opacity:0, transform:'translateY(-40vh) scale(1)'},
    {opacity:1, transform:'translateY(-10vh) scale(1.02)'},
    {opacity:1, transform:'translateY(0) scale(1)'}
  ], {duration:900, easing:'cubic-bezier(.16,1,.3,1)', fill:'forwards'});

  // 2) Удар капли и рябь
  const splash = ()=> {
    ripples.forEach((el, i)=>{
      el.animate([
        {opacity:0, width:'10px', height:'10px'},
        {opacity:1, offset:.15},
        {opacity:0, width:'120vmin', height:'120vmin'}
      ], {duration:1400 + i*250, delay: i*120, easing:'cubic-bezier(.22,.61,.36,1)', fill:'forwards'});
    });
  };

  // 3) Раскрытие страницы (blur → чётко)
  const reveal = ()=>{
    document.documentElement.style.setProperty('--reveal-blur','12px');
    document.body.animate([
      {filter:'blur(12px) opacity(0.0)'},
      {filter:'blur(0px) opacity(1)'}
    ], {duration:600, easing:'cubic-bezier(.16,1,.3,1)', fill:'forwards'});
  };

  // Последовательность
  setTimeout(splash, 820);
  setTimeout(()=>{
    reveal();
    // убрать прелоадер и класс
    setTimeout(()=>{
      document.body.classList.remove('preloading');
      root.remove();
    }, 650);
  }, 1100);
})();
