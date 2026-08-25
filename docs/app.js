
const PROJECT={githubUser:"jlblancoupm",repo:"gotham_nf_seminal"};
const repo=`https://github.com/${PROJECT.githubUser}/${PROJECT.repo}`;
document.getElementById("repo-link").href=repo;
const bib=document.getElementById("bibtex").innerText;
document.getElementById("copy-bib").addEventListener("click",async()=>{
  await navigator.clipboard.writeText(bib);
  const btn=document.getElementById("copy-bib"),old=btn.textContent;
  btn.textContent="Copied"; setTimeout(()=>btn.textContent=old,1400);
});
