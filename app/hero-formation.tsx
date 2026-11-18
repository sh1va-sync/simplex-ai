'use client';

import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';

const stages=[
  {number:'01',label:'Find the friction',detail:'A real workflow. A clear baseline.'},
  {number:'02',label:'Build the flow',detail:'Knowledge, tools, and people connected.'},
  {number:'03',label:'Own the outcome',detail:'Quality measured. Capacity returned.'},
];

export default function HeroFormation({activeStep,onStepChange}:{activeStep?:number;onStepChange?:(step:number)=>void}={}){
  const scene=useRef<HTMLDivElement>(null);
  const field=useRef<HTMLDivElement>(null);
  const [localActive,setLocalActive]=useState(1);
  const active=activeStep??localActive;
  const selectStep=(step:number)=>{setLocalActive(step);onStepChange?.(step);};

  useEffect(()=>{
    if(!scene.current)return;
    const context=gsap.context(()=>{
      gsap.set('.formation-path',{strokeDasharray:620,strokeDashoffset:620});
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        gsap.set('.formation-path',{strokeDashoffset:0});
        return;
      }
      gsap.to('.formation-path',{strokeDashoffset:0,duration:1.15,stagger:.12,ease:'power2.out',delay:.18});
      gsap.from('.formation-node',{scale:.9,opacity:0,duration:.55,stagger:.09,ease:'back.out(1.5)',delay:.42});
    },scene);
    return ()=>context.revert();
  },[]);

  useEffect(()=>{
    if(!scene.current)return;
    const quiet=window.matchMedia('(prefers-reduced-motion: reduce)').matches || scene.current.closest('.motion-root')?.getAttribute('data-motion')==='reduced';
    const paths=scene.current.querySelectorAll('.formation-path');
    paths.forEach((path,index)=>gsap.to(path,{opacity:index===active?1:.26,duration:quiet?0:.35}));
  },[active]);

  function move(event:React.PointerEvent<HTMLDivElement>){
    if(!field.current || !scene.current || event.pointerType==='touch')return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || scene.current.closest('.motion-root')?.getAttribute('data-motion')==='reduced')return;
    const bounds=scene.current.getBoundingClientRect();
    const x=(event.clientX-bounds.left)/bounds.width-.5;
    const y=(event.clientY-bounds.top)/bounds.height-.5;
    gsap.to(field.current,{x:x*18,y:y*18,rotationY:x*7,rotationX:-y*7,duration:.55,ease:'power2.out',overwrite:'auto'});
  }

  function leave(){if(field.current)gsap.to(field.current,{x:0,y:0,rotationX:0,rotationY:0,duration:.7,ease:'power3.out',overwrite:'auto'});}

  return <div ref={scene} className="formation-scene" onPointerMove={move} onPointerLeave={leave} aria-label="Interactive diagram of the Simplex AI service process">
    <div className="formation-topline"><span><span className="formation-live"/> SYSTEM / ACTIVE</span><span>INTERACTIVE MODEL <span aria-hidden="true">↗</span></span></div>
    <div ref={field} className="formation-field">
      <svg className="formation-svg" viewBox="0 0 700 560" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="formation-core-gradient"><stop stopColor="#b7d5ff"/><stop offset=".27" stopColor="#6da2ff"/><stop offset=".67" stopColor="#2d66d7"/><stop offset="1" stopColor="#12347f"/></radialGradient>
          <linearGradient id="formation-line-gradient" x1="90" y1="100" x2="610" y2="450" gradientUnits="userSpaceOnUse"><stop stopColor="#7cb5ff" stopOpacity=".3"/><stop offset=".5" stopColor="#c9e4ff"/><stop offset="1" stopColor="#7cb5ff" stopOpacity=".35"/></linearGradient>
          <filter id="formation-glow"><feGaussianBlur stdDeviation="18"/></filter>
        </defs>
        <ellipse cx="352" cy="282" rx="206" ry="151" stroke="#86b6ff" strokeOpacity=".16"/>
        <ellipse cx="352" cy="282" rx="255" ry="194" stroke="#86b6ff" strokeOpacity=".08"/>
        <path className="formation-path" d="M315 252C253 171 204 150 151 143" stroke="url(#formation-line-gradient)" strokeWidth="2"/>
        <path className="formation-path" d="M389 255C445 173 490 160 555 154" stroke="url(#formation-line-gradient)" strokeWidth="2"/>
        <path className="formation-path" d="M390 318C440 382 499 400 554 412" stroke="url(#formation-line-gradient)" strokeWidth="2"/>
        <circle cx="352" cy="282" r="116" fill="#478cff" opacity=".18" filter="url(#formation-glow)"/>
        <g className="formation-core">
          <circle cx="352" cy="282" r="94" fill="#173f9e" stroke="#a7cbff" strokeOpacity=".4"/>
          <circle cx="352" cy="282" r="78" fill="url(#formation-core-gradient)"/>
          <circle cx="352" cy="282" r="63" stroke="#eaf5ff" strokeOpacity=".52"/>
          <path d="M352 230v104M300 282h104M315 245l74 74M389 245l-74 74" stroke="#e5f2ff" strokeOpacity=".8" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="352" cy="282" r="19" fill="#eaf5ff"/>
          <circle cx="352" cy="282" r="8" fill="#2455d6"/>
          <circle cx="352" cy="188" r="5" fill="#dceeff"/>
          <circle cx="446" cy="282" r="5" fill="#dceeff"/>
          <circle cx="352" cy="376" r="5" fill="#dceeff"/>
          <circle cx="258" cy="282" r="5" fill="#dceeff"/>
        </g>
        <circle cx="151" cy="143" r="5" fill="#dceeff"/>
        <circle cx="555" cy="154" r="5" fill="#dceeff"/>
        <circle cx="554" cy="412" r="5" fill="#dceeff"/>
      </svg>
      {stages.map((stage,index)=><button key={stage.number} type="button" className={`formation-node formation-node-${index+1}${active===index?' is-active':''}`} aria-pressed={active===index} onClick={()=>selectStep(index)} onFocus={()=>selectStep(index)}>
        <span>{stage.number}</span><strong>{stage.label}</strong><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5"/></svg>
      </button>)}
    </div>
    <div className="formation-readout"><span>ACTIVE STEP / {stages[active].number}</span><strong>{stages[active].detail}</strong><span className="formation-readout-bars" aria-hidden="true"><i/><i/><i/><i/><i/></span></div>
  </div>;
}
