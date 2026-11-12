import Motion from '../motion';
import Link from 'next/link';
import {services,Icon,Arrow,CallToAction} from '../ui';
import {createPageMetadata} from '../page-metadata';
export const metadata=createPageMetadata('Services','Explore Simplex AI services: websites, web and mobile apps, AI agents, customer support automation, and custom software.');
export default function Services(){return <Motion><section className="page-intro wrap"><div className="eyebrow">OUR EXPERTISE / YOUR NEXT CHAPTER</div><h1>Made for your business.<br/><span className="muted-heading">Built for what’s next.</span></h1><p>One development partner, from the first sketch to the final release. Explore how we can help bring your idea to life.</p></section><section className="wrap service-details">{services.map((s,i)=><article id={`service-${i}`} className="service-detail" key={s.name}><div className="detail-number">0{i+1}<Icon type={i}/></div><div><h2>{s.name}</h2><p>{s.detail}</p><Link className="text-link" href="/contact">Let’s talk about your project <Arrow/></Link></div><ul>{s.items.map(item=><li key={item}><span>↗</span>{item}</li>)}</ul></article>)}</section><CallToAction/></Motion>}

