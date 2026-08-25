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
  author    = {Marcos-Macías, Fernando and Daza-Llín, M. P. and Gutiérrez, J. and Cámara, M. and Blanco, J. L.},
  title     = {Homotopy-Driven Training of Normalizing Flows for Acoustic Inverse Problems},
  booktitle = {TECNIACÚSTICA 2026},
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
