'use strict';
(()=>{
const W=180,H=320,$=id=>document.getElementById(id),cv=$('cv'),ctx=cv.getContext('2d'),G=$('game');
cv.width=W;cv.height=H;ctx.imageSmoothingEnabled=false;

/* ===== CONFIGURACIÓN DE PERSONAJES (edita colores aquí) ===== */
const CFG={
 mariam:{hair:'#ffd75e',hair2:'#e8b830',skin:'#ffdcc4',dress:'#ffb8d8',bow:'#ff5fa8',nail:'#ff4fa0'},
 mariana:{hair:'#17121f',skin:'#ead7dc',cloth:'#1b1624',apron:'#2e2340',acc:'#c4c4d6',lip:'#7a2a66',shadow:'#6b3fa0'},
 simon:{hair:'#241a14',skin:'#f0c29c',shirt:'#121212',pants:'#394aa0',shoes:'#f2f2f2'}
};

/* ===== utilidades ===== */
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),rnd=(a,b)=>a+Math.random()*(b-a);
function px(x,y,w,h,c){const a=Math.round(x),b=Math.round(y);ctx.fillStyle=c;ctx.fillRect(a,b,Math.round(x+w)-a,Math.round(y+h)-b)}
function txt(s,x,y,c='#fff',z=8,al='center'){ctx.font='bold '+z+'px monospace';ctx.textAlign=al;ctx.textBaseline='top';ctx.fillStyle='#3a1a5a';ctx.fillText(s,x+1,y+1);ctx.fillStyle=c;ctx.fillText(s,x,y)}
function spr(rows,x,y,u,pal){rows.forEach((r,i)=>{for(let j=0;j<r.length;j++)if(r[j]!=='.')px(x+j*u,y+i*u,u,u,pal[r[j]])})}
function bg(a,b){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,a);g.addColorStop(1,b);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
function sparks(){for(let i=0;i<16;i++)if(Math.sin(S.t*3+i*1.7)>0){const x=(i*53)%W,y=(i*97)%250;px(x,y-2,1,5,'#fff');px(x-2,y,5,1,'#fff')}}
const mk=(x,y,u)=>{const P=(a,b,w,h,k)=>px(x+a*u,y+b*u,w*u,h*u,k);return[P,(a,b,w,h,k)=>{P(a,b,w,h,k);P(-a-w,b,w,h,k)}]};

/* ===== sprites de personajes ===== */
function mariam(x,y,u,m){const c=CFG.mariam,K='#2a2030',R='#d6455d',[P,S2]=mk(x,y,u);
 P(-8,2,16,15,c.hair2);P(-7,0,14,4,c.hair);P(-1,12,2,2,c.skin);
 P(-5,13,10,9,c.dress);P(-5,21,10,1,'#fff');S2(-7,13,2,7,c.skin);S2(-7,20,2,1,c.nail);
 S2(-3,22,2,5,c.skin);S2(-4,27,3,1,'#fff');
 P(-5,4,10,8,c.skin);P(-6,3,12,2,c.hair);S2(-6,3,2,7,c.hair);P(3,0,5,3,c.bow);P(5,1,1,1,'#fff');S2(-5,9,2,1,'#ff9ab8');
 if(m==='surprise'){S2(-3,6,2,3,'#fff');S2(-2,7,1,2,K);P(-1,10,2,2,'#c0395a')}
 else if(m==='sad'){S2(-3,7,2,2,K);P(-3,9,1,2,'#7fd4ff');P(-2,10,4,1,R);S2(-3,11,1,1,R)}
 else if(m==='focus'){S2(-3,7,2,1,K);S2(-3,6,2,1,'#b8902a');P(-1,10,2,1,R)}
 else{S2(-3,6,2,1,K);P(-2,10,4,1,R);S2(-3,9,1,1,R)}}
function mariana(x,y,u,m){const c=CFG.mariana,K='#0b0810',[P,S2]=mk(x,y,u);
 P(-8,2,16,17,c.hair);P(-7,0,14,4,c.hair);
 P(-5,13,10,12,c.cloth);S2(-7,13,2,7,c.cloth);S2(-7,20,2,1,c.skin);P(-3,14,6,10,c.apron);P(-1,18,2,2,c.acc);
 S2(-3,25,2,3,c.skin);S2(-4,28,3,1,c.cloth);P(-2,12,4,1,c.acc);
 P(-5,4,10,8,c.skin);P(-6,3,8,3,c.hair);S2(-6,3,1,9,c.hair);S2(-3,6,2,1,c.shadow);S2(-3,7,2,1,K);S2(-6,8,1,2,c.acc);
 if(m==='confused'){P(-3,5,2,1,K);P(1,6,2,1,K);P(-1,10,2,1,K);P(6,5,1,2,'#7fd4ff')}else P(-1,10,2,1,c.lip)}
function simon(x,y,u,m){const c=CFG.simon,K='#222',[P,S2]=mk(x,y,u);
 S2(-6,26,5,5,c.pants);S2(-7,31,6,2,c.shoes);P(-6,20,12,6,c.pants);
 P(-9,10,18,5,c.shirt);P(-7,15,14,5,c.shirt);P(0,11,1,4,'#333');
 if(m==='flex'){S2(-14,3,4,9,c.skin);S2(-14,9,6,4,c.skin);S2(-12,7,4,3,c.skin)}
 else if(m==='phone'){P(-14,10,5,9,c.skin);P(-16,12,2,4,c.skin);P(-13,19,4,3,c.skin);
  P(10,3,4,9,c.skin);P(8,9,6,4,c.skin);P(9,7,4,3,c.skin);P(11,-3,4,7,'#111');P(12,-2,2,5,'#8ee6ff')}
 else{S2(-14,10,5,9,c.skin);S2(-16,12,2,4,c.skin);S2(-13,19,4,3,c.skin)}
 P(-2,8,4,2,c.skin);P(-4,0,8,8,c.skin);P(-4,0,8,3,c.hair);
 if(m==='flex'){S2(-2,4,2,2,'#fff');S2(-2,5,1,1,K);P(-1,7,2,2,'#8a5a44');P(5,1,1,2,'#7fd4ff')}
 else{S2(-3,4,2,1,K);S2(-2,5,1,1,K);P(-2,7,4,1,'#8a5a44')}}
function hands(cx,cy,u,cols){const sk=CFG.mariam.skin;for(let h=0;h<2;h++){const x0=cx+(h?2:-12)*u;
 px(x0,cy,10*u,7*u,sk);px(x0+(h?10:-2)*u,cy+u,2.5*u,4*u,sk);
 for(let i=0;i<4;i++){const fx=x0+i*2.6*u;px(fx,cy-6*u,2.2*u,6*u,sk);px(fx,cy-6*u,2.2*u,2.6*u,cols[h*4+i])}}}
function tiktok(x,y,s){x+=Math.sin(S.t*20)*.4;
 px(x-8.5*s,y+.5*s,16*s,18*s,'#25f4ee');px(x-7.5*s,y-.5*s,16*s,18*s,'#fe2c55');px(x-8*s,y,16*s,18*s,'#111');
 px(x-5*s,y+4*s,3*s,3*s,'#fff');px(x+2*s,y+4*s,3*s,3*s,'#fff');px(x-4*s,y+5*s,2*s,2*s,'#fe2c55');px(x+3*s,y+5*s,2*s,2*s,'#fe2c55');
 px(x-6*s,y+2*s,5*s,s,'#fe2c55');px(x+s,y+2*s,5*s,s,'#fe2c55');px(x-4*s,y+11*s,8*s,3*s,'#fe2c55');px(x-3*s,y+11*s,6*s,s,'#fff')}

/* ===== diseños de uñas (7 buenos/malos) ===== */
const DES=[
 {r:['...y...','...y...','yyyyyyy','.yyyyy.','..yyy..','.yy.yy.','.y...y.'],p:{y:'#ffcf2e'}},
 {r:['.rr.rr.','rrrrrrr','rrrrrrr','.rrrrr.','..rrr..','...r...'],p:{r:'#ff4f8f'}},
 {r:['..ppp..','.ppppp.','pppyppp','.ppppp.','..ppp..','...g...','..gg...'],p:{p:'#ff8fc7',y:'#ffe066',g:'#58c46a'}},
 {r:['.yyyyy.','yyyyyyy','yykykyy','yyyyyyy','ykyyyky','yykkkyy','.yyyyy.'],p:{y:'#ffe066',k:'#3a2a2a'}},
 {r:['bpbpbpb','pybybyp','bpbpbpb','pybybyp','bpbpbpb'],p:{b:'#8fd3ff',p:'#ff9ccc',y:'#ffe066'}},
 {r:['.n.nn..','nnnngnn','.nggnn.','nnnnnnn','.nnngn.','..nn.n.'],p:{n:'#6b4a2b',g:'#7a8b2a'}},
 {r:['x.....x','.x...x.','..x.x..','...x...','..x.x..','.x...x.','x.....x'],p:{x:'#444'}},
 {r:['.wwwww.','wwwwwww','wkwwwkw','wwwwwww','.wwkww.','.w.w.w.'],p:{w:'#ddd',k:'#222'}}
];
const HEART=['.r.r.','rrrrr','rrrrr','.rrr.','..r..'];
const NAILS=['#ff6fae','#b48cff','#ff9ccc','#ffd1e8','#ffd1e8','#ff9ccc','#b48cff','#ff6fae'];
const PINK=['#ff6fae','#ffd1e8','#b48cff','#fff','#ffe066'];

/* ===== estado ===== */
const S={scene:'menu',lv:1,lives:3,score:0,base:0,t:0,mood:'happy',moodT:0,shake:0};
let L={},parts=[],floats=[],flash=0,snd=true,AC=null;
const LV={};
const INTRO=[
 ['Nivel 1','El ataque del TikTok','Toca los diseños de uñas BONITOS (5 en total). No toques los feos ni dejes escapar los buenos.'],
 ['Nivel 2','Operación salvar las uñas','Mantén el dedo dentro de la zona verde mientras se mueve. Si te sales, sube el RIESGO. Llena la barra de manicura.'],
 ['Nivel 3','La foto perfecta','Mueve el marco con el dedo y mete las uñas en el rectángulo dorado. Con la precisión llena, pulsa CAPTURAR. ¡Espanta al TikTok!']];
const LOSE=['¡El TikTok ganó esta ronda!','¡Las uñas casi quedan abstractas!'];

/* ===== sonido (opcional) ===== */
function beep(f,d=.1,t='square',v=.05,f2){if(!snd)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
 const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(f2)o.frequency.linearRampToValueAtTime(f2,n+d);
 g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+d)}catch(e){}}
const winSnd=()=>[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.15,'square',.05),i*110));

/* ===== efectos ===== */
function burst(x,y,n,cols,sp=70){for(let i=0;i<n;i++){const a=rnd(0,6.283),s=rnd(.3,1)*sp;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-25,l:rnd(.5,1),c:cols[i%cols.length],z:rnd(1.5,3.5)})}}
const say=(s,x,y,c)=>floats.push({s,x,y,l:1,c:c||'#fff'});
function hurt(msg,x,y){S.lives--;S.mood='sad';S.moodT=1;S.shake=.25;beep(150,.25,'sawtooth',.07,70);say(msg,x,y,'#ff9ab8');burst(x,y,10,['#ff3b7f','#333']);
 if(S.lives<=0){L.done=1;S.scene='lose';$('lm').textContent=LOSE[S.lv-1];show('lose')}}
function finish(){L.done=1;L.timer=1.7;S.mood='happy';S.moodT=3;winSnd()}

/* ===== pantallas HTML ===== */
function show(id){document.querySelectorAll('.screen').forEach(e=>e.classList.toggle('on',e.id===id));$('cap').style.display='none'}
function intro(n){S.lv=n;S.scene='intro';S.base=S.score;const d=INTRO[n-1];$('iN').textContent=d[0].toUpperCase();$('iT').textContent=d[1];$('iD').textContent=d[2];$('iS').textContent='Puntos: '+S.score;show('intro')}
function begin(){S.score=S.base;S.lives=3;S.mood='happy';S.moodT=0;parts=[];floats=[];flash=0;L=LV[S.lv].init();S.scene='play';show(null);
 if(S.lv===3){$('cap').style.display='block';$('cap').disabled=true}}
$('play').onclick=()=>{S.score=0;intro(1)};
$('howBtn').onclick=()=>show('how');$('howBack').onclick=()=>{S.scene='menu';show('menu')};
$('iGo').onclick=begin;$('retry').onclick=begin;$('toMenu').onclick=()=>{S.scene='menu';show('menu')};
$('again').onclick=()=>{S.score=0;intro(1)};
$('snd').onclick=()=>{snd=!snd;$('snd').textContent=snd?'🔊':'🔇';beep(700,.08)};
$('cap').onclick=()=>{if(S.scene!=='play'||S.lv!==3||!L.ready)return;S.score+=200;flash=1;beep(1800,.05);setTimeout(()=>beep(900,.12),70);setTimeout(winSnd,350);
 S.scene='final';S.mood='happy';$('fs').textContent=S.score;$('fr').textContent=S.score<900?'Aprendiz de manicura':S.score<1250?'Experta en uñas':'Leyenda del Nail Quest';show('final')};

/* ===== NIVEL 1: El ataque del TikTok ===== */
LV[1]={init:()=>({hits:0,cards:[],sp:.8,bx:90,bt:0,dead:0}),
 update(dt){if(L.done)return;L.bt+=dt;L.bx=90+Math.sin(L.bt*1.1)*42;L.sp-=dt;
  if(L.sp<=0){L.sp=rnd(.65,1);const g=Math.random()<.62;L.cards.push({x:cl(L.bx-14+rnd(-18,18),4,148),y:78,vx:rnd(-22,22),vy:rnd(48,66),id:g?Math.floor(rnd(0,5)):5+Math.floor(rnd(0,3)),g})}
  for(const c of L.cards.slice()){c.y+=c.vy*dt;c.x+=c.vx*dt;if(c.x<4||c.x>148)c.vx*=-1;
   if(c.y>232){L.cards.splice(L.cards.indexOf(c),1);if(c.g){hurt('¡Se escapó!',c.x+14,200);if(S.scene!=='play')return}}}},
 down(p){for(let i=L.cards.length-1;i>=0;i--){const c=L.cards[i];
  if(p.x>c.x-6&&p.x<c.x+34&&p.y>c.y-6&&p.y<c.y+34){L.cards.splice(i,1);
   if(c.g){S.score+=100;L.hits++;S.mood='happy';S.moodT=.8;beep(550+L.hits*110,.12);burst(c.x+14,c.y+14,12,PINK);say('+100',c.x+14,c.y,'#ffe066');
    if(L.hits>=5){L.dead=1;burst(L.bx,50,70,['#25f4ee','#fe2c55','#fff','#111'],110);S.score+=S.lives*50;finish()}}
   else hurt('¡Feo!',c.x+14,c.y);
   return}}},
 draw(){bg('#ffd9ef','#d9c2ff');sparks();if(!L.dead)tiktok(L.bx,18,3.5);
  for(const c of L.cards){px(c.x,c.y,28,28,'#fff');['#ff8fc7'].forEach(k=>{px(c.x,c.y,28,2,k);px(c.x,c.y+26,28,2,k);px(c.x,c.y,2,28,k);px(c.x+26,c.y,2,28,k)});
   const d=DES[c.id];spr(d.r,c.x+3.5,c.y+3.5,3,d.p)}
  mariam(90,226,2,S.moodT>0?S.mood:'focus');px(0,274,W,46,'#f7c6e2');px(0,274,W,3,'#fff');px(0,290,W,2,'#eaa8d0');
  txt('BONITOS '+L.hits+'/5',90,298,'#fff',9)}};

/* ===== NIVEL 2: Operación salvar las uñas ===== */
const A2={x:14,y:178,w:152,h:100};
LV[2]={init:()=>({zt:0,zx:90,zy:228,risk:0,prog:0,cx:90,cy:228,msg:'¡Máxima concentración!'}),
 update(dt){if(L.done)return;L.zt+=dt*(1+L.prog*.6);L.zx=90+Math.sin(L.zt*.9)*46;L.zy=228+Math.sin(L.zt*1.4+1)*26;
  L.in=Math.abs(L.cx-L.zx)<=19&&Math.abs(L.cy-L.zy)<=19;
  if(L.in){L.prog+=dt*.11;L.risk-=dt*.5}else L.risk+=dt*.45;
  L.risk=cl(L.risk,0,1);L.msg=L.risk>.7?'Supervisor nervioso detectado':L.prog>.85?'¡Uñas a salvo!':'¡Máxima concentración!';
  if(L.risk>=1){L.risk=0;hurt('¡Ay, la uña!',90,120);return}
  if(L.prog>=1){L.prog=1;S.score+=300+S.lives*50;finish()}},
 move(p){L.cx=cl(p.x,A2.x+3,A2.x+A2.w-3);L.cy=cl(p.y,A2.y+3,A2.y+A2.h-3)},
 draw(){bg('#ead5ff','#ffd3ec');for(let x=0;x<W;x+=24)px(x,0,12,140,'rgba(255,255,255,.2)');
  px(0,140,W,40,'#f3e3ff');for(let j=0;j<5;j++)for(let i=0;i<16;i++)if((i+j)%2)px(i*12,140+j*7,12,7,'#d7bdf0');
  const r=L.risk,hi=r>.7;
  mariam(90,80,1.5,r>.5?'surprise':L.prog>.85?'happy':'focus');
  mariana(30,100,1.5,hi?'confused':'work');const tx=66+Math.sin(S.t*7)*2;px(42,122,tx-42,2,'#555');px(tx,121,3,4,'#ff4fa0');
  simon(152+(hi?Math.sin(S.t*30):0),94,1.3,hi?'flex':'serious');
  px(48,128,84,22,'#fff');px(48,128,84,3,'#ff9ccc');
  px(60,18,60,6,'#7a4fd0');px(66,24,48,6,'#a77cf0');
  ctx.globalAlpha=.22+.08*Math.sin(S.t*6);ctx.fillStyle='#d9b8ff';ctx.beginPath();ctx.moveTo(68,30);ctx.lineTo(112,30);ctx.lineTo(124,128);ctx.lineTo(56,128);ctx.fill();ctx.globalAlpha=1;
  hands(90,124,1.6,NAILS.map((c,i)=>L.prog>=(i+1)/8?c:'#f0c9b4'));
  txt(L.msg,90,154,hi?'#ff9ab8':'#fff',8);
  px(A2.x-1,A2.y-1,A2.w+2,A2.h+2,'#fff');px(A2.x,A2.y,A2.w,A2.h,'#4a2a7a');
  for(let x=19;x<A2.w;x+=19)px(A2.x+x,A2.y,1,A2.h,'#5a3a8a');for(let y=20;y<A2.h;y+=20)px(A2.x,A2.y+y,A2.w,1,'#5a3a8a');
  ctx.globalAlpha=.35+.1*Math.sin(S.t*8);px(L.zx-19,L.zy-19,38,38,'#7dffb0');ctx.globalAlpha=1;
  [[0,0,38,2],[0,36,38,2],[0,0,2,38],[36,0,2,38]].forEach(q=>px(L.zx-19+q[0],L.zy-19+q[1],q[2],q[3],'#7dffb0'));
  px(L.cx-4,L.cy-4,8,8,'#fff');px(L.cx-3,L.cy-3,6,6,L.in?'#ff6fae':'#ff3b3b');
  txt('MANI',4,286,'#fff',7,'left');px(46,286,120,8,'#fff');px(47,287,118*L.prog,6,'#ff6fae');
  txt('RIESGO',4,298,'#fff',7,'left');px(46,299,120,8,'#fff');px(47,300,118*r,6,hi?'#ff3b3b':'#ffb03b')}};
LV[2].down=LV[2].move;

/* ===== NIVEL 3: La foto perfecta ===== */
LV[3]={init:()=>({fx:90,fy:110,hx:90,hy:130,p:0,ready:0,tik:null,tikT:3,hint:'Sigue las uñas con el marco'}),
 update(dt){L.hx=90+Math.sin(S.t*.8)*34;L.hy=130+Math.sin(S.t*1.15)*18;
  const nx=L.hx,ny=L.hy-14.5,dx=Math.abs(L.fx-nx),dy=Math.abs(L.fy-ny);L.good=dx<=14&&dy<=9;
  L.tikT-=dt;if(!L.tik&&L.tikT<=0)L.tik={x:-20,y:rnd(60,160)};
  if(L.tik){L.tik.x+=40*dt;if(L.tik.x>200){L.tik=null;L.tikT=4}}
  L.block=L.tik&&Math.hypot(L.tik.x-L.fx,L.tik.y-L.fy)<45;
  if(L.good&&!L.block)L.p+=dt*.5;else L.p-=dt*.4;L.p=cl(L.p,0,1);
  if(L.p>=1&&!L.ready){L.ready=1;$('cap').disabled=false;beep(988,.12)}
  L.hint=L.ready?'¡Listo! Pulsa CAPTURAR':L.block?'¡Fuera, TikTok! (tócalo)':L.good?'¡Mantén el encuadre!':'Sigue las uñas con el marco'},
 move(p){L.fx=cl(p.x,32,148);L.fy=cl(p.y,28,185)},
 down(p){const k=L.tik;if(k&&Math.abs(p.x-k.x)<20&&p.y>k.y-4&&p.y<k.y+40){burst(k.x,k.y+16,16,['#25f4ee','#fe2c55','#fff']);S.score+=50;say('+50',k.x,k.y,'#ffe066');beep(300,.15,'square',.05,600);L.tik=null;L.tikT=5}else this.move(p)},
 draw(){bg('#e3ccff','#ffcfe8');sparks();hands(L.hx,L.hy,3,NAILS);
  if(Math.sin(S.t*8)>0){px(L.hx-20,L.hy-17,1,5,'#fff');px(L.hx-22,L.hy-15,5,1,'#fff')}
  if(L.tik)tiktok(L.tik.x,L.tik.y,2);
  const l=L.fx-32,t=L.fy-23,c=L.good?'#7dffb0':'#fff';ctx.fillStyle='rgba(40,10,80,.28)';
  ctx.fillRect(0,0,W,t);ctx.fillRect(0,t+46,W,252-t-46);ctx.fillRect(0,t,l,46);ctx.fillRect(l+64,t,W-l-64,46);
  px(l,t,10,2,c);px(l,t,2,10,c);px(l+54,t,10,2,c);px(l+62,t,2,10,c);px(l,t+44,10,2,c);px(l,t+36,2,10,c);px(l+54,t+44,10,2,c);px(l+62,t+36,2,10,c);
  [[-14,-9,28,1],[-14,8,28,1],[-14,-9,1,18],[13,-9,1,18]].forEach(q=>px(L.fx+q[0],L.fy+q[1],q[2],q[3],'#ffe066'));
  simon(34,216,1.3,'phone');mariam(146,224,1.3,'happy');
  txt(L.hint,90,252,'#fff',8);txt('PRECISIÓN',4,266,'#fff',7,'left');px(56,266,120,8,'#fff');px(57,267,118*L.p,6,L.ready?'#7dffb0':'#ff6fae')}};
LV[3].move=LV[3].move.bind(LV[3]);

/* ===== pantalla final y menú ===== */
function drawFinal(){bg('#ffd9ef','#c9b2ff');sparks();px(14,50,152,128,'#ff6fae');px(18,54,144,120,'#fff');
 px(24,60,132,88,'#d9c2ff');px(24,60,132,44,'#ffd9ef');hands(90,118,3.2,NAILS);
 if(Math.sin(S.t*8)>0){px(60,92,1,5,'#fff');px(58,94,5,1,'#fff');px(122,100,1,5,'#fff');px(120,102,5,1,'#fff')}
 txt('NAIL QUEST ★',90,154,'#c0408f',9);
 const b=i=>-Math.abs(Math.sin(S.t*5+i))*6;
 mariam(42,196+b(0),1.3,'happy');mariana(90,194+b(1),1.3,'work');simon(138,192+b(2),1.3,'flex')}
function drawMenu(){bg('#ffd9ef','#c9b2ff');sparks();
 if(S.scene==='lose'){mariam(90,222,2.6,'sad');return}
 const b=i=>-Math.abs(Math.sin(S.t*2.5+i))*3;
 mariam(40,236+b(0),1.6,'happy');mariana(90,234+b(1),1.6,'work');simon(140,230+b(2),1.3,'flex')}

/* ===== bucle principal (un único requestAnimationFrame) ===== */
function step(dt){S.t+=dt;if(S.moodT>0)S.moodT-=dt;if(S.shake>0)S.shake-=dt;if(flash>0)flash-=dt*2;
 parts=parts.filter(p=>(p.l-=dt)>0&&(p.x+=p.vx*dt,p.y+=p.vy*dt,p.vy+=140*dt,true));
 floats=floats.filter(f=>(f.l-=dt)>0&&(f.y-=18*dt,true));
 if(S.scene==='play'){LV[S.lv].update(dt);
  if(S.scene==='play'&&L.done&&L.timer>0){L.timer-=dt;if(L.timer<=0){L.timer=0;intro(S.lv+1)}}}
 if(S.scene==='final'&&Math.random()<.3)burst(rnd(0,W),0,3,PINK,30)}
function render(){ctx.save();if(S.shake>0)ctx.translate(Math.round(rnd(-2,2)),Math.round(rnd(-2,2)));
 if(S.scene==='play'||(S.scene==='lose'&&false))LV[S.lv].draw();else if(S.scene==='final')drawFinal();else drawMenu();
 for(const p of parts)px(p.x,p.y,p.z,p.z,p.c);
 for(const f of floats)txt(f.s,f.x,f.y,f.c,8);
 ctx.restore();
 if(S.scene==='play'){
  if(S.lv<3)for(let i=0;i<3;i++)spr(HEART,5+i*13,4,2,{r:i<S.lives?'#ff3b7f':'#8a6a9a'});
  txt('PTS '+S.score,S.lv<3?96:60,5,'#fff',9);
  if(L.done&&S.lv<3){px(0,140,W,30,'rgba(90,40,140,.85)');txt('¡NIVEL SUPERADO!',90,148,'#ffe066',12)}}
 if(flash>0){ctx.fillStyle='rgba(255,255,255,'+Math.min(1,flash)+')';ctx.fillRect(0,0,W,H)}}
let last=0;
function frame(ts){requestAnimationFrame(frame);const dt=Math.min(.05,Math.max(0,(ts-last)/1000));last=ts;step(dt);render()}
requestAnimationFrame(frame);

/* ===== entrada táctil (Pointer Events) y tamaño ===== */
const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}};
cv.addEventListener('pointerdown',e=>{e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(_){}
 if(S.scene==='play'&&!L.done&&LV[S.lv].down)LV[S.lv].down(pos(e))});
cv.addEventListener('pointermove',e=>{if(S.scene==='play'&&!L.done&&LV[S.lv].move)LV[S.lv].move(pos(e))});
document.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
document.addEventListener('gesturestart',e=>e.preventDefault());
document.addEventListener('contextmenu',e=>e.preventDefault());
function fit(){G.style.setProperty('--u',Math.min(innerWidth/W,innerHeight/H)+'px')}
addEventListener('resize',fit);addEventListener('orientationchange',fit);if(window.visualViewport)visualViewport.addEventListener('resize',fit);fit();
})();
