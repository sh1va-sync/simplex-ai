'use client';

import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function Motion({children}:{children:React.ReactNode}){
  const root=useRef<HTMLDivElement>(null);
  const progress=useRef<HTMLDivElement>(null);
  const pathname=usePathname();
  const [paused,setPaused]=useState(false);

  useEffect(()=>{
    if(!root.current)return;
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      if(paused || !root.current)return;
      const container=root.current;
      const context=gsap.context(()=>{
        if(progress.current)gsap.fromTo(progress.current,{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.15}});
      },container);
      return ()=>context.revert();
    });
    return ()=>media.revert();
  },[pathname,paused]);

  useEffect(()=>{
    if(paused || pathname!=='/')return;
    const media=window.matchMedia('(min-width: 761px) and (prefers-reduced-motion: no-preference)');
    let cleanup:undefined|(()=>void);
    const sync=()=>{
      cleanup?.();
      cleanup=undefined;
      if(!media.matches)return;
      const lenis=new Lenis({duration:1.05,smoothWheel:true,autoRaf:false,anchors:{offset:-76}});
      lenis.on('scroll',ScrollTrigger.update);
      const tick=(time:number)=>lenis.raf(time*1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup=()=>{gsap.ticker.remove(tick);lenis.destroy();gsap.ticker.lagSmoothing(500,33);};
    };
    sync();
    media.addEventListener('change',sync);
    return ()=>{media.removeEventListener('change',sync);cleanup?.();};
  },[pathname,paused]);

  return <div ref={root} className="motion-root" data-motion={paused?'reduced':'full'}>
    <div ref={progress} className="reading-progress" aria-hidden="true"/>
    {children}
    <button className="motion-toggle" type="button" aria-label="Pause decorative motion" aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{paused?<path d="m5 3 8 5-8 5Z"/>:<path d="M4 3h3v10H4zm5 0h3v10H9z"/>}</svg>
      {paused?'Motion paused':'Pause motion'}
    </button>
  </div>;
}
