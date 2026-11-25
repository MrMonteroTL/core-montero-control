
const modules=["Dashboard","Team","Vacations","Attendance","Training","Metrics","QA Assistant","Coaching","1:1 Meetings","Recognition","Settings"];
const demo={
 team:Array.from({length:12},(_,i)=>({id:`AG-${String(i+1).padStart(3,'0')}`,name:`Agent ${String(i+1).padStart(2,'0')}`,status:'Active',email:`agent${String(i+1).padStart(2,'0')}@example.invalid`})),
 vacations:[{agent:'Agent 03',start:'2026-12-14',end:'2026-12-18',status:'Approved',priority:'High'},{agent:'Agent 07',start:'2027-01-04',end:'2027-01-06',status:'Pending',priority:'Medium'}],
 attendance:[{date:'2026-11-20',agent:'Agent 05',type:'Late Arrival',status:'Open'}],
 training:[{agent:'Agent 02',course:'CORE Onboarding',status:'In Progress',due:'2026-12-05'}],
 qa:[{agent:'Agent 04',category:'Documentation',finding:'Case Notes',status:'Open'}],
 coaching:[{agent:'Agent 04',topic:'QA',followUp:'2026-12-02',status:'Open'}],
 recognition:[{agent:'Agent 01',type:'Teamwork',date:'2026-11-22'}]
};
let state=JSON.parse(localStorage.getItem('coreTLData')||'null')||structuredClone(demo);
let current='Dashboard';
const $=s=>document.querySelector(s);
function save(){localStorage.setItem('coreTLData',JSON.stringify(state))}
function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function nav(){ $('#nav').innerHTML=modules.map(m=>`<button type="button" class="nav-btn ${m===current?'active':''}" data-page="${m}">${m}</button>`).join(''); document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>{current=b.dataset.page;render()})); }
function cards(items){return `<div class="cards">${items.map(([l,v])=>`<article class="card"><div class="label">${l}</div><div class="value">${v}</div></article>`).join('')}</div>`}
function dashboard(){return cards([['Active Agents',state.team.filter(x=>x.status==='Active').length],['Pending Vacation',state.vacations.filter(x=>x.status==='Pending').length],['Attendance Incidents',state.attendance.length],['Open Coachings',state.coaching.filter(x=>x.status==='Open').length],['Overdue Training',state.training.filter(x=>x.status==='Overdue').length],['QA Findings',state.qa.length],['Recognitions',state.recognition.length],['Local Storage','On']])+`<div class="panel"><h2>Next actions</h2><p class="muted">This starter validates navigation and local-only storage. Excel import, editing forms, charts and backups are the next sprint.</p></div>`}
function simpleTable(title,rows,cols){if(!rows.length)return `<div class="panel"><h2>${title}</h2><div class="empty">No records</div></div>`;return `<div class="panel"><h2>${title}</h2><div class="table-wrap"><table><thead><tr>${cols.map(c=>`<th>${c[1]}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td>${esc(r[c[0]])}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`}
function placeholder(){return `<div class="panel"><h2>${current}</h2><p>This module is reserved in the project structure and will be implemented in the next sprint.</p></div>`}
function render(){nav();$('#page-title').textContent=current;$('#page-subtitle').textContent=current==='Dashboard'?'Team overview using synthetic demo data':'Local-first prototype module';let html='';if(current==='Dashboard')html=dashboard();else if(current==='Team')html=simpleTable('Team roster',state.team,[['id','Employee ID'],['name','Agent'],['email','Demo Email'],['status','Status']]);else if(current==='Vacations')html=simpleTable('Vacation requests',state.vacations,[['agent','Agent'],['start','Start'],['end','End'],['priority','Priority'],['status','Status']]);else if(current==='Attendance')html=simpleTable('Attendance incidents',state.attendance,[['date','Date'],['agent','Agent'],['type','Type'],['status','Status']]);else html=placeholder();$('#content').innerHTML=html}
$('#load-demo').addEventListener('click',()=>{state=structuredClone(demo);save();render()});
$('#clear-data').addEventListener('click',()=>{if(confirm('Clear all locally stored prototype data?')){localStorage.removeItem('coreTLData');state={team:[],vacations:[],attendance:[],training:[],qa:[],coaching:[],recognition:[]};render()}});
save();render();
