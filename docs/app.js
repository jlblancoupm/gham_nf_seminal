const citations={
  plain:`F. Marcos-Macías, M.P. Daza-Llín, J. Gutiérrez, M. Cámara, and J.L. Blanco, “Homotopy-Driven Training of Normalizing Flows for Acoustic Inverse Problems,” TECNIACÚSTICA 2026, Granada, Spain, 2026.`,
  bibtex:`@inproceedings{marcosmacias2026homotopy,
  author    = {Marcos-Mac{\'i}as, Fernando and Daza-Ll{\'i}n, M. P. and Guti{\'e}rrez, J. and C{\'a}mara, M. and Blanco, J. L.},
  title     = {Homotopy-Driven Training of Normalizing Flows for Acoustic Inverse Problems},
  booktitle = {{TECNIAC{\'U}STICA} 2026},
  year      = {2026},
  address   = {Granada, Spain}
}`,
  ris:`TY  - CPAPER
TI  - Homotopy-Driven Training of Normalizing Flows for Acoustic Inverse Problems
AU  - Marcos-Macías, Fernando
AU  - Daza-Llín, M. P.
AU  - Gutiérrez, J.
AU  - Cámara, M.
AU  - Blanco, J. L.
T2  - TECNIACÚSTICA 2026
CY  - Granada, Spain
PY  - 2026
ER  -`
};

const preview=document.querySelector("#citation-preview code");
document.querySelectorAll(".citation-copy").forEach(btn=>{
  btn.addEventListener("click",async()=>{
    const fmt=btn.dataset.format;
    const value=citations[fmt];
    await navigator.clipboard.writeText(value);
    if(preview) preview.textContent=value;
    const status=document.getElementById("copy-status");
    if(status){
      status.textContent=`${fmt==="plain"?"Plain text":fmt.toUpperCase()} copied.`;
      setTimeout(()=>status.textContent="",1600);
    }
  });
});

document.querySelectorAll('a[href]').forEach(a=>{
  const href=a.getAttribute('href')||'';
  if(!href.startsWith('#')){
    a.setAttribute('target','_blank');
    a.setAttribute('rel','noopener');
  }
});

function renderMathWhenReady(){
  if(typeof katex==="undefined"){
    setTimeout(renderMathWhenReady,50);
    return;
  }
  document.querySelectorAll(".tex[data-tex]").forEach(el=>{
    if(el.dataset.rendered==="1") return;
    katex.render(el.dataset.tex,el,{throwOnError:false,displayMode:false,strict:"ignore"});
    el.dataset.rendered="1";
  });
}
renderMathWhenReady();

/* Tabs */
document.querySelectorAll(".interactive-tab").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".interactive-tab").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".interactive-panel").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`${btn.dataset.panel}-panel`).classList.add("active");
  });
});

/* -------------------------------------------------------------
   Posterior transport
   Exact r0 and pi moments from the paper. Intermediate rM display
   is explicitly a visual interpolation, not reported experimental data.
------------------------------------------------------------- */
const posteriorSvg=document.getElementById("posterior-svg");
const NS="http://www.w3.org/2000/svg";
const plot={x:58,y:18,w:550,h:250};
const betaRange=[0.665,0.725];
const gammaRange=[3.91,4.08];

const P0={mu:[0.6978,3.9862],sd:[0.00863,0.0370],rho:-0.814};
const PT={mu:[0.6952,4.0074],sd:[0.00883,0.0400],rho:-0.815};

function sx(x){return plot.x+(x-betaRange[0])/(betaRange[1]-betaRange[0])*plot.w}
function sy(y){return plot.y+plot.h-(y-gammaRange[0])/(gammaRange[1]-gammaRange[0])*plot.h}

function covariance(p){
  return [
    [p.sd[0]*p.sd[0],p.rho*p.sd[0]*p.sd[1]],
    [p.rho*p.sd[0]*p.sd[1],p.sd[1]*p.sd[1]]
  ];
}
function eig2(c){
  const a=c[0][0],b=c[0][1],d=c[1][1];
  const tr=a+d,disc=Math.sqrt((a-d)*(a-d)+4*b*b);
  const l1=(tr+disc)/2,l2=(tr-disc)/2;
  const ang=.5*Math.atan2(2*b,a-d);
  return {l1,l2,ang};
}
function ellipsePath(p,k=2){
  const e=eig2(covariance(p));
  const pts=[];
  for(let i=0;i<=120;i++){
    const t=2*Math.PI*i/120;
    const u=k*Math.sqrt(e.l1)*Math.cos(t);
    const v=k*Math.sqrt(e.l2)*Math.sin(t);
    const x=p.mu[0]+u*Math.cos(e.ang)-v*Math.sin(e.ang);
    const y=p.mu[1]+u*Math.sin(e.ang)+v*Math.cos(e.ang);
    pts.push(`${i===0?"M":"L"}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`);
  }
  return pts.join(" ")+" Z";
}
function setEllipse(groupId,p,cls){
  const g=document.getElementById(groupId);
  g.innerHTML="";
  [1,2].forEach((k,idx)=>{
    const path=document.createElementNS(NS,"path");
    path.setAttribute("d",ellipsePath(p,k));
    path.setAttribute("class",`${cls} ${idx===0?"posterior-contour-faint":""}`);
    g.appendChild(path);
  });
}
function setMean(id,p){
  const el=document.getElementById(id);
  el.setAttribute("cx",sx(p.mu[0]));
  el.setAttribute("cy",sy(p.mu[1]));
}
function blendPosterior(t){
  const c0=covariance(P0),ct=covariance(PT);
  const cov=[
    [c0[0][0]*(1-t)+ct[0][0]*t,c0[0][1]*(1-t)+ct[0][1]*t],
    [c0[1][0]*(1-t)+ct[1][0]*t,c0[1][1]*(1-t)+ct[1][1]*t]
  ];
  const sd0=Math.sqrt(cov[0][0]),sd1=Math.sqrt(cov[1][1]);
  return {
    mu:[P0.mu[0]*(1-t)+PT.mu[0]*t,P0.mu[1]*(1-t)+PT.mu[1]*t],
    sd:[sd0,sd1],
    rho:cov[0][1]/(sd0*sd1)
  };
}
setEllipse("ellipse-r0",P0,"posterior-contour-r0");
setEllipse("ellipse-pi",PT,"posterior-contour-pi");
setMean("mean-r0",P0);setMean("mean-pi",PT);

const pSlider=document.getElementById("posterior-M");
function updatePosterior(){
  const M=Number(pSlider.value),t=M/6;
  const pm=blendPosterior(t);
  setEllipse("ellipse-rm",pm,"posterior-contour-rm");
  setMean("mean-rm",pm);
  document.getElementById("posterior-M-value").textContent=M;
  const text=M===0?"M = 0 · auxiliary density":M===6?"M = 6 · reported transported endpoint":"M = "+M+" · visual interpolation only";
  document.getElementById("posterior-progress").textContent=text;
}
pSlider.addEventListener("input",updatePosterior);
updatePosterior();

/* -------------------------------------------------------------
   Multibasin concept preview
   Anchors: target and competing stationary point from paper.
   The contours / separator / path are explicitly schematic.
------------------------------------------------------------- */
const multiSvg=document.getElementById("multibasin-svg");
const mplot={x:60,y:18,w:540,h:290};
const domain={w1:[0.78,1.52],w2:[0.78,1.52]};
const target=[1.0,1.2];
const competing=[1.163,0.989];

function mx(x){return mplot.x+(x-domain.w1[0])/(domain.w1[1]-domain.w1[0])*mplot.w}
function my(y){return mplot.y+mplot.h-(y-domain.w2[0])/(domain.w2[1]-domain.w2[0])*mplot.h}
function invx(px){return domain.w1[0]+(px-mplot.x)/mplot.w*(domain.w1[1]-domain.w1[0])}
function invy(py){return domain.w2[1]-(py-mplot.y)/mplot.h*(domain.w2[1]-domain.w2[0])}

document.getElementById("target-marker").setAttribute("transform",`translate(${mx(target[0])},${my(target[1])})`);
document.getElementById("competing-marker").setAttribute("transform",`translate(${mx(competing[0])},${my(competing[1])})`);
document.getElementById("target-shadow").setAttribute("cx",mx(target[0]));
document.getElementById("target-shadow").setAttribute("cy",my(target[1]));
document.getElementById("competing-shadow").setAttribute("cx",mx(competing[0]));
document.getElementById("competing-shadow").setAttribute("cy",my(competing[1]));

/* Schematic contours: positions are anchored to the paper minima only. */
const contourG=document.getElementById("objective-contours");
function addContour(cx,cy,rx,ry,cls,rot=0){
  const e=document.createElementNS(NS,"ellipse");
  e.setAttribute("cx",cx);e.setAttribute("cy",cy);e.setAttribute("rx",rx);e.setAttribute("ry",ry);
  e.setAttribute("class",`objective-contour ${cls}`);
  e.setAttribute("transform",`rotate(${rot} ${cx} ${cy})`);
  contourG.appendChild(e);
}
[1,1.45,1.95,2.55].forEach(s=>addContour(mx(target[0]),my(target[1]),34*s,23*s,"target",-24));
[1,1.5,2.1].forEach(s=>addContour(mx(competing[0]),my(competing[1]),29*s,21*s,"competing",18));

/* A schematic separator halfway between anchored attractors. */
const sep=document.getElementById("basin-separator");
sep.setAttribute("d",`M ${mx(.96)} ${my(.80)} C ${mx(1.02)} ${my(.98)}, ${mx(1.09)} ${my(1.10)}, ${mx(1.27)} ${my(1.42)}`);

let start=[.94,1.24];
let currentM=0;

function basinScore(p){
  // Conceptual classification only: relative scaled distance to the two anchored points.
  const dt=Math.hypot((p[0]-target[0])/0.18,(p[1]-target[1])/0.18);
  const dc=Math.hypot((p[0]-competing[0])/0.16,(p[1]-competing[1])/0.16);
  return dt<=dc?"target":"competing";
}
function rateForH(h){
  return {"-0.02":.105,"-0.03":.145,"-0.04":.19}[h]||.19;
}
function conceptualPoint(M){
  const attr=basinScore(start)==="target"?target:competing;
  const rate=rateForH(document.getElementById("multi-h").value);
  const t=1-Math.exp(-rate*M);
  // Small curved component only for visual separation, zero at endpoints.
  const dx=attr[0]-start[0],dy=attr[1]-start[1];
  const curve=.035*Math.sin(Math.PI*t);
  return [start[0]+dx*t-curve*dy,start[1]+dy*t+curve*dx];
}
function conceptualPath(M){
  const pts=[];
  for(let m=0;m<=M;m++) pts.push(conceptualPoint(m));
  return pts;
}
function renderTrajectory(){
  const M=Number(document.getElementById("multi-M").value);
  currentM=M;
  const pts=conceptualPath(M);
  const g=document.getElementById("trajectory-path");
  g.innerHTML="";
  for(let i=1;i<pts.length;i++){
    const path=document.createElementNS(NS,"path");
    path.setAttribute("d",`M ${mx(pts[i-1][0])} ${my(pts[i-1][1])} L ${mx(pts[i][0])} ${my(pts[i][1])}`);
    path.setAttribute("class","trajectory-segment");
    g.appendChild(path);
  }
  pts.slice(1,-1).forEach(p=>{
    const c=document.createElementNS(NS,"circle");
    c.setAttribute("cx",mx(p[0]));c.setAttribute("cy",my(p[1]));c.setAttribute("r","2.2");c.setAttribute("class","trajectory-dot");
    g.appendChild(c);
  });
  const cp=pts[pts.length-1];
  const sm=document.getElementById("start-marker"),cm=document.getElementById("current-marker");
  sm.setAttribute("cx",mx(start[0]));sm.setAttribute("cy",my(start[1]));
  cm.setAttribute("cx",mx(cp[0]));cm.setAttribute("cy",my(cp[1]));
  document.getElementById("multi-M-value").textContent=M;
  document.getElementById("start-coords").textContent=`(${start[0].toFixed(3)}, ${start[1].toFixed(3)})`;
  document.getElementById("current-coords").textContent=`(${cp[0].toFixed(3)}, ${cp[1].toFixed(3)})`;
  document.getElementById("attractor-label").textContent=basinScore(start)==="target"?"target":"competing stationary point";
  renderProgressChart();
}
function renderProgressChart(){
  const line=document.getElementById("progress-line");
  const cursor=document.getElementById("progress-cursor");
  const pts=[];
  const attr=basinScore(start)==="target"?target:competing;
  const d0=Math.max(1e-6,Math.hypot(start[0]-attr[0],start[1]-attr[1]));
  for(let M=0;M<=20;M++){
    const p=conceptualPoint(M);
    const d=Math.max(1e-6,Math.hypot(p[0]-attr[0],p[1]-attr[1]));
    const x=28+M/20*246;
    const y=18+(1-d/d0)*78;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  line.setAttribute("points",pts.join(" "));
  const x=28+currentM/20*246;
  cursor.setAttribute("x1",x);cursor.setAttribute("x2",x);
}
document.getElementById("multi-M").addEventListener("input",renderTrajectory);
document.getElementById("multi-h").addEventListener("change",renderTrajectory);

document.querySelectorAll(".preset-start").forEach(btn=>{
  btn.addEventListener("click",()=>{
    start=btn.dataset.start==="safe"?[.94,1.24]:[1.085,1.085];
    document.getElementById("multi-M").value=0;
    renderTrajectory();
  });
});

multiSvg.addEventListener("click",e=>{
  const r=multiSvg.getBoundingClientRect();
  const px=(e.clientX-r.left)/r.width*640;
  const py=(e.clientY-r.top)/r.height*360;
  if(px<mplot.x||px>mplot.x+mplot.w||py<mplot.y||py>mplot.y+mplot.h) return;
  start=[invx(px),invy(py)];
  document.getElementById("multi-M").value=0;
  renderTrajectory();
});

renderTrajectory();


/* V11.2 — lightweight guided playback */
let posteriorTimer=null;
const posteriorPlay=document.getElementById("play-posterior");
if(posteriorPlay){
  posteriorPlay.addEventListener("click",()=>{
    if(posteriorTimer){
      clearInterval(posteriorTimer);
      posteriorTimer=null;
      posteriorPlay.textContent="Play 0 → 6";
      posteriorPlay.classList.remove("running");
      return;
    }
    pSlider.value=0;
    updatePosterior();
    posteriorPlay.textContent="Pause";
    posteriorPlay.classList.add("running");
    posteriorTimer=setInterval(()=>{
      const next=Number(pSlider.value)+1;
      if(next>6){
        clearInterval(posteriorTimer);
        posteriorTimer=null;
        posteriorPlay.textContent="Replay 0 → 6";
        posteriorPlay.classList.remove("running");
        return;
      }
      pSlider.value=next;
      updatePosterior();
    },650);
  });
}

let multiTimer=null;
const multiRun=document.getElementById("run-multibasin");
if(multiRun){
  multiRun.addEventListener("click",()=>{
    const slider=document.getElementById("multi-M");
    if(multiTimer){
      clearInterval(multiTimer);
      multiTimer=null;
      multiRun.textContent="Run to M = 20";
      multiRun.classList.remove("running");
      return;
    }
    slider.value=0;
    renderTrajectory();
    multiRun.textContent="Pause";
    multiRun.classList.add("running");
    multiTimer=setInterval(()=>{
      const next=Number(slider.value)+1;
      if(next>20){
        clearInterval(multiTimer);
        multiTimer=null;
        multiRun.textContent="Replay to M = 20";
        multiRun.classList.remove("running");
        return;
      }
      slider.value=next;
      renderTrajectory();
    },230);
  });
}

/* If the user manually moves a slider during playback, stop playback. */
pSlider.addEventListener("pointerdown",()=>{
  if(posteriorTimer){
    clearInterval(posteriorTimer);
    posteriorTimer=null;
    posteriorPlay.textContent="Play 0 → 6";
    posteriorPlay.classList.remove("running");
  }
});
document.getElementById("multi-M").addEventListener("pointerdown",()=>{
  if(multiTimer){
    clearInterval(multiTimer);
    multiTimer=null;
    multiRun.textContent="Run to M = 20";
    multiRun.classList.remove("running");
  }
});
