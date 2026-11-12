import Motion from '../motion';
import {Arrow} from '../ui';
import {createPageMetadata} from '../page-metadata';
import ContactForm from './project-form';

const description = 'Start a project with Simplex AI. Create and download a project brief, then email it to our team.';

export const metadata=createPageMetadata('Start a project',description);

export default function Contact(){
  return <Motion>
    <section className="wrap contact-section">
      <div className="contact-copy">
        <div className="eyebrow"><span className="status-dot"/> LET’S MAKE SOMETHING GREAT</div>
        <h1>It starts with<br/>your <span className="orange">idea.</span></h1>
        <p>A new product, a better website, or a workflow that could work smarter. Tell us what you have in mind.</p>
        <div className="contact-next">
          <h3>A simple first step.</h3>
          <p>Use this form to create a project brief you can save and share with Simplex AI.</p>
          <ol>
            <li>Tell us a little about your project.</li>
            <li>Download your prepared brief.</li>
            <li>Attach it to an email to our team.</li>
          </ol>
          <span className="small-note">This form prepares a brief locally; it does not send an enquiry.</span>
          <a className="text-link" href="mailto:shivachary.ul@gmail.com?subject=Simplex%20AI%20project%20enquiry">
            Email shivachary.ul@gmail.com <Arrow/>
          </a>
        </div>
      </div>
      <ContactForm/>
    </section>
  </Motion>;
}
