'use client';
import { useState } from 'react';
import Link from './transition-link';
import { Arrow } from './ui';
const modes = [
  { name: 'Design', title: 'Clarity, with character.', text: 'Interfaces that feel as good as they work. We connect your brand, your users, and every little interaction.', tags: ['Visual identity', 'Product design', 'Interactive prototypes'], label: 'IDEA → EXPERIENCE' },
  { name: 'Engineering', title: 'Made to go further.', text: 'Thoughtful architecture meets meticulous execution. Fast, accessible products with room for your next big idea.', tags: ['Web & mobile', 'Scalable systems', 'API integrations'], label: 'EXPERIENCE → PRODUCT' },
  { name: 'Intelligence', title: 'A smarter kind of simple.', text: 'Useful AI built around real problems. We connect knowledge, automate workflows, and keep people in control.', tags: ['AI agents', 'Knowledge systems', 'Human oversight'], label: 'PRODUCT → POSSIBILITY' },
];
export default function Playground() {
  const [active, setActive] = useState(0);
  const mode = modes[active];
  return <section className="lab-section wrap section">
    <div className="eyebrow">03 / CONNECT THE DOTS</div>
    <div className="lab-layout"><div><h2>Different disciplines.<br/><span className="muted-heading">One shared vision.</span></h2>
      <div className="discipline-tabs" role="tablist" aria-label="Our disciplines">{modes.map((m,i)=><button key={m.name} id={`discipline-${i}`} role="tab" aria-selected={active===i} aria-controls="discipline-panel" tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{const next=e.key==='ArrowRight'?(i+1)%3:e.key==='ArrowLeft'?(i+2)%3:e.key==='Home'?0:e.key==='End'?2:null;if(next!==null){e.preventDefault();setActive(next);document.getElementById(`discipline-${next}`)?.focus();}}}>{m.name}</button>)}</div>
      <div id="discipline-panel" role="tabpanel" aria-labelledby={`discipline-${active}`} tabIndex={0} className="discipline-panel"><span className="eyebrow">{mode.label}</span><h3>{mode.title}</h3><p>{mode.text}</p><div className="tags">{mode.tags.map(t=><span key={t}>{t}</span>)}</div></div>
      <Link className="text-link" href="/services">See how it comes together <Arrow/></Link>
    </div><div className={`system-visual system-mode-${active}`} aria-hidden="true"><div className="system-grid"/><div className="system-orbit orbit-a"/><div className="system-orbit orbit-b"/><div className="system-core">s<span>✳</span></div><span className="system-node node-design">01 / DESIGN</span><span className="system-node node-build">02 / ENGINEERING</span><span className="system-node node-ai">03 / INTELLIGENCE</span><span className="system-caption">CONNECTED BY INTENTION.</span></div></div>
  </section>;
}
