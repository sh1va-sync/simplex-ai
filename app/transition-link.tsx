'use client';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useRef, type ComponentProps, type ReactNode } from 'react';
import gsap from 'gsap';

const NavigationContext = createContext<((href: string) => void) | null>(null);
const titles: Record<string, string> = { '/': 'The studio', '/services': 'Our expertise', '/work': 'Selected possibilities', '/about': 'Our perspective', '/contact': 'Your next chapter' };

export function RouteTransitions({children}:{children:ReactNode}) {
  const router=useRouter();
  const pathname=usePathname();
  const curtain=useRef<HTMLDivElement>(null);
  const label=useRef<HTMLSpanElement>(null);
  const pending=useRef(false);
  const timeout=useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('.motion-root')?.getAttribute('data-motion')==='reduced';
  const clear=useCallback(()=>{
    if(timeout.current) clearTimeout(timeout.current);
    pending.current=false;
    if(curtain.current) gsap.set(curtain.current,{pointerEvents:'none'});
  },[]);
  const navigate=useCallback((href:string)=>{
    if(pending.current || !curtain.current) return;
    pending.current=true;
    const destination=new URL(href,window.location.href);
    if(label.current)label.current.textContent=titles[destination.pathname]||'Simplex AI';
    const soft=reduced();
    gsap.killTweensOf(curtain.current);
    gsap.set(curtain.current,{pointerEvents:'auto',transformOrigin:'bottom',scaleY:soft?1:0,opacity:soft?0:1});
    gsap.to(curtain.current,{scaleY:1,opacity:1,duration:soft?.12:.26,ease:'power3.inOut',onComplete:()=>router.push(href)});
    // A failed/aborted navigation must never leave an opaque layer blocking the site.
    timeout.current=setTimeout(()=>{gsap.to(curtain.current,{opacity:0,duration:.15,onComplete:clear});},5000);
  },[router,clear]);
  useEffect(()=>{
    if(!curtain.current || !pending.current) return;
    if(timeout.current)clearTimeout(timeout.current);
    gsap.killTweensOf(curtain.current);
    const soft=reduced();
    gsap.set(curtain.current,{transformOrigin:'top'});
    gsap.to(curtain.current,{...(soft?{opacity:0}:{scaleY:0}),duration:soft?.15:.38,ease:'power3.inOut',onComplete:clear});
  },[pathname,clear]);
  useEffect(()=>()=>{if(timeout.current)clearTimeout(timeout.current);gsap.killTweensOf(curtain.current);},[]);
  return <NavigationContext.Provider value={navigate}>{children}<div ref={curtain} className="route-curtain" aria-hidden="true"><div className="curtain-brand">s<span>✳</span></div><span ref={label} className="curtain-label">Simplex AI</span><span className="curtain-caption">A NEW PERSPECTIVE.</span></div></NavigationContext.Provider>;
}

export default function TransitionLink(props:Omit<ComponentProps<typeof NextLink>,'onNavigate'>) {
  const navigate=useContext(NavigationContext);
  return <NextLink {...props} onNavigate={event=>{
    if(!navigate || typeof props.href!=='string')return;
    const destination=new URL(props.href,window.location.href);
    if(destination.origin!==window.location.origin || destination.pathname===window.location.pathname)return;
    event.preventDefault();navigate(destination.pathname+destination.search+destination.hash);
  }}/>;
}
