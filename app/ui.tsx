import Link from './transition-link';

export function Arrow(){
  return <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}

export function Mark(){
  return <svg aria-hidden="true" width="31" height="34" viewBox="0 0 31 34" fill="none"><path d="M17 2 3 15h12L8 32l20-20H16l8-10Z" fill="currentColor"/></svg>;
}

export function Icon({type}:{type:number}){
  const paths=[
    'M3 5h18v14H3z M3 9h18 M7 7h.1 M10 7h.1',
    'm8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18',
    'M7 2h10v20H7z M10 18h4',
    'M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8 2 2M6 18l2-2M16 8l2-2M9 9h6v6H9z',
  ];
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[type]}/></svg>;
}

export const outcomes=[
  {name:'Resolve customer needs faster',desc:'Give customers useful answers and your team a clear path for the cases that need a person.',detail:'Connect approved knowledge and customer context to a support workflow that can answer, route, and escalate. Measure resolution time, answer quality, and handoff rate.',items:['AI-assisted answers grounded in approved sources','Intent routing and human escalation','Quality review and continuous improvement'],measure:'Time to resolution'},
  {name:'Return time to your team',desc:'Take repetitive requests and handoffs out of the day without losing control of the work.',detail:'Identify repeatable steps across inboxes, forms, documents, and business tools. Automate the routine path and keep people in charge of exceptions.',items:['Workflow mapping and baseline','Bounded agents and system integrations','Exception handling and approval points'],measure:'Hours returned'},
  {name:'Turn knowledge into decisions',desc:'Make hard-to-find information available where decisions are made.',detail:'Bring scattered documents and operational data into a reliable retrieval and decision support flow. Show the source, surface uncertainty, and learn from usage.',items:['Knowledge ingestion and permissions','Search and decision support','Evaluation, feedback, and governance'],measure:'Decision cycle time'},
  {name:'Make digital journeys convert',desc:'Remove friction from customer journeys with timely, relevant assistance.',detail:'Help people choose, onboard, and complete tasks with a digital experience that can adapt to their context. Track completion and conversion rather than output volume.',items:['Journey diagnosis and redesign','Context-aware assistance','Conversion and experience measurement'],measure:'Completion rate'},
];

export function ServiceSystem(){
  return <div className="service-system" role="img" aria-label="Service flow from business signal through AI assistance to a measured outcome">
    <div className="system-top"><span><span className="status-dot"/> SERVICE ACTIVE</span><span>01 / WORKFLOW</span></div>
    <div className="system-heading"><span>INPUT</span><span>INTELLIGENCE</span><span>RESULT</span></div>
    <div className="system-track">
      <div><small>01 / SIGNAL</small><strong>Customer request</strong><span>Context captured</span></div>
      <b aria-hidden="true">→</b>
      <div><small>02 / RESPONSE</small><strong>AI + human judgment</strong><span>Knowledge checked</span></div>
      <b aria-hidden="true">→</b>
      <div><small>03 / OUTCOME</small><strong>Faster resolution</strong><span>Quality reviewed</span></div>
    </div>
    <div className="system-bottom"><span>MEASURE WHAT CHANGES</span><span>REVIEW · IMPROVE · REPEAT</span></div>
  </div>;
}

export function OrbScene({compact=false}:{compact?:boolean}){
  return <div className={`orb-scene${compact?' orb-scene-compact':''}`} role="img" aria-label="A dimensional blue core surrounded by orbital rings, representing connected work">
    <div className="orb-glow"/>
    <div className="orb-object">
      <div className="orb-ring orb-ring-one"/>
      <div className="orb-ring orb-ring-two"/>
      <div className="orb-ring orb-ring-three"/>
      <div className="orb-core"><span className="orb-core-mark">✳</span></div>
      <div className="orb-satellite orb-satellite-one"/>
      <div className="orb-satellite orb-satellite-two"/>
    </div>
    <span className="orb-label orb-label-top">SIGNAL → SYSTEM</span>
    <span className="orb-label orb-label-bottom">SYSTEM → OUTCOME</span>
  </div>;
}

export function OutcomeCTA(){
  return <section className="cta wrap">
    <div className="eyebrow"><span className="status-dot"/> START WITH ONE OUTCOME</div>
    <div><h2>Let’s make work<br/><span>work better.</span></h2><Link className="cta-circle" href="/contact" aria-label="Discuss an outcome"><Arrow/></Link></div>
    <div className="cta-bottom"><p>Tell us what is slowing your team or customers down.</p><Link className="text-link" href="/contact">Start the conversation <Arrow/></Link></div>
  </section>;
}
