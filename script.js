// Mobile menu toggle & close on link click
const mobileMenuBtn = document.getElementById('mobileMenuBtn'),
      navMenu = document.getElementById('navMenu'),
      scrollTopBtn = document.getElementById('scrollTop');
mobileMenuBtn.onclick = () => navMenu.classList.toggle('active');
navMenu.querySelectorAll('a').forEach(a => a.onclick = () => navMenu.classList.remove('active'));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.onclick = e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior: 'smooth'});
  };
});

// Navbar background on scroll + scrollTop btn visibility
window.onscroll = () => {
  document.querySelector('nav').style.background = window.scrollY > 100 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)';
  scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
};

// Floating particles
function createParticle(){
  const p = document.createElement('div');
  p.className = 'particle';
  Object.assign(p.style, {
    left: Math.random()*100+'%',
    width: (Math.random()*10+5)+'px',
    height: (Math.random()*10+5)+'px',
    animationDuration: (Math.random()*10+10)+'s',
    animationDelay: Math.random()*10+'s'
  });
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 25000);
}
for(let i=0;i<5;i++) setTimeout(createParticle,i*200);
setInterval(createParticle,300);

// Scroll-trigger animations for sections
const obs = new IntersectionObserver(es => es.forEach(e=>{
  if(e.isIntersecting) Object.assign(e.target.style,{opacity:1,transform:'translateY(0)'});
}),{threshold:0.1,rootMargin:'0px 0px -50px'});
document.querySelectorAll('.section').forEach(s=>{
  Object.assign(s.style,{opacity:0,transform:'translateY(50px)',transition:'all 0.8s ease'});
  obs.observe(s);
});

// Problems section counters & progress bars
(() => {
  const sec = document.getElementById('problems');
  if(!sec) return;
  let done = false;
  const countUp = (el,target,dur=1200) => {
    const startTime = performance.now();
    const step = now => {
      const p = Math.min((now - startTime)/dur,1);
      el.textContent = Math.floor(p*target);
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting && !done){
      done = true;
      const total = +sec.querySelector('.total-count').dataset.target || 0;
      countUp(sec.querySelector('.total-count'), total, 1400);
      sec.querySelectorAll('.platform-card').forEach(c=>{
        const count = +c.dataset.count || 0, pct = total ? Math.round(count/total*100) : 0;
        setTimeout(()=> c.querySelector('.platform-bar-fill').style.width = pct+'%',150);
        countUp(c.querySelector('.platform-count'), count, 1000);
      });
    }
  }),{threshold:0.25}).observe(sec);
})();
