import type {Metadata} from 'next';
import Link from './transition-link';
import Navigation from './navigation';
import Motion from './motion';
import {RouteTransitions} from './transition-link';

import './globals.css';
import './structure.css';
export const metadata:Metadata={
  title:{default:'Simplex AI — Make the next thing matter.',template:'%s | Simplex AI'},
  description:'Your development partner for thoughtful websites, powerful web and mobile applications, AI agents, and customer support automation.',
  openGraph:{
    type:'website',
    locale:'en_US',
    siteName:'Simplex AI',
    title:'Simplex AI — Make the next thing matter.',
    description:'Your development partner for thoughtful websites, powerful web and mobile applications, AI agents, and customer support automation.',
  },
  twitter:{
    card:'summary',
    title:'Simplex AI — Make the next thing matter.',
    description:'Your development partner for thoughtful websites, powerful web and mobile applications, AI agents, and customer support automation.',
  },
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><Motion><RouteTransitions>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation/>
    <main id="main">{children}</main>
    <footer className="wrap footer">
      <div className="footer-studio-top"><div><span className="eyebrow">INDEPENDENT MINDS. SHARED AMBITION.</span><h2>Your next chapter.<br/>Our next obsession.</h2><p>Design, technology, and intelligence.<br/>Made to work beautifully together.</p></div><div><span className="eyebrow">TAKE A LOOK AROUND</span><Link href="/">The studio</Link><Link href="/services">Our capabilities</Link><Link href="/work">Selected possibilities</Link><Link href="/about">Our perspective</Link></div><div><span className="eyebrow">MAKE THE FIRST MOVE</span><Link href="/contact">Start a conversation ↗</Link><p>Built for ambitious businesses.<br/>Wherever you are.</p></div></div>
      <Link href="/" className="footer-signature" aria-label="Simplex AI home">simplex<span>AI / ✳</span></Link>
      <div className="footer-bottom"><span>© 2026 SIMPLEX AI</span><span>COMPLEX CHALLENGES. SIMPLEX SOLUTIONS.</span><a href="#main">BACK TO TOP ↑</a></div>
    </footer>
  </RouteTransitions></Motion></body></html>;
}
