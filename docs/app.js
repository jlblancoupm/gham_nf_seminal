const cases={
  auxiliary:{
    label:"Auxiliary-posterior region",
    defect:"1.62×10⁻⁴",
    det:"positive, 1.207–1.659",
    cond:"median 2.25",
    status:"Locally regular over tested points",
    note:"Six deterministic offsets around the auxiliary mean remain inside Λ with positive numerical Jacobian determinants.",
    ok:true,
    sample:{left:"28%",top:"66%"},
    transported:{left:"46%",top:"51%"},
    path:{left:"28%",top:"66%",width:"23%",rotate:"-27deg"}
  },
  boundary:{
    label:"Near basin boundary",
    defect:"1.28 (median finite defect)",
    det:"may lose regularity",
    cond:"not summarized by a single stable value",
    status:"Validity degrades near the separator",
    note:"Five of eight trajectories remain finite; none ends inside Λ in the reported stress test.",
    ok:false,
    sample:{left:"61%",top:"43%"},
    transported:{left:"86%",top:"20%"},
    path:{left:"61%",top:"43%",width:"32%",rotate:"-42deg"}
  }
};

const buttons=document.querySelectorAll(".preset");
const sample=document.getElementById("sample-point");
const transported=document.getElementById("transported-point");
const pathPolyline=document.getElementById("path-polyline");

function setCase(key){
  const c=cases[key];
  buttons.forEach(b=>b.classList.toggle("active",b.dataset.case===key));
  document.getElementById("case-label").textContent=c.label;
  document.getElementById("metric-defect").textContent=c.defect;
  document.getElementById("metric-det").textContent=c.det;
  document.getElementById("metric-cond").textContent=c.cond;
  const status=document.getElementById("metric-status");
  status.textContent=c.status;
  status.className="diagnostic status "+(c.ok?"ok":"fail");
  document.getElementById("metric-note").textContent=c.note;
  Object.assign(sample.style,c.sample);
  Object.assign(transported.style,c.transported);
  if(key==="auxiliary"){
    pathPolyline.setAttribute("points","28,66 33,61 37,57 41,54 46,51");
    pathPolyline.setAttribute("stroke","#3D8B6D");
    pathPolyline.setAttribute("marker-mid","url(#arrow-green)");
    pathPolyline.setAttribute("marker-end","url(#arrow-green)");
  }else{
    pathPolyline.setAttribute("points","61,43 67,39 72,34 78,28 86,20");
    pathPolyline.setAttribute("stroke","#A74343");
    pathPolyline.setAttribute("marker-mid","url(#arrow-red)");
    pathPolyline.setAttribute("marker-end","url(#arrow-red)");
  }
}
buttons.forEach(b=>b.addEventListener("click",()=>setCase(b.dataset.case)));




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
    preview.textContent=value;
    document.getElementById("copy-status").textContent=`${fmt==="plain"?"Plain text":fmt.toUpperCase()} copied.`;
    setTimeout(()=>document.getElementById("copy-status").textContent="",1600);
  });
});

/* Preserve the companion page for every external navigation. */
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
    katex.render(el.dataset.tex,el,{
      throwOnError:false,
      displayMode:false,
      strict:"ignore"
    });
  });
}
renderMathWhenReady();


/* V9 multibasin explorer */
const plane=document.getElementById("parameter-plane");
const freeStart=document.getElementById("free-start");
const freeLabel=document.getElementById("free-start-label");

const domain={
  w1:[0.90,1.20],
  w2:[0.95,1.25]
};

function positionStart(px,py){
  const x=Math.max(0,Math.min(1,px));
  const y=Math.max(0,Math.min(1,py));
  freeStart.style.left=`${x*100}%`;
  freeStart.style.top=`${y*100}%`;
  freeLabel.style.left=`calc(${x*100}% + 10px)`;
  freeLabel.style.top=`calc(${y*100}% - 19px)`;

  const w1=domain.w1[0]+x*(domain.w1[1]-domain.w1[0]);
  const w2=domain.w2[1]-y*(domain.w2[1]-domain.w2[0]);
  document.getElementById("coord-w1").textContent=w1.toFixed(3);
  document.getElementById("coord-w2").textContent=w2.toFixed(3);
}

plane.addEventListener("click",e=>{
  const r=plane.getBoundingClientRect();
  positionStart((e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);
});
document.getElementById("reset-start").addEventListener("click",()=>positionStart(.50,.48));

document.querySelectorAll(".view-button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".view-button").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    plane.classList.toggle("paper-mode",btn.dataset.view==="paper");
    plane.classList.toggle("basin-mode",btn.dataset.view==="basins");
  });
});

const paperRegimes={
  auxiliary:{
    defect:"1.62×10⁻⁴",
    det:"positive, 1.207–1.659",
    cond:"median/max 2.25/2.92",
    status:"Locally regular over tested auxiliary points",
    note:"All six transported points remain inside Λ. These statistics belong to the validated auxiliary-region test, not to the freely selected point on the left.",
    ok:true
  },
  boundary:{
    defect:"1.28 (median finite defect)",
    det:"regularity not retained",
    cond:"not reported as a stable summary",
    status:"Transport degrades near the basin separator",
    note:"Five of eight trajectories remain finite (62.5%), none ends inside Λ, and the median defect increases from 1.20×10⁻¹ to 1.28.",
    ok:false
  }
};

document.querySelectorAll(".regime-card").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".regime-card").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const c=paperRegimes[btn.dataset.case];
    document.getElementById("metric-defect").textContent=c.defect;
    document.getElementById("metric-det").textContent=c.det;
    document.getElementById("metric-cond").textContent=c.cond;
    const status=document.getElementById("metric-status");
    status.textContent=c.status;
    status.className="diagnostic status "+(c.ok?"ok":"fail");
    document.getElementById("metric-note").textContent=c.note;
  });
});


/* V10 comparison and h controls */
document.querySelectorAll(".compare-button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".compare-button").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("regime-compare").hidden = btn.dataset.mode!=="compare";
  });
});

const hSelect=document.getElementById("h-select");
hSelect.addEventListener("change",()=>{
  const value=hSelect.value;
  const status=document.getElementById("metric-status");
  const note=document.getElementById("metric-note");
  const activeCase=document.querySelector(".regime-card.active")?.dataset.case || "auxiliary";

  if(value==="-0.04"){
    document.querySelector(`.regime-card[data-case="${activeCase}"]`).click();
    return;
  }

  if(activeCase==="auxiliary"){
    document.getElementById("metric-defect").textContent="monotonic decrease through M=20";
    document.getElementById("metric-det").textContent="exact range not reported here";
    document.getElementById("metric-cond").textContent="exact summary not reported here";
    status.textContent=`Convergence reported for h=${value}`;
    status.className="diagnostic status ok";
    note.textContent="The paper reports monotonic decrease of defect and correction norm through order 20 for h ∈ {−0.02, −0.03, −0.04}; exact endpoint statistics highlighted on this page are reserved for h=−0.04.";
  }else{
    document.getElementById("metric-defect").textContent="stress test reported for h=−0.04";
    document.getElementById("metric-det").textContent="—";
    document.getElementById("metric-cond").textContent="—";
    status.textContent="Boundary statistics shown only for h=−0.04";
    status.className="diagnostic status fail";
    note.textContent="The published boundary stress-test statistics on this page correspond to h=−0.04. No alternative values are fabricated.";
  }
});
