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
const path=document.getElementById("path-line");

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
  path.style.left=c.path.left; path.style.top=c.path.top; path.style.width=c.path.width;
  path.style.transform=`rotate(${c.path.rotate})`;
}
buttons.forEach(b=>b.addEventListener("click",()=>setCase(b.dataset.case)));

const citation="F. Marcos-Macías, M.P. Daza-Llín, J. Gutiérrez, M. Cámara, and J.L. Blanco, “Homotopy-Driven Training of Normalizing Flows for Acoustic Inverse Problems,” TECNIACÚSTICA 2026, Granada, Spain, 2026.";
document.getElementById("copy-citation").addEventListener("click",async()=>{
  await navigator.clipboard.writeText(citation);
  document.getElementById("copy-status").textContent="Citation copied.";
  setTimeout(()=>document.getElementById("copy-status").textContent="",1600);
});
