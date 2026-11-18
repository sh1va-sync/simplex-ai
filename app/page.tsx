import Link from './transition-link';
import { Arrow, OutcomeCTA, outcomes } from './ui';
import HomeExperience from './home-experience';

const steps = [
  ['01', 'Find the constraint', 'We map the workflow, baseline the current result, and choose one outcome worth improving.'],
  ['02', 'Put AI into the work', 'We connect your data and tools, build a bounded workflow, and test it with the people who use it.'],
  ['03', 'Own the result', 'We monitor quality, cost, and adoption. Then we improve the system as your business changes.'],
];

export default function Home() {
  return <>
    <HomeExperience/>
    <section className="capability-strip" aria-label="The work we change"><div className="marquee-track"><div className="marquee-group"><span>THE WORK WE CHANGE</span><b>Faster answers</b><i>✳</i><b>Fewer handoffs</b><i>✳</i><b>Better decisions</b><i>✳</i><b>More capacity</b><i>✳</i></div><div className="marquee-group" aria-hidden="true"><span>THE WORK WE CHANGE</span><b>Faster answers</b><i>✳</i><b>Fewer handoffs</b><i>✳</i><b>Better decisions</b><i>✳</i><b>More capacity</b><i>✳</i></div></div></section>
    <section id="outcomes" className="section wrap"><div className="section-heading"><div><div className="eyebrow">01 / WHAT IMPROVES</div><h2>Buy the result.<br/><span className="muted-heading">Build what gets you there.</span></h2></div><p>Every engagement starts with a business measure and a real workflow. The technology follows the outcome.</p></div><div className="expertise-index">{outcomes.map((item,i)=><Link href={`/services#outcome-${i}`} className="expertise-row" key={item.name}><span className="expertise-number">0{i+1}</span><h3>{item.name}</h3><p>{item.desc}</p><span className="expertise-arrow"><Arrow/></span></Link>)}</div><div className="section-foot"><span>We define the baseline and target together.</span><Link className="text-link" href="/services">Explore the outcomes <Arrow/></Link></div></section>
    <section className="section outcome-panel"><div className="wrap outcome-panel-grid"><div><div className="eyebrow">02 / THE SERVICE MODEL</div><h2>One partner.<br/><span className="accent-text">Ongoing progress.</span></h2><p>We design, deploy, and operate AI-enabled workflows as a service. Your team gets a working system, clear ownership, and a rhythm for improving the result.</p><Link className="text-link" href="/about">How we work <Arrow/></Link></div><div className="outcome-measures"><div><span>01 / DEFINE</span><h3>Agree on success</h3><p>Choose the measure that matters: resolution time, hours returned, conversion, quality, or another operational KPI.</p></div><div><span>02 / DEPLOY</span><h3>Work inside your stack</h3><p>Connect existing tools and knowledge. Add human review, permissions, and escalation where the workflow needs them.</p></div><div><span>03 / IMPROVE</span><h3>Keep earning trust</h3><p>Review performance, failures, adoption, and cost. Tune the service with your team after it goes live.</p></div></div></div></section>
    <section className="section wrap process-preview"><div><div className="eyebrow">03 / FROM OPPORTUNITY TO OPERATION</div><h2>A practical path<br/><span className="muted-heading">to useful AI.</span></h2><p>No grand transformation required. We begin where delay, repetition, or missed context is costing your team the most.</p><Link className="text-link" href="/contact">Find your starting point <Arrow/></Link></div><div className="steps">{steps.map(([n,t,d])=><div className="step" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><Arrow/></div>)}</div></section>
    <section className="section wrap faq-section"><div><div className="eyebrow">04 / STRAIGHT ANSWERS</div><h2>What does working<br/><span className="muted-heading">together look like?</span></h2></div><div>{[
      ['Do we need a defined AI project?', 'No. Bring a workflow that is slow, expensive, or frustrating. We help establish the baseline, target, and right first use case.'],
      ['What if our data is messy?', 'We assess the sources and gaps during discovery. The first service can be deliberately narrow while we improve the knowledge and integrations it depends on.'],
      ['Will people stay in control?', 'Yes. We define approval points, escalation paths, and access boundaries around each workflow. We also measure where the system needs human help.'],
      ['What happens after launch?', 'The service includes an operating rhythm: monitor outcomes, review quality, resolve failures, and prioritize improvements together.'],
    ].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    <OutcomeCTA/>
  </>;
}
