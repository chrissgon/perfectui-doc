
const NAV=[['Getting Started',['Installation','TypeScript','Tailwind CSS','Migrating from 0.x','License']],['Customization',['Dark Mode','Theme Color']],['General',['Layout Group','Float']],['Components',['Accordion','Badge','Button','Card','Chip','Dropdown','List','Modal','Table','Timeline','Tooltip']],['Forms',['Field Group','Input','Input Group','Textarea','Select','Checkbox','Radio','Switch']]];
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const C=t=>({t,code:true}),T=t=>({t,text:true});
const segs=a=>(Array.isArray(a)?a:[a]).map(x=>typeof x==='string'?T(x):x);
const P=a=>({kind:'p',segs:segs(a)}),NOTE=a=>({kind:'note',segs:segs(a)}),WARN=a=>({kind:'warn',segs:segs(a)});
const B=(cls,label,o={})=>({cls,label,...o});
const EX=(id,items,o={})=>({kind:'ex',id,items,...o});
const ROWS=[['pui-btn','Button shape: 8 × 16 px padding, 6 px radius, 14 px text.'],['pui-solid','Fills with the colour; the label takes the page background.'],['pui-soft','Tints the background with the colour at 15%.'],['pui-outline','Draws a 1 px border and the label in the colour.'],['pui-link','No fill or border; the label underlines on hover.'],['pui-rounded-full','Pill corners. A utility, so it works on any shape.']];
const SECTIONS=[
 {id:'styles',title:'Styles',blocks:[
  P('Pick one of four style classes. Each reads the colour class beside it and applies it as a fill, a tint, a border or text.'),
  EX('styles',[B('pui-btn pui-solid pui-theme','Solid'),B('pui-btn pui-soft pui-theme','Soft'),B('pui-btn pui-outline pui-theme','Outline'),B('pui-btn pui-link pui-theme','Link')]),
  {kind:'table',rows:ROWS}]},
 {id:'colors',title:'Colors',blocks:[
  P(['Add one colour class. Five follow the palette, and ',C('pui-theme'),' follows ',C('--pui-theme'),'.']),
  EX('colors',[B('pui-btn pui-solid pui-theme','Theme'),B('pui-btn pui-solid pui-success','Success'),B('pui-btn pui-solid pui-error','Error'),B('pui-btn pui-solid pui-warn','Warn'),B('pui-btn pui-solid pui-muted','Muted')]),
  EX('page-colors',[B('pui-btn pui-outline pui-surface','Cancel'),B('pui-btn pui-solid pui-inverse','Continue')]),
  NOTE(['Two colors are defined against the page rather than against a palette. ',C('pui-surface'),' uses the text and border colours; ',C('pui-inverse'),' fills with the text colour.'])]},
 {id:'rounded',title:'Rounded',blocks:[
  P(['Add the ',C('pui-rounded-full'),' utility for pill corners.']),
  EX('rounded',[B('pui-btn pui-solid pui-theme pui-rounded-full','Rounded')])]},
 {id:'disabled',title:'Disabled',blocks:[
  P(['Add the ',C('disabled'),' attribute. The button drops to 50% opacity and shows a not-allowed cursor.']),
  EX('disabled',[B('pui-btn pui-solid pui-theme','Disabled',{disabled:true}),B('pui-btn pui-outline pui-surface','Disabled',{disabled:true})]),
  WARN(['An ',C('<a>'),' has no ',C('disabled'),' attribute. Use ',C('aria-disabled="true"'),' and remove the ',C('href'),' so the link cannot be followed.'])]},
 {id:'with-an-icon',title:'With an icon',blocks:[
  P(['Place the icon before the label; the button spaces them with its own gap. An icon-only button needs an ',C('aria-label'),'.']),
  EX('icon',[B('pui-btn pui-solid pui-theme','Send message',{icon:'mail'}),B('pui-btn pui-outline pui-error','Delete',{icon:'trash-2',iconOnly:true})])]},
 {id:'grouping',title:'Grouping',blocks:[
  P(['Wrap buttons in ',C('pui-group-row'),' and their borders join into one line; only the ends keep their radius.']),
  EX('group',[B('pui-btn pui-outline pui-surface','Day'),B('pui-btn pui-outline pui-surface','Week'),B('pui-btn pui-outline pui-surface','Month')],{group:true})]}
];
const btnCode=b=>`<button class="${b.cls}"${b.disabled?' disabled':''}${b.iconOnly?` aria-label="${b.label}"`:''}>${b.icon?`<span class="icon icon-${b.icon}"></span>`:''}${b.iconOnly?'':b.label}</button>`;
const exCode=e=>e.group?`<div class="pui-group-row">\n${e.items.map(b=>'  '+btnCode(b)).join('\n')}\n</div>`:e.items.map(btnCode).join('\n');
const COL={p:'var(--pui-text-muted)',tag:'var(--pui-theme-ink)',attr:'var(--pui-warn-ink)',val:'var(--pui-success-ink)',txt:'var(--pui-text)'};
function hl(src){const out=[],re=/(<\/?)([\w-]+)((?:\s+[\w-]+(?:="[^"]*")?)*)\s*(>)|([^<]+)/g;let m;
 while((m=re.exec(src))){if(m[5]!==undefined){out.push({t:m[5],c:COL.txt});continue;}
  out.push({t:m[1],c:COL.p},{t:m[2],c:COL.tag});const ar=/(\s+)([\w-]+)(?:(=)("[^"]*"))?/g;let a;
  while((a=ar.exec(m[3]))){out.push({t:a[1],c:COL.txt},{t:a[2],c:COL.attr});if(a[3])out.push({t:'=',c:COL.p},{t:a[4],c:COL.val});}
  out.push({t:m[4],c:COL.p});}
 return out;}
const plain=sg=>sg.map(x=>x.t).join('');
const INDEX=[{page:'Button',section:'Button',text:'The pui-btn class turns a <button> or an <a> into a button. It brings the shape only: pair it with a style and a color.',href:'#top'}];
SECTIONS.forEach(s=>s.blocks.forEach(b=>{if(b.segs)INDEX.push({page:'Button',section:s.title,text:plain(b.segs),href:'#'+s.id});if(b.rows)b.rows.forEach(r=>INDEX.push({page:'Button',section:s.title,text:r[0]+': '+r[1],href:'#'+s.id}));if(b.items)INDEX.push({page:'Button',section:s.title,text:exCode(b),href:'#'+s.id});}));
INDEX.push(
 {page:'Chip',section:'Styles',text:'pui-chip takes the same four styles as a button: solid, soft, outline and link.',href:'#'},
 {page:'Badge',section:'Styles',text:'A badge is one word of status: pui-badge pui-outline pui-muted.',href:'#'},
 {page:'Migrating from 0.x',section:'Classes',text:'style-outline-primary becomes pui-outline pui-theme; every class now has the pui- prefix.',href:'#'},
 {page:'Input',section:'Invalid',text:'aria-invalid="true" turns the border, text and message to the error colour.',href:'#'},
 {page:'Dark Mode',section:'Choosing a mode',text:'Set data-pui-mode="dark" on <html> to stop following the operating system.',href:'#'},
 {page:'Theme Color',section:'Your colour',text:'Set --pui-theme on :root and every component follows it.',href:'#'});
NAV.forEach(([,ps])=>ps.forEach(p=>INDEX.push({page:p,section:p,text:'',href:'#',title:true})));
function lev(a,b){const m=a.length,n=b.length,d=Array.from({length:m+1},(_,i)=>[i]);for(let j=1;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n];}
function wordHit(w,tok){if(tok.startsWith(w))return 0;if(w.length<4)return -1;const e=Math.min(lev(w,tok.slice(0,w.length)),lev(w,tok.slice(0,w.length+1)),lev(w,tok.slice(0,Math.max(1,w.length-1))));return e<=1?1:-1;}
function findHits(text,words){const re=/[a-z0-9]+/gi;let m;const hits=[];let score=0;
 for(const w of words){let best=null;re.lastIndex=0;while((m=re.exec(text))){const h=wordHit(w,m[0].toLowerCase());if(h>=0&&(!best||h<best.h)){best={h,i:m.index,len:m[0].length};if(h===0)break;}}if(!best)return null;hits.push(best);score+=best.h;}
 return{hits,score};}
function snippet(text,hits){const first=Math.min(...hits.map(h=>h.i));let s=Math.max(0,first-40),e=Math.min(text.length,s+120);const ranges=hits.map(h=>[h.i,h.i+h.len]).sort((a,b)=>a[0]-b[0]);const out=[];let p=s;if(s>0)out.push({t:'…',plain:true});
 for(const[a,b]of ranges){if(a<p||a>=e)continue;out.push({t:text.slice(p,a),plain:true},{t:text.slice(a,b),m:true});p=b;}out.push({t:text.slice(p,e)+(e<text.length?'…':''),plain:true});return out.filter(x=>x.t);}
function search(q){const words=q.toLowerCase().split(/\s+/).filter(Boolean);if(!words.length)return[];const res=[];
 for(const e of INDEX){const inT=findHits(e.page+' '+e.section,words),inX=e.text?findHits(e.text,words):null;if(!inT&&!inX)continue;
  const src=inX?e.text:e.section,hh=inX||inT;res.push({...e,score:(inT?0:10)+hh.score+(e.page==='Button'?0:1),snip:inX?snippet(e.text,inX.hits):[{t:e.title?'Page':e.section,plain:true}]});}
 res.sort((a,b)=>a.score-b.score);const seen=new Set();return res.filter(r=>{const k=r.page+'|'+r.section;if(seen.has(k))return false;seen.add(k);return true;}).slice(0,12);}

class Component extends DCLogic {
  state={mode:'light',w:typeof window!=='undefined'?window.innerWidth:1280,ver:'v1',open:NAV.map(()=>true),tabs:{},copied:null,active:'styles',q:'',sel:0,loading:false,themeHex:null};
  dlgRef=React.createRef(); qRef=React.createRef(); drawerRef=React.createRef(); loaded=false;
  openDrawer=()=>{const d=this.drawerRef.current;d&&!d.open&&d.showModal();};
  closeDrawer=()=>{const d=this.drawerRef.current;d&&d.open&&d.close();};
  componentDidMount(){
    document.documentElement.setAttribute('data-pui-mode',this.state.mode);
    this.applyAttrs();
    this.onResize=()=>this.setState({w:window.innerWidth});window.addEventListener('resize',this.onResize);
    this.onKey=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();this.openSearch();}};window.addEventListener('keydown',this.onKey);
    const vis={};this.io=new IntersectionObserver(es=>{es.forEach(e=>vis[e.target.id]=e.isIntersecting);const f=SECTIONS.find(s=>vis[s.id]);if(f&&f.id!==this.state.active)this.setState({active:f.id});},{rootMargin:'-80px 0px -60% 0px'});
    SECTIONS.forEach(s=>{const el=document.getElementById(s.id);el&&this.io.observe(el);});
    const m=location.hash.match(/^#search(?:=(.*))?$/);if(m)setTimeout(()=>this.openSearch(m[1]?decodeURIComponent(m[1]):''),300);
  }
  componentDidUpdate(pp,ps){if(!ps||ps.mode!==this.state.mode)document.documentElement.setAttribute('data-pui-mode',this.state.mode);this.applyAttrs();}
  componentWillUnmount(){window.removeEventListener('resize',this.onResize);window.removeEventListener('keydown',this.onKey);this.io&&this.io.disconnect();clearTimeout(this.ct);clearTimeout(this.lt);}
  applyAttrs(){document.querySelectorAll('[data-popover]').forEach(el=>{if(!el.hasAttribute('popover'))el.setAttribute('popover',el.dataset.popover);});document.querySelectorAll('[data-pt]').forEach(el=>el.setAttribute('popovertarget',el.dataset.pt));}
  openSearch=(q)=>{const d=this.dlgRef.current;if(!d)return;const first=!this.loaded;this.setState({q:typeof q==='string'?q:this.state.q,sel:0,loading:first});if(!d.open)d.showModal();requestAnimationFrame(()=>this.qRef.current&&this.qRef.current.focus());if(first){this.lt=setTimeout(()=>{this.loaded=true;this.setState({loading:false});},900);}};
  closeSearch=()=>{const d=this.dlgRef.current;d&&d.open&&d.close();};
  go=(r)=>{this.closeSearch();if(r&&r.href&&r.href.startsWith('#')&&r.href.length>1){const el=document.getElementById(r.href.slice(1));if(el)window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-80});else if(r.href==='#top')window.scrollTo({top:0});}};
  copy=(id,text)=>{try{navigator.clipboard.writeText(text);}catch(e){}this.setState({copied:id});clearTimeout(this.ct);this.ct=setTimeout(()=>this.setState({copied:null}),1500);};
  renderVals(){
    const s=this.state,narrow=s.w<768;
    if(s.w>=900&&this.drawerRef.current&&this.drawerRef.current.open)setTimeout(this.closeDrawer,0);
    const results=s.loading?[]:search(s.q),sel=Math.min(s.sel,Math.max(0,results.length-1));
    const groups=[];results.forEach((r,i)=>{let g=groups.find(x=>x.page===r.page);if(!g){g={page:r.page,items:[]};groups.push(g);}const on=i===sel;
      g.items.push({id:'pui-sr-'+i,sel:String(on),href:r.href,section:r.section,snip:r.snip,cls:on?'pui-soft pui-theme':'',edge:on?'color-mix(in oklab,var(--pui-theme) 45%,transparent)':'transparent',snipColor:on?'var(--pui-text)':'var(--pui-text-muted)',
        open:e=>{e.preventDefault();this.go(r);},hover:()=>{if(this.state.sel!==i)this.setState({sel:i});}});});
    const activeIdx=Math.max(0,SECTIONS.findIndex(x=>x.id===s.active));
    return {
      wide:!narrow,narrow,
      L:(()=>{const sc=s.w<900,tc=s.w<1100;return{sideCollapsed:sc,sideOpen:!sc,tocCollapsed:tc,tocOpen:!tc,
        cols:sc?'minmax(0,1fr)':tc?'240px minmax(0,1fr)':'272px minmax(0,1fr) 208px',gap:sc?'0':tc?'40px':'48px',mainTop:s.w<640?'28px':'48px'};})(),
      D:s.w<640?{w:'100vw',h:'100dvh',m:'0',cardH:'100%',flex:'1',resMax:'none'}:{w:'min(36rem, calc(100vw - 32px))',h:'auto',m:'10vh auto auto',cardH:'auto',flex:'none',resMax:'min(420px, 60vh)'},
      drawerRef:this.drawerRef,openDrawer:this.openDrawer,closeDrawer:this.closeDrawer,
      onDrawerClick:e=>{if(e.target===this.drawerRef.current)this.closeDrawer();},kbdK:(typeof navigator!=='undefined'&&/Mac/.test(navigator.platform))?'⌘K':'Ctrl K',
      isLight:s.mode==='light',isDark:s.mode==='dark',modeLabel:s.mode==='light'?'Switch to dark mode':'Switch to light mode',
      toggleMode:()=>this.setState({mode:s.mode==='light'?'dark':'light'}),
      themeHex:s.themeHex||'#0092cd',pickTheme:e=>{const v=e.target.value;document.documentElement.style.setProperty('--pui-theme',v);this.setState({themeHex:v});},
      verLabel:s.ver==='v1'?'v1 (latest)':'v0 (0.23)',
      versions:[['v1','v1 (latest)'],['v0','v0 (0.23)']].map(([k,l])=>({label:l,checked:String(s.ver===k),checkOpacity:s.ver===k?1:0,segCls:s.ver===k?'pui-btn pui-solid pui-inverse':'pui-btn pui-outline pui-surface',pick:()=>{this.setState({ver:k});const m=document.getElementById('pui-ver-menu');m&&m.hidePopover&&m.hidePopover();}})),
      openSearch:()=>this.openSearch(),closeSearch:this.closeSearch,
      nav:NAV.map(([t,ps],i)=>({title:t,open:s.open[i],rot:s.open[i]?'rotate(180deg)':'rotate(0deg)',
        expanded:String(s.open[i]),hidden:!s.open[i],display:s.open[i]?'flex':'none',
        toggle:()=>this.setState(st=>{const a=st.open.slice();a[i]=!a[i];return{open:a};}),
        pages:ps.map(p=>{const cur=p==='Button';return{title:p,slug:slug(p),href:`/docs/v1/${slug(t)}/${slug(p)}`,current:cur?'page':undefined,cls:cur?'pui-soft pui-theme':'',color:cur?'var(--pui-theme-ink)':'var(--pui-text-muted)'};})})),
      navClick:e=>{const a=e.target.closest&&e.target.closest('a[data-route]');if(a){e.preventDefault();this.closeDrawer();}},
      stopNav:e=>e.preventDefault(),
      sections:SECTIONS.map(sec=>({id:sec.id,title:sec.title,hash:'#'+sec.id,blocks:sec.blocks.map(b=>{
        const base={isP:b.kind==='p',isEx:b.kind==='ex',isNote:b.kind==='note',isWarn:b.kind==='warn',isTable:b.kind==='table',segs:b.segs||[],rows:(b.rows||[]).map(r=>({cls:r[0],does:r[1]}))};
        if(b.kind!=='ex')return base;
        const tab=s.tabs[b.id]||'preview',code=exCode(b),cp=s.copied===b.id,ids={p:'ex-'+b.id+'-preview',c:'ex-'+b.id+'-code'};
        const pick=k=>()=>this.setState(st=>({tabs:{...st.tabs,[b.id]:k}}));
        const key=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='Home'||e.key==='End'){e.preventDefault();const k=(e.key==='Home')?'preview':(e.key==='End')?'code':(tab==='preview'?'code':'preview');this.setState(st=>({tabs:{...st.tabs,[b.id]:k}}));requestAnimationFrame(()=>{const el=document.getElementById((k==='preview'?ids.p:ids.c)+'-tab');el&&el.focus();});}};
        return {...base,
          tabs:[['preview','Preview',ids.p],['code','Code',ids.c]].map(([k,l,id])=>({label:l,id:id+'-tab',panel:id,sel:String(tab===k),tabIndex:tab===k?0:-1,pick:pick(k),key,bar:tab===k?'var(--pui-theme)':'transparent',color:tab===k?'var(--pui-text)':'var(--pui-text-muted)'})),
          showPreview:tab==='preview',showCode:tab==='code',pPanel:ids.p,pTab:ids.p+'-tab',cPanel:ids.c,cTab:ids.c+'-tab',
          isGroup:!!b.group,notGroup:!b.group,
          items:b.items.map(it=>({cls:it.cls,label:it.label,shown:it.iconOnly?'':it.label,disabled:!!it.disabled,aria:it.label,hasIcon:!!it.icon,iconCls:'icon icon-'+it.icon})),
          hl:hl(code),copy:()=>this.copy(b.id,code),copyLabel:cp?'Copied':'Copy',copied:cp,notCopied:!cp,
          copyCls:cp?'pui-btn pui-link pui-success':'pui-btn pui-link pui-surface'};
      })})),
      toc:SECTIONS.map((x,i)=>({title:x.title,hash:'#'+x.id,current:i===activeIdx?'location':undefined,color:i===activeIdx?'var(--pui-theme-ink)':'var(--pui-text-muted)',weight:i===activeIdx?600:400})),
      tocY:'translateY('+activeIdx*32+'px)',
      dlgRef:this.dlgRef,qRef:this.qRef,q:s.q,
      onQ:e=>this.setState({q:e.target.value,sel:0}),
      onQKey:e=>{if(e.key==='ArrowDown'){e.preventDefault();this.setState({sel:Math.min(sel+1,results.length-1)});}else if(e.key==='ArrowUp'){e.preventDefault();this.setState({sel:Math.max(sel-1,0)});}else if(e.key==='Enter'&&results[sel]){e.preventDefault();this.go(results[sel]);}},
      onDlgClose:()=>{},onDlgClick:e=>{if(e.target===this.dlgRef.current)this.closeSearch();},
      activeDesc:results.length?'pui-sr-'+sel:undefined,
      skeleton:[{a:'38%',b:'82%'},{a:'30%',b:'70%'},{a:'44%',b:'76%'}],
      sr:{loading:s.loading,empty:!s.loading&&!s.q.trim(),none:!s.loading&&!!s.q.trim()&&!results.length,noneText:`No results for '${s.q.trim()}'`,has:!s.loading&&results.length>0,groups}
    };
  }
}
