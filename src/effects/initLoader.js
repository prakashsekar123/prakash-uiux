// Ported 1:1 from the original inline <script> (loader with sticker-snake canvas animation).
export default function initLoader(L, onGone) {
var cleanups = [], timers = [], raf = 0, b = document.body;
var cv=L.querySelector('canvas'),ctx=cv.getContext('2d'),b=document.body,
reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,
cols=[].slice.call(L.querySelectorAll('.col')),rolls=cols.map(function(c){return c.querySelector('.roll')});
function setNum(v){var h=Math.floor(v/100),t=Math.floor(v/10)%10,o=v%10;
 cols[0].classList.toggle('on',v>=100);
 rolls[0].style.transform='translateY(-'+h+'em)';rolls[1].style.transform='translateY(-'+t+'em)';rolls[2].style.transform='translateY(-'+o+'em)'}
setNum(0);

/* ---------- sticker sprites (original artwork, drawn with canvas paths) ---------- */
var INK='#17120e',SP=256;
function sprite(draw){var c=document.createElement('canvas');c.width=c.height=SP;var g=c.getContext('2d');g.scale(SP/200,SP/200);g.translate(100,100);g.lineJoin='round';g.lineCap='round';draw(g);return c}
function star(g,n,ro,ri){g.beginPath();for(var i=0;i<n*2;i++){var r=i%2?ri:ro,a=i*Math.PI/n-Math.PI/2;g[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}g.closePath()}
function txt(g,t,y,px,col,font){g.fillStyle=col||INK;g.font='800 '+px+'px '+(font||'Syne,Arial,sans-serif');g.textAlign='center';g.textBaseline='middle';g.fillText(t,0,y)}
function disc(g,col,r){g.beginPath();g.arc(0,0,r||88,0,7);g.fillStyle=col;g.fill()}
var OR='#ff4d00',CR='#f4f1ec',PE='#f3b89a',DK='#26221f';
var SPR=[
 sprite(function(g){disc(g,CR);g.fillStyle=INK;g.beginPath();g.ellipse(-28,-22,9,16,0,0,7);g.ellipse(28,-22,9,16,0,0,7);g.fill();g.strokeStyle=OR;g.lineWidth=10;g.beginPath();g.arc(0,8,38,.2,Math.PI-.2);g.stroke()}),
 sprite(function(g){g.beginPath();for(var i=0;i<6;i++){var a=i*Math.PI/3+Math.PI/6;g[i?'lineTo':'moveTo'](Math.cos(a)*92,Math.sin(a)*92)}g.closePath();g.fillStyle=OR;g.fill();g.strokeStyle=INK;g.lineWidth=6;g.stroke();txt(g,'UX',4,72,INK)}),
 sprite(function(g){disc(g,PE);[-1,1].forEach(function(k){g.beginPath();g.ellipse(k*30,0,26,34,0,0,7);g.fillStyle=CR;g.fill();g.strokeStyle=INK;g.lineWidth=7;g.stroke();g.beginPath();g.ellipse(k*30+6,4,11,16,0,0,7);g.fillStyle=OR;g.fill()})}),
 sprite(function(g){g.fillStyle='#fff3ec';g.beginPath();g.roundRect?g.roundRect(-84,-84,168,168,22):g.rect(-84,-84,168,168);g.fill();g.strokeStyle=OR;g.lineWidth=7;g.stroke();txt(g,'Aa',-10,86,INK);txt(g,'UI KIT',58,26,OR,'"Space Mono",monospace')}),
 sprite(function(g){star(g,18,96,80);g.fillStyle=OR;g.fill();disc(g,CR,60);g.strokeStyle=INK;g.lineWidth=6;g.beginPath();g.arc(0,0,60,0,7);g.stroke();txt(g,'AI',4,64,INK)}),
 sprite(function(g){g.beginPath();for(var i=0;i<28;i++){var a=i/28*Math.PI*2,r=88+(i%2?-5:5);g[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fillStyle='#b3aea6';g.fill();g.strokeStyle=INK;g.lineWidth=5;g.stroke();txt(g,'Hi!',2,74,INK)}),
 sprite(function(g){g.fillStyle='#c23a00';for(var i=0;i<8;i++){var a=i*Math.PI/4;g.beginPath();g.arc(Math.cos(a)*50,Math.sin(a)*50,38,0,7);g.fill()}g.beginPath();g.arc(0,0,34,0,7);g.fillStyle=PE;g.fill()}),
 sprite(function(g){star(g,12,98,70);g.fillStyle=PE;g.fill();g.strokeStyle=INK;g.lineWidth=6;g.stroke();txt(g,'NEW',2,44,INK)}),
 sprite(function(g){disc(g,DK);g.strokeStyle=OR;g.lineWidth=7;g.beginPath();g.arc(0,0,80,0,7);g.stroke();g.fillStyle=OR;g.beginPath();g.moveTo(0,46);g.bezierCurveTo(-72,0,-46,-52,0,-22);g.bezierCurveTo(46,-52,72,0,0,46);g.fill()}),
 sprite(function(g){disc(g,OR);g.strokeStyle=CR;g.lineWidth=6;g.beginPath();g.arc(0,0,72,0,7);g.stroke();txt(g,'P.S',3,64,CR)})
];
var N=SPR.length,pts=[],W=0,H=0,dpr=1,sz=80,gap=34;
function size(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;sz=Math.max(62,Math.min(92,W*.07));gap=sz*.46}
size();addEventListener('resize',size);cleanups.push(function(){removeEventListener('resize',size)});
for(var i=0;i<N;i++)pts.push({x:W/2,y:H/2,r:0});

var tx=W/2,ty=H/2,lastMove=-1e9,t0=performance.now(),loaded=false,finished=false,exitAt=0,last=t0,shown=0,MIN=1900;
L.addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;lastMove=performance.now()});
function onLoad(){loaded=true}addEventListener('load',onLoad);cleanups.push(function(){removeEventListener('load',onLoad)});timers.push(setTimeout(function(){loaded=true},5000));
function ease(x){return 1-Math.pow(1-Math.min(Math.max(x,0),1),3)}
function back(x){x=Math.min(Math.max(x,0),1);var c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)}
function done(){if(finished)return;finished=true;L.classList.add('done');b.classList.remove('loading');setTimeout(onGone,1000)}

function frame(now){
 var dt=Math.min((now-last)/1000,.05);last=now;var t=(now-t0)/1000;
 /* progress: counts to 100, capped at 99 until the page has really loaded */
 shown=Math.max(shown,Math.min((now-t0)/MIN,loaded?1:.99));
 setNum(Math.min(100,Math.floor(shown*100+(shown>=1?1:0))));
 if(shown>=1&&!exitAt)exitAt=now+300;
 /* head target: follow the pointer, otherwise drift on an automatic path */
 if(now-lastMove>1400){tx=W*(.5+Math.sin(t*.9)*.36+Math.sin(t*2.1)*.07);ty=H*(.46+Math.sin(t*1.25+1)*.27)}
 var h=pts[0];h.x+=(tx-h.x)*(1-Math.exp(-dt*7));h.y+=(ty-h.y)*(1-Math.exp(-dt*7));
 for(var i=1;i<N;i++){var p=pts[i],q=pts[i-1],dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy)||1;
  if(d>gap){var k=1-Math.exp(-dt*22);p.x+=(q.x-dx/d*gap-p.x)*k;p.y+=(q.y-dy/d*gap-p.y)*k}
  p.r=Math.atan2(dy,dx)*.3+(i%2?.35:-.35)+Math.sin(t*1.6+i)*.18}
 h.r=Math.sin(t*1.4)*.25;
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
 for(var j=N-1;j>=0;j--){var s=pts[j],
  intro=back((t*1000-j*70)/520),
  outro=exitAt&&now>exitAt?1-ease((now-exitAt-j*40)/420):1,
  sc=intro*outro*(1-j*.018);
  if(sc<=.01)continue;
  var px=sz*sc;ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.r);ctx.drawImage(SPR[j],-px/2,-px/2,px,px);ctx.restore()}
 if(exitAt&&now>exitAt+N*40+430){done();return}
 raf=requestAnimationFrame(frame)}

if(reduce){shown=1;setNum(100);timers.push(setTimeout(function(){loaded=true;done()},400))}else raf=requestAnimationFrame(frame);
return function () {
  cancelAnimationFrame(raf);
  timers.forEach(clearTimeout);
  cleanups.forEach(function (f) { f(); });
};
}
