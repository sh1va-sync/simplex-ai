'use client';

import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Link from './transition-link';
import {Arrow} from './ui';
import HeroFormation from './hero-formation';

gsap.registerPlugin(ScrollTrigger);

const phases=[
  {number:'01 / DISCOVER',title:'See the friction clearly.',body:'We start with the request, handoff, or decision that slows your team down.'},
  {number:'02 / CONNECT',title:'Put intelligence in the flow.',body:'People, knowledge, and tools work together inside a bounded service.'},
  {number:'03 / IMPROVE',title:'Keep the outcome moving.',body:'We measure quality, adoption, and impact, then improve what is running.'},
];

export default function HomeExperience(){
  const root=useRef<HTMLElement>(null);
  const [active,setActive]=useState(0);

  useEffect(()=>{
    if(!root.current)return;
    let media=gsap.matchMedia();
    const observer=new MutationObserver(()=>setup());
    const motionRoot=root.current.closest('.motion-root');

    const setup=()=>{
      media.revert();
      media=gsap.matchMedia();
      if(!root.current || motionRoot?.getAttribute('data-motion')==='reduced')return;
      media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)',()=>{
        const section=root.current;
        if(!section)return;
        const context=gsap.context(()=>{
          const timeline=gsap.timeline({scrollTrigger:{
            trigger:section,start:'top 76px',end:()=>`+=${Math.round(window.innerHeight*2.25)}`,
            pin:true,scrub:.85,anticipatePin:1,invalidateOnRefresh:true,
            onUpdate:self=>setActive(self.progress<.48?0:self.progress<.76?1:2),
          }});
          timeline.to('.immersive-intro',{opacity:0,y:-72,duration:.55,ease:'none'},.15)
            .to('.immersive-visual',{xPercent:-9,yPercent:-3,scale:1.12,duration:3.4,ease:'none'},0)
            .to('.hero-depth-one',{y:-100,x:36,duration:3,ease:'none'},0)
            .to('.hero-depth-two',{y:90,x:-44,duration:3,ease:'none'},0)
            .fromTo('.hero-phase-0',{opacity:0,y:36},{opacity:1,y:0,duration:.22,ease:'none'},.58)
            .to('.hero-phase-0',{opacity:0,y:-32,duration:.22,ease:'none'},1.42)
            .fromTo('.hero-phase-1',{opacity:0,y:36},{opacity:1,y:0,duration:.22,ease:'none'},1.52)
            .to('.hero-phase-1',{opacity:0,y:-32,duration:.22,ease:'none'},2.37)
            .fromTo('.hero-phase-2',{opacity:0,y:36},{opacity:1,y:0,duration:.22,ease:'none'},2.47);
          ScrollTrigger.refresh();
        },section);
        return ()=>context.revert();
      });
    };
    setup();
    if(motionRoot)observer.observe(motionRoot,{attributes:true,attributeFilter:['data-motion']});
    return ()=>{observer.disconnect();media.revert();};
  },[]);

  return <section ref={root} className="immersive-hero" aria-label="Simplex AI introduction">
    <div className="hero-depth hero-depth-one" aria-hidden="true"/><div className="hero-depth hero-depth-two" aria-hidden="true"/>
    <div className="immersive-hero-inner wrap">
      <div className="immersive-kicker"><span><span className="status-dot"/> SIMPLEX AI / AI-NATIVE SERVICES</span><span>BUILT FOR WHAT COMES NEXT <span aria-hidden="true">↗</span></span></div>
      <div className="immersive-intro"><h1><span>Make work</span><span>move<span className="immersive-period">.</span></span></h1><p>We turn slow workflows into intelligent services that keep getting better.</p><div className="immersive-actions"><Link className="button immersive-primary" href="/contact">Talk through an outcome <Arrow/></Link><Link className="immersive-secondary" href="/services">Explore services <Arrow/></Link></div></div>
      <div className="immersive-visual"><HeroFormation activeStep={active} onStepChange={setActive}/></div>
      <div className="hero-phases" aria-live="polite">{phases.map((phase,index)=><div className={`hero-phase hero-phase-${index}`} key={phase.number}><span>{phase.number}</span><h2>{phase.title}</h2><p>{phase.body}</p></div>)}</div>
      <div className="immersive-bottom"><span>SCROLL TO EXPLORE THE SYSTEM</span><span className="immersive-scroll-line" aria-hidden="true"/><span>{String(active+1).padStart(2,'0')} <span className="immersive-bottom-dim">/ 03</span></span></div>
    </div>
  </section>;
}
