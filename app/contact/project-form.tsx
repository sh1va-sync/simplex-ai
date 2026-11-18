'use client';
import {useState} from 'react';
import {Arrow,outcomes} from '../ui';

export default function ContactForm(){
  const [done,setDone]=useState(false);
  const [selected,setSelected]=useState<string[]>([]);
  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const data=new FormData(e.currentTarget);
    const brief=`SIMPLEX AI — OUTCOME CONVERSATION

Name: ${data.get('name')}
Email: ${data.get('email')}
Company: ${data.get('company')||'Not provided'}
Priorities: ${selected.join(', ')||'To be explored'}
Timeframe: ${data.get('timeline')}

Current workflow and desired result
${data.get('details')}
`;
    const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');
    a.href=url;
    a.download='simplex-ai-outcome-brief.txt';
    a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    setDone(true);
  }
  return <form className="project-form" onSubmit={submit}>
    <h2>Tell us what needs to change.</h2>
    <p className="form-intro">A few details will help us make the first conversation useful.</p>
    <div className="form-row">
      <label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={100}/></label>
      <label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={200}/></label>
    </div>
    <label>Company <span className="optional">(optional)</span><input name="company" autoComplete="organization" placeholder="Your company" maxLength={200}/></label>
    <fieldset><legend>Which result matters most?</legend><div className="service-options">{outcomes.map(item=><label className={selected.includes(item.name)?'option selected':'option'} key={item.name}><input type="checkbox" checked={selected.includes(item.name)} onChange={()=>setSelected(old=>old.includes(item.name)?old.filter(name=>name!==item.name):[...old,item.name])}/>{item.name}</label>)}</div></fieldset>
    <label>When would you like to start?<select name="timeline" defaultValue="Exploring"><option>Exploring</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>Flexible</option></select></label>
    <label>What happens today, and what should improve? <span>*</span><textarea name="details" rows={6} placeholder="Describe the workflow, where it gets stuck, and the result you would like to see." required minLength={20} maxLength={10000}/><small>At least 20 characters. A rough description is fine.</small></label>
    <button className="button primary" type="submit">{done?'Download brief again':'Download conversation brief'}<Arrow/></button>
    <p className="form-privacy">Your details stay in your browser and are included only in your downloaded brief.</p>
    {done&&<div role="status" className="form-success">Your brief is ready. Attach the downloaded file to an email using the contact link on this page. Nothing was sent automatically.</div>}
  </form>;
}
