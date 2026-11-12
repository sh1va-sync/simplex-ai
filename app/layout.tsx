import type {Metadata} from 'next';
import Link from 'next/link';
import Navigation from './navigation';

import {Mark} from './ui';
import './globals.css';
export const metadata:Metadata={
  title:{default:'Simplex AI — Big ideas. Beautifully built.',template:'%s | Simplex AI'},
  description:'Your development partner for thoughtful websites, powerful web and mobile applications, AI agents, and customer support automation.',
  openGraph:{
    type:'website',
    locale:'en_US',
    siteName:'Simplex AI',
    title:'Simplex AI — Big ideas. Beautifully built.',
    description:'Your development partner for thoughtful websites, powerful web and mobile applications, AI agents, and customer support automation.',
  },
  twitter:{
    card:'summary',
    title:'Simplex AI — Big ideas. Beautifully built.',
    description:'Your development partner for thoughtful websites, powerful web and mobile applications, AI agents, and customer support automation.',
  },
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Navigation/><main id="main">{children}</main><footer className="wrap footer"><div className="footer-top"><div><Link className="brand" href="/"><Mark/>simplex<span>AI</span>.</Link><p>Complex challenges.<br/>Simple solutions.</p></div><div><span className="eyebrow">EXPLORE</span><Link href="/services">Services</Link><Link href="/work">Our work</Link><Link href="/about">About us</Link></div><div><span className="eyebrow">LET’S CREATE</span><Link href="/contact">Start a project ↗</Link><p>Built for ambitious businesses.<br/>Wherever you are.</p></div></div><div className="footer-bottom"><span>© 2026 Simplex AI. All rights reserved.</span><span>Thoughtfully designed. Beautifully built.</span><a href="#main">Back to top ↑</a></div></footer></body></html>}


