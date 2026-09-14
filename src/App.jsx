import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Plus } from 'lucide-react';
import useLenis from './hooks/useLenis';
import './index.css';

const rows = [
  { id: '01', title: 'Access to work', image: '/assets/office.jpg', text: "Both countries perform strongly, but disability and migrant employment gaps remain. Sweden's active labour-market support gives it a slight edge in inclusion.", quote: 'People need a route into work, not only available vacancies.' },
  { id: '02', title: 'Equal pay', image: '/assets/people.jpg', text: "Pay transparency is growing in both countries. Sweden's narrower unadjusted pay gap and long-standing wage mapping place it closer to the target.", quote: 'Transparency reveals a gap. Enforcement helps close it.' },
  { id: '03', title: 'Time and care', image: '/assets/building.jpg', text: "Sweden's childcare and shared parental-leave model supports continuity at work. Germany has expanded childcare, yet women still carry more part-time work.", quote: 'Care policy shapes who can stay, progress and lead.' },
  { id: '04', title: 'Job quality', image: '/assets/city.jpg', text: "Collective agreements protect many workers in both countries. Coverage is broader in Sweden, while Germany's co-determination gives workers a formal company voice.", quote: 'A job counts only when its conditions are decent.' },
];
const metrics = [
  { label: 'Women in employment', de: 76, se: 82 },
  { label: 'Men in employment', de: 84, se: 85 },
  { label: 'Pay equality proximity', de: 61, se: 79 },
  { label: 'Care support', de: 58, se: 88 },
];

function useReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.22 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className={`site-header ${open ? 'menu-open' : ''}`}>
    <a className="brand" href="#top" aria-label="Equal 8.5 home"><span>EQUAL</span><b>8.5</b></a>
    <nav aria-label="Primary navigation"><a href="#meaning">Context</a><a href="#compare">Compare</a><a href="#verdict">Verdict</a></nav>
    <button className="menu-button" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
  </header>;
}

function Hero() {
  const ref = useRef(null);
  useEffect(() => {
    let cleanup;
    import('gsap').then(({ default: gsap }) => import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      const building = ref.current?.querySelector('.hero-building');
      const sky = ref.current?.querySelector('.hero-sky');
      const title = ref.current?.querySelector('.hero-title');
      if (!building || !sky || !title) return;
      const trigger = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
      trigger.to(building, { scale: 1.27, y: 70, ease: 'none' }, 0).to(sky, { scale: 1.18, yPercent: 4, ease: 'none' }, 0).to(title, { yPercent: -30, opacity: 0.25, ease: 'none' }, 0);
      cleanup = () => { trigger.kill(); ScrollTrigger.getAll().forEach((item) => item.kill()); };
    }));
    return () => cleanup?.();
  }, []);
  return <section className="hero" id="top" ref={ref} aria-labelledby="hero-title">
    <div className="hero-sky" aria-hidden="true" />
    <div className="hero-building" aria-hidden="true"><img src="/assets/building.jpg" alt="" /></div>
    <p className="eyebrow hero-kicker">UN Sustainable Development Goal</p>
    <h1 className="hero-title" id="hero-title"><span>FULL</span><span>AND FAIR</span><span>WORK</span></h1>
    <p className="hero-deck">By 2030, everyone should have productive, decent work and equal pay for work of equal value.</p>
    <div className="scroll-cue" aria-hidden="true"><span>Scroll to compare</span><i /></div>
    <div className="target-chip"><span>Target</span><strong>8.5</strong></div>
  </section>;
}

function Meaning() {
  return <section className="meaning" id="meaning" aria-labelledby="meaning-title">
    <p className="eyebrow">What the target really asks</p>
    <h2 id="meaning-title">It is about more than having a job.</h2>
    <div className="chevrons" aria-hidden="true"><div style={{ '--image': "url('/assets/office.jpg')" }} /><div style={{ '--image': "url('/assets/people.jpg')" }} /><div style={{ '--image': "url('/assets/city.jpg')" }} /></div>
    <p className="meaning-copy">SDG 8.5 connects access to work with job quality. Progress means closing employment and pay gaps while protecting young people and persons with disabilities.</p>
  </section>;
}

function Country({ name, code, image, description, strength, pressure }) {
  return <article className="country-card"><div className="country-photo"><img src={image} alt="" /></div><div className="country-meta"><span>{code === 'DE' ? '01' : '02'}</span><h3>{name}</h3><b>{code}</b></div><p>{description}</p><dl><div><dt>Strength</dt><dd>{strength}</dd></div><div><dt>Pressure point</dt><dd>{pressure}</dd></div></dl></article>;
}

function Compare() {
  const [ref, visible] = useReveal();
  return <section className={`compare ${visible ? 'is-visible' : ''}`} id="compare" ref={ref} aria-labelledby="compare-title">
    <div className="compare-head"><p className="eyebrow">Germany / Sweden</p><h2 id="compare-title">Two strong labour markets.<br />One unfinished promise.</h2><p>Both countries combine high employment with broad worker protections. Their remaining challenge is to turn formal equality into equal outcomes.</p></div>
    <div className="country-grid"><Country name="Germany" code="DE" image="/assets/city.jpg" description="A large, export-led economy with strong vocational training. Women remain more likely to work part time, which affects earnings and advancement." strength="Dual vocational training" pressure="Gender pay and hours gaps" /><Country name="Sweden" code="SE" image="/assets/people.jpg" description="A smaller Nordic economy supported by childcare, parental leave and collective bargaining. Occupational segregation still holds back pay equality." strength="Care and leave infrastructure" pressure="Segregated job sectors" /></div>
  </section>;
}

function Evidence() {
  const [active, setActive] = useState(0);
  return <section className="evidence" aria-labelledby="evidence-title"><div className="evidence-sticky"><p className="eyebrow">Four tests of progress</p><h2 id="evidence-title">Where policy meets daily work</h2><p className="evidence-instruction">Select a row to reveal the comparison.</p></div><div className="evidence-list">{rows.map((row, index) => <article className={`evidence-row ${active === index ? 'is-open' : ''}`} key={row.id}><button className="row-top" type="button" aria-expanded={active === index} onClick={() => setActive(active === index ? -1 : index)}><span>{row.id}</span><h3>{row.title}</h3><span className="plus"><Plus size={22} /></span></button><div className="row-detail"><img src={row.image} alt="" /><div><p>{row.text}</p><em>{row.quote}</em></div></div></article>)}</div></section>;
}

function DataSection() {
  const [ref, visible] = useReveal();
  return <section className={`data-section ${visible ? 'is-visible' : ''}`} ref={ref} aria-labelledby="data-title"><div className="data-intro"><p className="eyebrow">A directional index</p><h2 id="data-title">Progress is a system, not a single number.</h2><p>Illustrative comparison index for the presentation. Replace with the latest UN, Eurostat, OECD and ILOSTAT values before presenting.</p></div><div className="metric-list">{metrics.map((metric) => <div className="metric" key={metric.label}><div className="metric-label"><span>{metric.label}</span><b>DE {metric.de} / SE {metric.se}</b></div><div className="metric-bars"><div className="bar de" style={{ '--value': `${metric.de}%` }}><span>DE</span></div><div className="bar se" style={{ '--value': `${metric.se}%` }}><span>SE</span></div></div></div>)}</div></section>;
}

function Verdict() {
  return <section className="verdict" id="verdict" aria-labelledby="verdict-title"><div className="verdict-image"><img src="/assets/people.jpg" alt="A diverse team collaborating" /></div><p className="eyebrow">Our assessment</p><h2 id="verdict-title">SWEDEN IS<br /><span>CLOSER.</span></h2><p className="verdict-copy">Neither country has achieved Target 8.5. Sweden appears more likely to come closer by 2030 because care policy, wage mapping and collective bargaining work together. Germany can narrow the distance by reducing unequal part-time work and strengthening pay transparency.</p><a className="source-link" href="#sources">See the evidence <ArrowDownRight size={22} /></a></section>;
}

function Sources() {
  return <section className="sources" id="sources" aria-labelledby="sources-title"><h2 id="sources-title">Sources for the presentation</h2><ol><li><a href="https://sdgs.un.org/goals/goal8" target="_blank" rel="noreferrer">United Nations, Goal 8 and Target 8.5</a><span>Definition</span></li><li><a href="https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Gender_pay_gap_statistics" target="_blank" rel="noreferrer">Eurostat, Gender pay gap statistics</a><span>Comparable pay data</span></li><li><a href="https://stats.oecd.org/" target="_blank" rel="noreferrer">OECD Data Explorer, labour market indicators</a><span>Employment and job quality</span></li><li><a href="https://ilostat.ilo.org/data/" target="_blank" rel="noreferrer">International Labour Organization, ILOSTAT</a><span>SDG labour indicators</span></li></ol><p className="source-note">Use the latest available year from each database before presenting. Definitions and reference years may differ.</p></section>;
}

export default function App() {
  useLenis(false);
  return <><Header /><main><Hero /><Meaning /><div className="marquee" aria-label="Key themes"><div><span>EMPLOYMENT</span><i>+</i><span>EQUAL PAY</span><i>+</i><span>DECENT WORK</span><i>+</i><span>INCLUSION</span><i>+</i><span>EMPLOYMENT</span><i>+</i><span>EQUAL PAY</span></div></div><Compare /><Evidence /><DataSection /><Verdict /><section className="takeaway" aria-labelledby="takeaway-title"><p className="eyebrow">What the audience can learn</p><h2 id="takeaway-title">Equality at work depends on the systems around work.</h2><div className="takeaway-grid"><p>Childcare, leave, wage transparency and worker representation reinforce one another. A single policy cannot close a structural gap.</p><p>Countries should measure who enters employment, who can stay full time, and whose work receives equal value.</p></div></section><Sources /></main><footer><a className="brand" href="#top"><span>EQUAL</span><b>8.5</b></a><p>Full employment. Decent work. Equal pay.</p><a href="#top">Back to top ↑</a></footer></>;
}
