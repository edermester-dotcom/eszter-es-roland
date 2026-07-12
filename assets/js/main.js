const music=document.getElementById('bgMusic');
const entryScene=document.getElementById('entryScene');
const introScene=document.getElementById('introScene');
const chestScene=document.getElementById('chestScene');
const finalScene=document.getElementById('finalScene');
const enterButton=document.getElementById('enterButton');
const discoverButton=document.getElementById('discoverButton');
const openButton=document.getElementById('openButton');
const chestStage=document.getElementById('chestStage');
const sparkLayer=document.getElementById('sparkLayer');

let musicFadeTimer=null;
let introTimers=[];

enterButton.addEventListener("click", async () => {
  await startMusic();
  switchScene(entryScene, introScene);
  startIntro();
});

discoverButton.addEventListener('click',()=>{
  fadeMusicTo(.18,1200);
  switchScene(introScene,chestScene);

  const lines=[...document.querySelectorAll('.story-line')];
  lines.forEach((line,i)=>{
    setTimeout(()=>line.classList.add('show'),800+i*2100);
  });

  setTimeout(()=>openButton.classList.add('show'),7600);
});

openButton.addEventListener("click", () => {
  openButton.disabled = true;
  openButton.classList.remove("show");

  fadeMusicTo(0.08, 900);

  chestStage.classList.add("opening");

  setTimeout(() => {
    createSparks();
  }, 2100);

  setTimeout(() => {
    fadeMusicTo(0.28, 2400);
  }, 2500);

  setTimeout(() => {
    switchScene(chestScene, finalScene);
    fadeMusicTo(0.16, 3200);
  }, 9000);
});

async function startMusic(){
  try{
    music.volume=0;
    await music.play();
    fadeMusicTo(.28,4000);
  }catch(err){
    console.warn('A zene nem indult el:',err);
  }
}

function switchScene(from,to){
  from.classList.remove('active');
  setTimeout(()=>to.classList.add('active'),320);
}

function startIntro(){
  clearIntroTimers();
  const lines=[...document.querySelectorAll('.intro-line')];

  lines.forEach((line,index)=>{
    const at=Number(line.dataset.at||0);

    introTimers.push(setTimeout(()=>{
      lines.forEach(other=>{
        if(other!==line){
          other.classList.remove('show');
          other.classList.add('hide');
        }
      });
      line.classList.remove('hide');
      line.classList.add('show');
    },at));

    const next=index<lines.length-1?Number(lines[index+1].dataset.at):28000;
    introTimers.push(setTimeout(()=>{
      line.classList.remove('show');
      line.classList.add('hide');
    },Math.max(at+3000,next-900)));
  });

  introTimers.push(setTimeout(() => {
    discoverButton.classList.add('show');

    setTimeout(() => {
      discoverButton.classList.add('ready');
    }, 4200);

  }, 22500));
}

function clearIntroTimers(){
  introTimers.forEach(clearTimeout);
  introTimers=[];
}

function fadeMusicTo(target,duration){
  if(musicFadeTimer)clearInterval(musicFadeTimer);

  const start=music.volume;
  const steps=45;
  let step=0;
  const interval=duration/steps;

  musicFadeTimer=setInterval(()=>{
    step++;
    const p=step/steps;
    music.volume=Math.max(0,Math.min(1,start+(target-start)*p));

    if(step>=steps){
      music.volume=target;
      clearInterval(musicFadeTimer);
      musicFadeTimer=null;
    }
  },interval);
}

function createSparks(){
  sparkLayer.innerHTML='';

  for(let i=0;i<42;i++){
    const s=document.createElement('span');
    s.className='spark';
    s.style.setProperty('--s',`${1.5+Math.random()*3.8}px`);
    s.style.setProperty('--d',`${2.8+Math.random()*2.8}s`);
    s.style.setProperty('--delay',`${Math.random()*1.15}s`);
    s.style.setProperty('--x',`${-120+Math.random()*240}px`);
    s.style.setProperty('--y',`${-70-Math.random()*180}px`);
    sparkLayer.appendChild(s);
    setTimeout(()=>s.remove(),6500);
  }
}

/* Háttér aranypor */
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');
let dust=[];

function resize(){
  const dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=innerWidth*dpr;
  canvas.height=innerHeight*dpr;
  canvas.style.width=innerWidth+'px';
  canvas.style.height=innerHeight+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);

  dust=Array.from({length:Math.max(30,Math.floor(innerWidth/18))},()=>({
    x:Math.random()*innerWidth,
    y:Math.random()*innerHeight,
    r:.4+Math.random()*1.35,
    vx:-.04+Math.random()*.08,
    vy:-.10-Math.random()*.18,
    a:.06+Math.random()*.28,
    t:Math.random()*Math.PI*2
  }));
}

function draw(time=0){
  ctx.clearRect(0,0,innerWidth,innerHeight);

  const vignette=ctx.createRadialGradient(
    innerWidth*.5,innerHeight*.42,0,
    innerWidth*.5,innerHeight*.42,
    Math.max(innerWidth,innerHeight)*.72
  );
  vignette.addColorStop(0,'rgba(217,179,91,.05)');
  vignette.addColorStop(.5,'rgba(10,8,4,.02)');
  vignette.addColorStop(1,'rgba(0,0,0,.62)');
  ctx.fillStyle=vignette;
  ctx.fillRect(0,0,innerWidth,innerHeight);

  dust.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;

    if(p.y<-8){p.y=innerHeight+8;p.x=Math.random()*innerWidth}
    if(p.x<-8)p.x=innerWidth+8;
    if(p.x>innerWidth+8)p.x=-8;

    const pulse=.55+Math.sin(time*.0016+p.t)*.45;
    const a=p.a*pulse;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(243,215,124,${a})`;
    ctx.shadowBlur=7;
    ctx.shadowColor=`rgba(217,179,91,${a})`;
    ctx.fill();
    ctx.shadowBlur=0;
  });

  requestAnimationFrame(draw);
}

window.addEventListener('resize',resize);
resize();
requestAnimationFrame(draw);
