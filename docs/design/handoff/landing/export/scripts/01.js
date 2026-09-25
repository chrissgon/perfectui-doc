
const CYC=[
 {tag:'button',cls:['pui-btn','pui-solid','pui-theme'],label:'Button'},
 {tag:'span',cls:['pui-chip','pui-soft','pui-success'],label:'Chip'},
 {tag:'button',cls:['pui-btn','pui-outline','pui-inverse'],label:'Button'},
 {tag:'span',cls:['pui-badge','pui-solid','pui-warn'],label:'Badge'},
 {tag:'button',cls:['pui-btn','pui-soft','pui-error'],label:'Button'},
 {tag:'span',cls:['pui-chip','pui-outline','pui-muted'],label:'Chip'}
].map(c=>({...c,full:c.cls.join(' ')}));
const LIBS=[
 {name:'perfectui',version:'1.0.0-beta.0',css:3155,js:502},
 {name:'Pico',version:'2.1.1',css:11640,js:0},
 {name:'Beer CSS',version:'5.0.3',css:17035,js:5864},
 {name:'Bootstrap',version:'5.3.8',css:30869,js:23743},
 {name:'UIkit',version:'3.25.24',css:30944,js:53317},
 {name:'Bulma',version:'1.0.4',css:64842,js:0}
];
const MAX=84261;
const SHAPES=[['btn','button','Button'],['chip','chip','Chip'],['badge','badge','Badge']];
const STYLES=['solid','soft','outline','link'];
const COLOURS=['theme','success','error','warn','muted','surface','inverse'];
const DEF='light-dark(#0092cd,#07b6f0)';
const THEMES=[{label:'default',v:null,swatch:DEF},{label:'#7c3aed',v:'#7c3aed',swatch:'#7c3aed'},{label:'#16a34a',v:'#16a34a',swatch:'#16a34a'},{label:'#dc2626',v:'#dc2626',swatch:'#dc2626'},{label:'#d97706',v:'#d97706',swatch:'#d97706'}];
const S5=[{label:'#0092cd',v:DEF},{label:'#7c3aed',v:'#7c3aed'},{label:'#16a34a',v:'#16a34a'},{label:'#dc2626',v:'#dc2626'},{label:'#d97706',v:'#d97706'}];
const STRIKES=['No reset to override,','no font to remove,','no !important to beat,','no initialiser to call after rendering,','no guard for server rendering.'];
const LAYERS=['pui.states','pui.colors','pui.styles','pui.utilities','pui.components','pui.tokens'];
const PKG={npm:'npm i @chrissgon/perfectui',yarn:'yarn add @chrissgon/perfectui',pnpm:'pnpm add @chrissgon/perfectui',bun:'bun add @chrissgon/perfectui'};
const LT='\x3c';
const CDN=LT+'link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@1.0.0-beta.0/dist/perfectui.css">\n'+LT+'scr'+'ipt type="module">\n  import "https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@1.0.0-beta.0/dist/js/index.js";\n'+LT+'/scr'+'ipt>';
const W6=' w-full';
const fmt=n=>Math.round(n).toLocaleString('en-US');
const ease=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),3);

class Component extends DCLogic {
  state={mode:'light',w:typeof window!=='undefined'?window.innerWidth:1280,copied:null,cyc:0,n:0,heroP:1,el:0,shape:'btn',style:'solid',colour:'theme',changed:'colour',
    s5dark:false,s5i:1,s6n:0,struck:STRIKES.map(()=>false),tab:'npm'};
  heroRef=React.createRef(); chartRef=React.createRef(); s6Ref=React.createRef(); strikeRefs=STRIKES.map(()=>React.createRef());
  phase='type'; p6='type'; lastStrike=0;
  componentDidMount(){
    document.documentElement.setAttribute('data-pui-mode',this.state.mode);
    this.applyAttrs();
    this.onResize=()=>this.setState({w:window.innerWidth});window.addEventListener('resize',this.onResize);
    this.reduced=true;
    if(this.reduced){this.setState({n:CYC[0].full.length,el:99999,s6n:W6.length,struck:STRIKES.map(()=>true)});return;}
    this.t=setTimeout(this.tick,600);
    this.io1=new IntersectionObserver(es=>this.setState({heroP:es[0].intersectionRatio}),{threshold:Array.from({length:21},(_,i)=>i/20)});
    this.heroRef.current&&this.io1.observe(this.heroRef.current);
    this.io2=new IntersectionObserver(es=>{if(es[0].isIntersecting){this.io2.disconnect();const t0=performance.now();const f=now=>{const el=now-t0;if(el<2200){this.setState({el});this.raf=requestAnimationFrame(f);}else this.setState({el:99999});};this.raf=requestAnimationFrame(f);}},{threshold:0.3});
    this.chartRef.current&&this.io2.observe(this.chartRef.current);
    this.io3=new IntersectionObserver(es=>{if(es[0].isIntersecting){this.io3.disconnect();this.t6=setTimeout(this.tick6,500);}},{threshold:0.4});
    this.s6Ref.current&&this.io3.observe(this.s6Ref.current);
    this.io4=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;const i=this.strikeRefs.findIndex(r=>r.current===e.target);if(i<0)return;this.io4.unobserve(e.target);const now=performance.now(),at=Math.max(now+250,this.lastStrike+260);this.lastStrike=at;setTimeout(()=>this.setState(s=>{const a=s.struck.slice();a[i]=true;return{struck:a};}),at-now);});},{threshold:1,rootMargin:'0px 0px -12% 0px'});
    this.strikeRefs.forEach(r=>r.current&&this.io4.observe(r.current));
  }
  componentDidUpdate(pp,ps){
    if(!ps||ps.mode!==this.state.mode)document.documentElement.setAttribute('data-pui-mode',this.state.mode);
    this.applyAttrs();
  }
  componentWillUnmount(){clearTimeout(this.t);clearTimeout(this.t6);clearTimeout(this.ct);cancelAnimationFrame(this.raf);window.removeEventListener('resize',this.onResize);[this.io1,this.io2,this.io3,this.io4].forEach(o=>o&&o.disconnect());}
  applyAttrs(){
    const q=s=>document.querySelectorAll(s);
    q('[data-popover]').forEach(el=>{if(!el.hasAttribute('popover'))el.setAttribute('popover',el.dataset.popover);});
    q('[data-pt]').forEach(el=>el.setAttribute('popovertarget',el.dataset.pt));
    q('[data-closedby]').forEach(el=>el.setAttribute('closedby',el.dataset.closedby));
    const hasCmd='command' in HTMLButtonElement.prototype, hasInterest='interestForElement' in HTMLButtonElement.prototype, hasClosedBy='closedBy' in HTMLDialogElement.prototype;
    q('[data-cf]').forEach(el=>{el.setAttribute('commandfor',el.dataset.cf);el.setAttribute('command',el.dataset.cmd);
      if(!hasCmd&&!el._fb){el._fb=1;el.addEventListener('click',()=>{const d=document.getElementById(el.dataset.cf);if(!d)return;el.dataset.cmd==='show-modal'?d.showModal():d.close();});}});
    if(!hasClosedBy)q('dialog[data-closedby="any"]').forEach(d=>{if(d._fb)return;d._fb=1;d.addEventListener('click',e=>{if(e.target===d)d.close();});});
    q('[data-if]').forEach(el=>{el.setAttribute('interestfor',el.dataset.if);
      if(!hasInterest&&!el._fb){el._fb=1;const tip=()=>document.getElementById(el.dataset.if);
        const show=()=>{const t=tip();if(!t||t.matches(':popover-open'))return;try{t.showPopover({source:el});}catch(e){try{t.showPopover();}catch(_){}}};
        const hide=()=>{const t=tip();try{t&&t.hidePopover();}catch(_){}};
        el.addEventListener('mouseenter',show);el.addEventListener('focus',show);el.addEventListener('mouseleave',hide);el.addEventListener('blur',hide);}});
  }
  tick=()=>{
    const c=CYC[this.state.cyc],L=c.full.length,n=this.state.n;let d;
    if(this.phase==='type'){
      if(n<L){const nn=n+1;this.setState({n:nn});d=(c.full[nn]===' '||nn===L)?700:45+Math.random()*55;}
      else{this.phase='erase';d=1500;}
    }else{
      if(n>0){this.setState({n:Math.max(0,n-2)});d=18;}
      else{this.phase='type';this.setState({cyc:(this.state.cyc+1)%CYC.length});d=500;}
    }
    this.t=setTimeout(this.tick,d);
  };
  tick6=()=>{
    const n=this.state.s6n;let d;
    if(this.p6==='type'){if(n<W6.length){this.setState({s6n:n+1});d=n+1===W6.length?2600:90;}else{this.p6='erase';d=40;}}
    else{if(n>0){this.setState({s6n:n-1});d=40;}else{this.p6='type';d=1200;}}
    this.t6=setTimeout(this.tick6,d);
  };
  copy=(key,text)=>{try{navigator.clipboard.writeText(text);}catch(e){}this.setState({copied:key});clearTimeout(this.ct);this.ct=setTimeout(()=>this.setState({copied:null}),1800);};
  renderVals(){
    const s=this.state,lead=this.props.heroLead??'weight',narrow=s.w<720;
    const c=CYC[s.cyc],typed=c.full.slice(0,s.n),toks=typed.split(' ');
    const applied=(s.n>=c.full.length?toks:toks.slice(0,-1)).filter(Boolean);
    const demo={tag:c.tag,isBtn:c.tag==='button',isSpan:c.tag!=='button',label:c.label,typed,cls:applied.join(' '),
      slots:['shape','style','colour'].map((l,i)=>({label:l,cls:i<applied.length?'pui-badge pui-soft pui-theme':'pui-badge pui-outline pui-surface'}))};
    const row=(lib,i)=>{const p=ease((s.el-250-i*110)/1300);return{name:lib.name,version:lib.version,css:(lib.css/MAX*100*p).toFixed(3),js:(lib.js/MAX*100*p).toFixed(3),total:fmt((lib.css+lib.js)*p),split:lib.js?fmt(lib.css*p)+' + '+fmt(lib.js*p):''};};
    const rows=LIBS.map(row);
    const hp=Math.min(1,s.heroP/0.85);
    const sh=SHAPES.find(x=>x[0]===s.shape);
    const set=(k,v)=>()=>this.setState({[k]:v,changed:k});
    const chip=on=>on?'pui-chip pui-solid pui-inverse':'pui-chip pui-outline pui-surface';
    const hl=k=>s.changed===k?'pui-soft pui-theme pui-rounded':'';
    const s5mode=s.s5dark?'dark':'light';
    const w6=s.s6n>=W6.length;
    return {
      wide:!narrow,narrow,
      L:{nameFlex:narrow?'1 1 auto':'0 0 216px',barFlex:narrow?'1 1 100%':'1 1 0%',barOrder:narrow?3:0},
      isLight:s.mode==='light',isDark:s.mode==='dark',modeLabel:s.mode==='light'?'Switch to dark mode':'Switch to light mode',
      toggleMode:()=>this.setState({mode:s.mode==='light'?'dark':'light',s5dark:s.mode==='light'}),
      inverseMode:s.mode==='light'?'dark':'light',
      themeHex:s.themeHex||'#0092cd',
      pickTheme:e=>{const v=e.target.value;document.documentElement.style.setProperty('--pui-theme',v);this.setState({themeHex:v});},
      themes:THEMES.map(t=>({...t,pick:()=>{const r=document.documentElement.style;t.v?r.setProperty('--pui-theme',t.v):r.removeProperty('--pui-theme');const m=document.getElementById('pui-theme-menu');m&&m.hidePopover&&m.hidePopover();}})),
      heroRef:this.heroRef,chartRef:this.chartRef,s6Ref:this.s6Ref,
      leadWeight:lead==='weight',leadHeadline:lead==='headline',giantInline:lead==='weight'&&narrow,giantBottom:lead==='weight'&&!narrow,
      cp:{heroOn:s.copied==='hero',heroOff:s.copied!=='hero',pkgOn:s.copied==='pkg',pkgOff:s.copied!=='pkg',cdnOn:s.copied==='cdn',cdnOff:s.copied!=='cdn'},
      copyHero:()=>this.copy('hero',PKG.npm),copyPkg:()=>this.copy('pkg',PKG[s.tab]),copyCdn:()=>this.copy('cdn',CDN),
      demo,caretOn:!this.reduced,demoStep:applied.length+' / 3',
      heroBars:{p:{h:(LIBS[0].css+LIBS[0].js)/MAX*100},rest:LIBS.slice(1).map(l=>({h:((l.css+l.js)/MAX*100).toFixed(2)}))},
      heroScale:(0.35+0.65*hp).toFixed(3),heroOpacity:(0.25+0.75*hp).toFixed(3),
      rowP:rows[0],rows:rows.slice(1),
      shapeChips:SHAPES.map(x=>({label:x[1],cls:chip(s.shape===x[0]),pressed:String(s.shape===x[0]),pick:set('shape',x[0])})),
      styleChips:STYLES.map(x=>({label:x,cls:chip(s.style===x),pressed:String(s.style===x),pick:set('style',x)})),
      colourChips:COLOURS.map(x=>({label:x,cls:chip(s.colour===x),pressed:String(s.colour===x),pick:set('colour',x)})),
      live:{tag:s.shape==='btn'?'button':'span',label:sh[2],cls:`pui-${s.shape} pui-${s.style} pui-${s.colour}`,
        tokens:[{t:'pui-'+s.shape,cls:hl('shape')},{t:' ',cls:''},{t:'pui-'+s.style,cls:hl('style')},{t:' ',cls:''},{t:'pui-'+s.colour,cls:hl('colour')}]},
      colourNames:COLOURS,
      matrix:STYLES.map(st=>({name:st,cells:COLOURS.map(co=>{const sel=st===s.style&&co===s.colour;return{cls:`pui-${s.shape} pui-${st} pui-${co}`,aria:`${st} ${co}`,ring:sel?'var(--pui-theme)':'transparent',pick:()=>this.setState({style:st,colour:co,changed:st!==s.style?'style':'colour'})};})})),
      s5:{mode:s5mode,dark:s.s5dark,theme:S5[s.s5i].v,hex:S5[s.s5i].label,toggle:e=>this.setState({s5dark:e.target.checked}),
        swatches:S5.map((x,i)=>({label:x.label,v:x.v,checked:i===s.s5i,pick:()=>this.setState({s5i:i})}))},
      s6:{typed:W6.slice(0,s.s6n),cls:'pui-btn pui-solid pui-theme'+(w6?' w-full':'')},
      layers:LAYERS.map((n,i)=>({n,i:String(i+1)})),
      strikes:STRIKES.map((t,i)=>({text:t,ref:this.strikeRefs[i],w:s.struck[i]?'calc(100% + 8px)':'0%',color:s.struck[i]?'var(--pui-text-muted)':'var(--pui-text)'})),
      tabs:Object.keys(PKG).map(k=>({label:k,cls:s.tab===k?'pui-btn pui-solid pui-inverse':'pui-btn pui-outline pui-surface',pressed:String(s.tab===k),pick:()=>this.setState({tab:k})})),
      tabCmd:PKG[s.tab]
    };
  }
}
