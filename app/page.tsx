import Motion from './motion';
import Link from 'next/link';
import { Arrow, CallToAction, ServiceGrid, ProjectGrid, Orb } from './ui';
export default function Home() {
  return <Motion>
    <section className="hero wrap">
      <div className="hero-copy"><div className="eyebrow"><span className="status-dot"/> YOUR IDEAS. OUR EXPERTISE.</div>
        <h1>Big ideas.<br/>Beautifully built<span className="orange">.</span></h1>
        <p>We turn ambitious ideas into websites, apps, and intelligent AI experiences. Thoughtfully designed. Expertly engineered. Built for what’s next.</p>
        <div className="button-row"><Link className="button primary" href="/contact">Let’s build something <Arrow/></Link><Link className="text-link" href="/work">Explore our work <Arrow/></Link></div>
        <div className="hero-note"><span className="mini-mark">S</span><span>Your vision. A dedicated partner.<br/><strong>From the first conversation to launch.</strong></span></div>
      </div>
      <div className="hero-art"><span className="art-coordinate">S / AI — 001</span><Orb/><div className="floating-label label-top"><span className="tiny-icon">⌘</span> Human-centered design</div><div className="floating-label label-bottom"><span className="status-dot"/> Powered by possibility <span>↗</span></div><span className="art-caption">COMPLEX CHALLENGES. SIMPLE SOLUTIONS.</span></div>
    </section>
    <section className="capability-strip"><div className="wrap"><span>IDEA TO IMPACT</span><b>Websites</b><i>✳</i><b>Web applications</b><i>✳</i><b>Mobile apps</b><i>✳</i><b>AI & automation</b></div></section>
    <section className="section wrap"><div className="section-heading"><div><div className="eyebrow">01 / WHAT WE DO</div><h2>One partner.<br/>Every digital possibility.</h2></div><div><p>From your first website to your next intelligent product, we connect design, development, and AI.</p><Link className="text-link" href="/services">Discover our services <Arrow/></Link></div></div><ServiceGrid compact/></section>
    <section className="work-section section"><div className="wrap"><div className="section-heading"><div><div className="eyebrow">02 / POSSIBILITIES IN PRACTICE</div><h2>Ideas made tangible.</h2></div><Link className="text-link" href="/work">Explore the concepts <Arrow/></Link></div><ProjectGrid/></div></section>
    <section className="section wrap process-preview"><div><div className="eyebrow">03 / THE SIMPLEX WAY</div><h2>Less complexity.<br/>More progress.</h2><p>Good software starts with a good partnership. We keep you involved, make the technical decisions clear, and build with your business in mind.</p><Link className="text-link" href="/about">Get to know us <Arrow/></Link></div><div className="steps">{[['01','Understand the vision','We listen, ask the right questions, and define what success looks like.'],['02','Design with intention','We turn the plan into clear, intuitive experiences you can explore.'],['03','Build. Refine. Launch.','We develop in focused stages, test the details, and help you go live.']].map(([n,t,d])=><div className="step" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><Arrow/></div>)}</div></section>
    <section className="section wrap faq-section"><div><div className="eyebrow">A FEW GOOD QUESTIONS</div><h2>Let’s clear things up.</h2></div><div>{[['What can you help us build?','We build websites, web applications, mobile apps, AI agents, customer support assistants, and workflow automations. We can start with an idea or improve an existing product.'],['Do I need a detailed brief to get started?','No. A rough idea, the problem you want to solve, and some context about your business are enough for an initial conversation.'],['How much will my project cost?','Pricing depends on scope, integrations, complexity, and timeline. We define deliverables together before proposing a project estimate.'],['Can you help after launch?','Yes. We can discuss ongoing maintenance, improvements, monitoring, and support as part of your project scope.']].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    <CallToAction/>
  </Motion>;
}

