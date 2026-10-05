// Ported 1:1 from the original page script: scroll reveal, count-up, progress bar,
// magnetic buttons, back-to-top, active nav link, parallax and card tilt.
export default function initPage() {
var cleanups = [];
function addEventListener(t, f, o) { window.addEventListener(t, f, o); cleanups.push(function () { window.removeEventListener(t, f, o); }); }
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
// scroll reveal
var sel='.about h2,.about p,.ln,.exp,.about .row,.edu,.work .head,.proj,.skills h2,.tools,.exp-list div,.quote,.process h2,.step,.contact h2,.contact p,.card,.stats .wrap>div';
document.querySelectorAll(sel).forEach(function(e,i){e.classList.add('rv');e.style.setProperty('--d',(i%4)*90+'ms')});
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);(function(t){setTimeout(function(){t.style.setProperty('--d','0ms')},1400)})(x.target);var b=x.target.querySelector&&x.target.querySelector('[data-n]');if(b)count(b)}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
// count-up
function count(b){if(reduce)return;var n=+b.dataset.n,st=performance.now();(function f(now){var p=Math.min((now-st)/1200,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(st)}
// progress bar + nav shadow
var bar=document.getElementById('bar');
addEventListener('scroll',function(){var d=document.documentElement;bar.style.transform='scaleX('+(d.scrollTop/(d.scrollHeight-d.clientHeight||1))+')'},{passive:true});
// magnetic buttons
if(!reduce)document.querySelectorAll('nav .btn').forEach(function(b){
 b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.2)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});
 b.addEventListener('pointerleave',function(){b.style.transform=''})});
var tt=document.getElementById('totop');addEventListener('scroll',function(){tt.classList.toggle('show',scrollY>700)},{passive:true});tt.addEventListener('click',function(){scrollTo({top:0,behavior:reduce?'auto':'smooth'})});
// active nav link
var links=document.querySelectorAll('.links a,#mmenu .ml a');
var so=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting)links.forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+x.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('header[id],section[id]').forEach(function(e){so.observe(e)});
links.forEach(function(a){a.classList.remove('act')});

// custom parallax, tilt
var nm=document.querySelector('.name-mask');
if(nm&&!reduce){addEventListener('scroll',function(){var y=scrollY;if(y<900)nm.style.transform='translateY('+(y*.18)+'px)'},{passive:true});
document.querySelectorAll('.exp,.edu,.quote').forEach(function(c){
 c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(800px) rotateY('+(x*7)+'deg) rotateX('+(-y*7)+'deg)'});
 c.addEventListener('pointerleave',function(){c.style.transform=''})})}
return {
  io: io,
  cleanup: function () {
    io.disconnect(); so.disconnect();
    cleanups.forEach(function (f) { f(); });
  }
};
}
