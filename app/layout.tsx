import type {Metadata} from 'next';
import Link from './transition-link';
import Navigation from './navigation';
import Motion from './motion';
import {RouteTransitions} from './transition-link';
import './base.css';
import './premium.css';
import 'lenis/dist/lenis.css';

const description='Simplex AI designs, deploys, and operates AI-native services that help teams resolve requests faster, remove repetitive work, and make better decisions.';
export const metadata:Metadata={
  title:{default:'Simplex AI — Make work move.',template:'%s | Simplex AI'},
  description,
  openGraph:{type:'website',locale:'en_US',siteName:'Simplex AI',title:'Simplex AI — Make work move.',description},
  twitter:{card:'summary',title:'Simplex AI — Make work move.',description},
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><Motion><RouteTransitions>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation/>
    <main id="main">{children}</main>
    <footer className="wrap footer">
      <div className="footer-studio-top"><div><span className="eyebrow">AI-NATIVE SERVICES. MEASURABLE PROGRESS.</span><h2>Better work.<br/>Better outcomes.</h2><p>We build and run AI-enabled services around the results your business needs.</p></div><div><span className="eyebrow">EXPLORE</span><Link href="/">Home</Link><Link href="/services">Outcomes</Link><Link href="/work">Service scenarios</Link><Link href="/about">How we work</Link></div><div><span className="eyebrow">START A CONVERSATION</span><Link href="/contact">Discuss an outcome ↗</Link><p>Begin with a workflow or result you want to improve.</p></div></div>
      <Link href="/" className="footer-signature" aria-label="Simplex AI home">simplex<span>AI / ✳</span></Link>
      <div className="footer-bottom"><span>© 2026 SIMPLEX AI</span><span>OUTCOMES BEFORE OUTPUTS.</span><a href="#main">BACK TO TOP ↑</a></div>
    </footer>
  </RouteTransitions></Motion></body></html>;
}
