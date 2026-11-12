'use client';

import {useState} from 'react';
import {Arrow,services} from '../ui';

export default function ContactForm(){
  const [done,setDone]=useState(false);
  const [selected,setSelected]=useState<string[]>([]);

  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const data=new FormData(e.currentTarget);
    const brief=`SIMPLEX AI — PROJECT BRIEF

Name: ${data.get('name')}
Email: ${data.get('email')}
Company: ${data.get('company')||'Not provided'}
Services: ${selected.join(', ')||'Let’s explore together'}
Budget: ${data.get('budget')}
Timeline: ${data.get('timeline')}

Project details
${data.get('details')}
`;
    const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');
    a.href=url;
    a.download='simplex-ai-project-brief.txt';
    a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    setDone(true);
  }

  return <form className="project-form" onSubmit={submit}>
    <h2>Let’s hear it.</h2>
    <p className="form-intro">A few details to get the ball rolling.</p>
    <div className="form-row">
      <label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={100}/></label>
      <label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={200}/></label>
    </div>
    <label>Company <span className="optional">(optional)</span><input name="company" autoComplete="organization" placeholder="Your company or brand" maxLength={200}/></label>
    <fieldset>
      <legend>What can we help you with?</legend>
      <div className="service-options">
        {services.map(service=><label className={selected.includes(service.name)?'option selected':'option'} key={service.name}>
          <input
            type="checkbox"
            checked={selected.includes(service.name)}
            onChange={()=>setSelected(old=>old.includes(service.name)?old.filter(name=>name!==service.name):[...old,service.name])}
          />
          {service.name}
        </label>)}
      </div>
    </fieldset>
    <div className="form-row">
      <label>Estimated budget<select name="budget" defaultValue="Let’s discuss">
        <option>Let’s discuss</option>
        <option>Under $5,000</option>
        <option>$5,000–$15,000</option>
        <option>$15,000–$30,000</option>
        <option>$30,000+</option>
      </select></label>
      <label>Ideal timeline<select name="timeline" defaultValue="Flexible">
        <option>Flexible</option>
        <option>Within 1 month</option>
        <option>1–3 months</option>
        <option>3–6 months</option>
        <option>6+ months</option>
      </select></label>
    </div>
    <label>Tell us about your idea <span>*</span>
      <textarea name="details" rows={5} placeholder="What are you building? Who is it for? What would success look like?" required minLength={20} maxLength={10000}/>
      <small>At least 20 characters. A rough idea is absolutely fine.</small>
    </label>
    <button className="button primary" type="submit">{done?'Download brief again':'Create my project brief'}<Arrow/></button>
    <p className="form-privacy">Your details stay in your browser and are included only in your downloaded brief.</p>
    {done&&<div role="status" className="form-success">
      Your brief is ready. Attach the downloaded file to an email using the contact link on this page. Nothing was sent automatically.
    </div>}
  </form>;
}
