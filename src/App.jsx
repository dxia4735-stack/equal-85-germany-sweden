import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowUp, Plus, Minus, Menu, X } from 'lucide-react';
import './index.css';
import './editorial.css';
import 'lenis/dist/lenis.css';
import './reference-theme.css';
import { useEditorialMotion } from './useEditorialMotion';
import { SOURCES, POLICIES, DRIVERS } from './data/content';
import { PAY_SERIES, LATEST, RETRIEVED, SOURCE_UPDATED, payRatio } from './data/pay';

const chapters = [['meaning', 'The promise'], ['compare', 'The gap'], ['policies', 'The response'], ['verdict', 'The takeaway']];
function RollTitle({ id, lines, ghost = -1 }) {
  return <h2 id={id} className="roll-title">{lines.map((line, i) => <span className="roll-line" key={line}><span className={`roll-inner ${ghost === i ? 'ghost-word' : ''}`}>{line}</span></span>)}</h2>;
}
function EditorialImage({ name, alt = '', className, eager = false }) {
  return <img className={className} src={`/assets/${name}-1440.webp`} srcSet={[375,768,1024,1440,1920].map(w=>`/assets/${name}-${w}.webp ${w}w`).join(', ')} sizes={eager ? '100vw' : '(max-width: 760px) 90vw, 45vw'} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'}/>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
    <a className="brand" href="#top" aria-label="Equal 8.5 home">EQUAL<span>/ 8.5</span></a>
    <nav id="navigation" className={open ? 'is-open' : ''} aria-label="Primary navigation">
      {chapters.map(([id, title]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{title}</a>)}
      <a href="#sources" onClick={() => setOpen(false)}>Sources <ArrowUpRight size={14}/></a>
    </nav>
    <button className="menu-button" aria-controls="navigation" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
  </header>;
}
function Hero() {
  const scene = useRef(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = scene.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = media.matches ? 0 : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      el.style.setProperty('--journey', progress);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); media.removeEventListener('change', schedule); };
  }, []);
  return <section ref={scene} className="cinema-hero" id="top" aria-labelledby="hero-title">
    <div className="hero-stage">
      <EditorialImage className="hero-architecture" name="campus" eager/>
      <div className="atmosphere atmosphere-back" aria-hidden="true"/><div className="atmosphere atmosphere-front" aria-hidden="true"/>
      <div className="hero-shade"/>
      <div className="hero-intro"><p className="eyebrow">Germany × Sweden / SDG 8.5</p><h1 id="hero-title">Equal work.<br/><span>Equal pay?</span></h1><p>Two countries. One unfinished promise.</p></div>
      <a className="hero-explore" href="#meaning"><span>Explore the distance</span><ArrowDown size={22}/></a>
      <span className="hero-edition">A closer look at equality<br/>2014 — 2024</span>
      <div className="hero-type-scene" aria-hidden="true"><span className="image-word">EQUAL</span><span className="word-caption">The value of work.</span><span className="word-foot">SAME AMBITION. DIFFERENT REALITIES.</span></div>
    </div>
  </section>;
}
function Meaning() {
  return <section className="meaning section-pad" id="meaning" aria-labelledby="meaning-title">
    <p className="eyebrow chapter-label">01 / The promise</p>
    <div><RollTitle id="meaning-title" lines={['The value of work.','Not the gender','of the worker.']} ghost={2}/><p className="lead">Equal pay means equal remuneration for equal work or work of equal value.</p><p>Jobs do not need identical titles to be of equal value. Skills, effort, responsibility and working conditions matter. SDG Target 8.5 places equal pay within the ambition for decent work for all by 2030.</p><a className="text-link pill-link" href="https://sdgs.un.org/goals/goal8" target="_blank" rel="noreferrer">Read the UN target <ArrowUpRight size={15}/></a></div>
    <div className="arrow-ribbon" aria-hidden="true">{['people','office','building','people'].map((name,i)=><div className="arrow-window" key={i}><EditorialImage name={name}/></div>)}</div>
  </section>;
}
function SourceLink({ name, children }) {
  return <a className="text-link" href={SOURCES[name].url} target="_blank" rel="noreferrer">{children || 'View source'} <ArrowUpRight size={13}/></a>;
}

function PayBar({ name, ratio, code, dimmed }) {
  return <div className={`pay-row ${dimmed ? 'dimmed' : ''}`}>
    <div className="pay-row-label"><span><i className={`country-dot ${code}`}/>{name}</span><strong>{ratio}<small> / 100</small></strong></div>
    <div className="pay-track"><span className={`pay-fill ${code}`} style={{ width: `${ratio}%` }}/></div>
  </div>;
}

function Compare() {
  const [active, setActive] = useState(0);
  const steps = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(Number(entry.target.dataset.step)); });
    }, { rootMargin: '-35% 0px -40% 0px', threshold: 0 });
    steps.current.forEach((step) => { if (step) observer.observe(step); });
    return () => observer.disconnect();
  }, []);
  const story = [
    { title: 'Start with the same yardstick.', text: 'Set men’s average gross hourly earnings to 100 in each country. The bars show women’s average on that same index — not a comparison of wage levels or purchasing power between countries.', tag: 'The measurement' },
    { title: `Germany: ${payRatio(LATEST.de)} out of 100.`, text: `In ${LATEST.year}, women’s average gross hourly earnings were ${LATEST.de.toFixed(1)}% below men’s within Eurostat’s covered workforce. This is an aggregate gap across different jobs, not the gap between two people doing identical work.`, tag: 'DE / Germany' },
    { title: `Sweden: ${payRatio(LATEST.se)} out of 100.`, text: `Sweden’s corresponding gap was ${LATEST.se.toFixed(1)}% — ${(LATEST.de - LATEST.se).toFixed(1)} percentage points below Germany’s. A smaller national gap is progress on this measure, but it does not establish equal pay in every workplace.`, tag: 'SE / Sweden' },
  ];
  return <section id="compare" className="compare section-pad" aria-labelledby="compare-title">
    <div className="section-heading"><p className="eyebrow">02 / The gap</p><RollTitle id="compare-title" lines={['Same promise.','Different distances.']} ghost={1}/><p>One source. One year. One definition.<br/>Unadjusted gender pay gap · {LATEST.year}</p></div>
    <div className="headline-metrics">
      {[['de', 'Germany'], ['se', 'Sweden']].map(([code, name]) => <article key={code} className={`country-metric ${code}`}><div className="metric-top"><h3>{name}</h3><span className="country-code">{code.toUpperCase()}</span></div><p className="big-stat">{LATEST[code].toFixed(1)}<span>%</span></p><p>lower average hourly earnings for women</p><span className="metric-foot">{LATEST.year} · provisional · Eurostat</span></article>)}
    </div>
    <div className="scroll-story">
      <figure className="pay-figure"><figcaption><span className="eyebrow">The pay picture / {LATEST.year}</span><h3>When men’s<br/>average is 100.</h3></figcaption>
        <div className="pay-baseline"><span>Men · each country</span><strong>100</strong></div>
        <PayBar name="Germany · women" code="de" ratio={payRatio(LATEST.de)} dimmed={active === 2}/>
        <PayBar name="Sweden · women" code="se" ratio={payRatio(LATEST.se)} dimmed={active === 1}/>
        <div className="pay-ticks" aria-hidden="true"><span>0</span><span>50</span><span>100</span></div>
        <p className="chart-note">Indexed average earnings. Each country has its own male baseline. Not actual euros or kronor.</p>
        <SourceLink name="eurostat">Eurostat · sdg_05_20</SourceLink>
      </figure>
      <div className="story-steps">{story.map((step, i) => <article className={`story-step ${active === i ? 'active' : ''}`} key={step.tag} data-step={i} ref={(element) => { steps.current[i] = element; }}><span className="eyebrow">0{i + 1} / {step.tag}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </div>
    <aside className="definition-note"><span className="note-mark">≠</span><div><h3>A pay gap is a signal. It is not a discrimination rate.</h3><p>The unadjusted gap includes differences in occupations, seniority and other characteristics. An adjusted gap accounts for measured factors, but unmeasured factors remain. Neither is a direct count of unequal-pay cases.</p><SourceLink name="methods">Understand the measure</SourceLink></div></aside>
  </section>;
}

function Trend() {
  const [index, setIndex] = useState(PAY_SERIES.length - 1);
  const selected = PAY_SERIES[index];
  const [showTable, setShowTable] = useState(false);
  const x = (i) => 54 + i * 57;
  const y = (value) => 290 - value * 9.4;
  return <section className="trend section-pad" aria-labelledby="trend-title">
    <div className="section-heading"><p className="eyebrow">A decade in view</p><RollTitle id="trend-title" lines={['The gap can narrow.','Progress can stall.']} ghost={1}/><p>Explore 2014–2024.<br/>Lower means a smaller average pay gap.</p></div>
    <div className="trend-layout"><div className="trend-readout" aria-live="polite"><span className="selected-year">{selected.year}</span><div><span><i className="country-dot de"/>Germany</span><strong>{selected.de.toFixed(1)}<small>%</small></strong></div><div><span><i className="country-dot se"/>Sweden</span><strong>{selected.se.toFixed(1)}<small>%</small></strong></div><p className="chart-note">{selected.deStatus === 'b' ? 'Germany: break in time series.' : ''} {selected.deStatus === 'p' || selected.seStatus === 'p' ? 'Provisional values for ' + (selected.deStatus === 'p' && selected.seStatus === 'p' ? 'both countries.' : selected.deStatus === 'p' ? 'Germany.' : 'Sweden.') : ''}</p></div>
      <div className="trend-chart"><svg viewBox="0 0 680 332" role="img" aria-labelledby="trend-chart-title trend-chart-description"><title id="trend-chart-title">Unadjusted gender pay gap, Germany and Sweden, 2014 to 2024</title><desc id="trend-chart-description">Germany: 22.3 percent in 2014 to 15.6 in 2024. Sweden: 13.8 to 11.2. Germany has a break in the series in 2022. Use the year slider or data table for individual values.</desc>
        {[0, 5, 10, 15, 20, 25].map((tick) => <g key={tick}><line x1="54" x2="624" y1={y(tick)} y2={y(tick)} className="grid-line"/><text x="36" y={y(tick) + 4} textAnchor="end">{tick}%</text></g>)}
        {[0, 2, 4, 6, 8, 10].map((i) => <text x={x(i)} y="322" textAnchor="middle" key={i}>{PAY_SERIES[i].year}</text>)}
        <line className="selected-line" x1={x(index)} x2={x(index)} y1="50" y2="290"/>
        <polyline className="trend-line de" points={PAY_SERIES.slice(0,8).map((item,i)=>`${x(i)},${y(item.de)}`).join(' ')}/>
        <line className="trend-line de break-line" x1={x(7)} y1={y(PAY_SERIES[7].de)} x2={x(8)} y2={y(PAY_SERIES[8].de)}/>
        <polyline className="trend-line de" points={PAY_SERIES.slice(8).map((item,i)=>`${x(i+8)},${y(item.de)}`).join(' ')}/>
        <polyline className="trend-line se" points={PAY_SERIES.map((item,i)=>`${x(i)},${y(item.se)}`).join(' ')}/>
        {['de','se'].map((code)=><g key={code}>{PAY_SERIES.map((item,i)=><circle key={item.year} cx={x(i)} cy={y(item[code])} r={i===index ? 6 : 3} className={`trend-dot ${code}`}/>)}</g>)}
      </svg>
      <label className="slider-label" htmlFor="year">Select year <span>{selected.year}</span></label><input id="year" type="range" min="0" max={PAY_SERIES.length-1} step="1" value={index} aria-valuetext={`${selected.year}: Germany ${selected.de} percent; Sweden ${selected.se} percent`} onChange={(event)=>setIndex(Number(event.target.value))}/><div className="range-ends"><span>2014</span><span>Drag or use arrow keys</span><span>2024</span></div>
      <p className="chart-note">Dashed segment: Germany’s 2022 break in series; interpret change across this point cautiously. 2023 and 2024 figures are provisional for both countries.</p>
      </div></div>
    <div className="chart-actions"><SourceLink name="eurostat">Source: Eurostat · sdg_05_20</SourceLink><button className="text-link" aria-expanded={showTable} aria-controls="trend-table" onClick={()=>setShowTable(!showTable)}>{showTable ? 'Hide' : 'View'} data table {showTable ? <Minus size={14}/> : <Plus size={14}/>}</button></div>
    {showTable && <div id="trend-table" className="table-wrap"><table><caption>Unadjusted gender pay gap (% of men’s average gross hourly earnings)</caption><thead><tr><th scope="col">Year</th><th scope="col">Germany</th><th scope="col">Sweden</th><th scope="col">Notes</th></tr></thead><tbody>{PAY_SERIES.map((item)=><tr key={item.year}><th scope="row">{item.year}</th><td>{item.de.toFixed(1)}%</td><td>{item.se.toFixed(1)}%</td><td>{item.deStatus==='b' ? 'Germany: series break' : item.deStatus==='p' ? 'Both: provisional' : '—'}</td></tr>)}</tbody></table></div>}
  </section>;
}

function Drivers() {
  return <section className="drivers section-pad" aria-labelledby="drivers-title"><div className="drivers-intro"><div><p className="eyebrow">Behind the average</p><RollTitle id="drivers-title" lines={['A gap has','more than','one cause.']} ghost={2}/></div><figure className="editorial-photo office-photo"><EditorialImage name="office" alt="A modern workplace with glass-walled offices"/><figcaption>Look beyond the number.<br/>Look at working lives.</figcaption></figure></div><div className="driver-grid">{DRIVERS.map((item,i)=><article key={item.title}><span className="driver-number">0{i+1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div className="driver-sources"><SourceLink name="methods">Pay-gap interpretation</SourceLink><SourceLink name="eu">Why transparency matters</SourceLink></div></section>;
}

function Policies() {
  const [active, setActive] = useState(0);
  return <section className="policies section-pad" id="policies" aria-labelledby="policies-title"><div className="section-heading"><p className="eyebrow">03 / The response</p><RollTitle id="policies-title" lines={['Different tools.','A shared challenge.']} ghost={1}/><p>Compare how the two countries approach<br/>pay information, care and the value of work.</p></div>
    <div className="policy-list">{POLICIES.map((policy,i)=><article className={`policy ${active===i?'open':''}`} key={policy.title}><h3><button id={`policy-button-${i}`} aria-expanded={active===i} aria-controls={`policy-panel-${i}`} onClick={()=>setActive(active===i?-1:i)}><span className="policy-row-brief"><span className="policy-number">0{i+1}</span><span>{policy.title}</span></span><span className="policy-word" aria-hidden="true">{['Pay.','Care.','Value.'][i]}</span><span className="policy-toggle">{active===i ? <Minus/> : <Plus/>}</span></button></h3><div className="policy-panel" id={`policy-panel-${i}`} role="region" aria-labelledby={`policy-button-${i}`} hidden={active!==i}><div className="policy-image" aria-hidden="true"><EditorialImage name={['office','people','building'][i]}/><span>{['Make pay visible.','Share responsibility.','Recognise equal value.'][i]}</span><ArrowUpRight/></div><p className="policy-question">{policy.question}</p><p className="eyebrow policy-label">{policy.label}</p><div className="policy-countries"><div><h4><i className="country-dot de"/>Germany</h4><p>{policy.de}</p><SourceLink name={policy.deSource}>German source</SourceLink></div><div><h4><i className="country-dot se"/>Sweden</h4><p>{policy.se}</p><SourceLink name={policy.seSource}>Swedish source</SourceLink></div></div><p className="policy-takeaway"><span>What this means</span>{policy.takeaway}</p></div></article>)}</div>
    <aside className="eu-note"><span className="eyebrow">The European context / 2026</span><h3>A common framework.<br/>National implementation still matters.</h3><p>The EU Pay Transparency Directive was adopted in 2023, with a national transposition deadline of 7 June 2026. Its measures include pay information and stronger enforcement. The deadline alone does not establish that every national measure is in force; the German 2017 provisions above are a historical baseline.</p><SourceLink name="ec">European Commission: implementation context</SourceLink></aside>
  </section>;
}

function Verdict() {
  return <section className="verdict section-pad" id="verdict" aria-labelledby="verdict-title"><p className="eyebrow">04 / The takeaway</p><h2 id="verdict-title">A SMALLER GAP.<br/><span>NOT THE<br/>FINISH LINE.</span></h2><div className="verdict-bottom"><span className="verdict-symbol" aria-hidden="true">≠</span><div><p className="lead">Sweden has the smaller measured pay gap.<br/>Both countries have work to do.</p><p>The 2024 comparison establishes a { (LATEST.de-LATEST.se).toFixed(1) } percentage-point difference on one indicator. It does not prove that one policy caused the difference, or predict which country will achieve equal pay by 2030.</p><p>Our takeaway: make pay visible, evaluate work fairly and support a more equal sharing of care. Then measure whether the changes reach people’s working lives.</p><a className="text-link" href="#sources">Check the evidence <ArrowDown size={14}/></a></div></div></section>;
}

function Sources() {
  return <section id="sources" className="sources section-pad" aria-labelledby="sources-title"><div className="section-heading"><p className="eyebrow">Read the evidence</p><h2 id="sources-title">Sources & method.</h2><p>Transparent numbers.<br/>Traceable claims.</p></div><div className="method-grid"><div><h3>What we compare</h3><p>Average gross hourly earnings of male and female employees in enterprises with 10 or more employees. Industry, construction and services; public administration, defence and compulsory social security are excluded (NACE B–S, excluding O).</p><p className="formula">Gap = (men’s average − women’s average)<br/>÷ men’s average × 100</p></div><div><h3>What we do not claim</h3><p>This is an unadjusted economy-wide indicator, not a measure of identical-job discrimination or all of SDG 8.5. National publications may use different coverage or pay concepts. The policy comparison explains mechanisms; it does not estimate their causal effect.</p><p className="chart-note">Data update: {SOURCE_UPDATED}. Retrieved: {RETRIEVED}. Latest common year in this snapshot: 2024. Germany’s 2022 series break is marked in the chart.</p></div></div>
      <ol className="source-list">{Object.entries(SOURCES).map(([key,source],i)=><li key={key}><span className="source-number">{String(i+1).padStart(2,'0')}</span><a href={source.url} target="_blank" rel="noreferrer"><span>{source.title}<small>{source.note}</small></span><ArrowUpRight size={20}/></a></li>)}</ol><a href="/data/eurostat-sdg-05-20.json" className="text-link snapshot-link" download>Download the Eurostat data snapshot <ArrowDown size={14}/></a><p className="design-credit">The opening campus image is AI-generated. Other workplace imagery is illustrative, not country-specific. Presentation references: the supplied motion-design video and CFR’s interactive storytelling format. FIND and CFR are visual references, not sources for the pay comparison.</p>
    </section>;
}

export default function App() {
  const root = useRef(null);
  useEditorialMotion(root);
  return <div ref={root}><a className="skip-link" href="#meaning">Skip to content</a><Header/><main><Hero/><Meaning/><Compare/><Trend/><Drivers/><div className="tone-transition" aria-hidden="true"/><Policies/><Verdict/><Sources/></main><footer className="editorial-footer"><div className="footer-top"><a className="brand" href="#top">EQUAL<span>/ 8.5</span></a><p>Equal work. Equal value. Equal pay.</p><a href="#top">Back to top <ArrowUp size={16}/></a></div><a className="footer-word" href="#top" aria-label="Equal 8.5 — return to top">EQUAL<span>↗</span></a><div className="footer-bottom"><span>Germany × Sweden</span><span>A shared ambition for 2030.</span></div></footer></div>;
}
