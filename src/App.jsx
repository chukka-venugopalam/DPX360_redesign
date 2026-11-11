import React, { useEffect, useMemo, useRef, useState } from 'react';
import Scene from './art.jsx';
import Pitch from './Pitch.jsx';
import * as D from './data.js';

const inr = (n) => '₹' + n.toLocaleString('en-IN');
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function useRoute() {
  const read = () => (window.location.hash.startsWith('#/') ? window.location.hash.slice(2) : '');
  const [r, setR] = useState(read);
  useEffect(() => { const on = () => setR(read()); window.addEventListener('hashchange', on); return () => window.removeEventListener('hashchange', on); }, []);
  return r;
}

const Head = ({ eyebrow, title, sub }) => (
  <div className="head">
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2>{title}</h2>
    {sub && <p className="sub">{sub}</p>}
  </div>
);

function Header({ open, setOpen }) {
  return (
    <header className="top">
      <a className="brand" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <span className="mark" aria-hidden="true" />DPX360
      </a>
      <nav className="nav-d" aria-label="Main">{D.NAV.map((n) => <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>)}</nav>
      <a className="login hide-m" href="#/login">Login</a>
      <a className="btn btn-sm hide-m" href="#/book">Book Grand Prix</a>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      {open && (
        <nav className="drawer" aria-label="Menu">
          {D.NAV.map((n) => <button key={n.id} onClick={() => { setOpen(false); go(n.id); }}>{n.label}</button>)}
          <a href="#/login" onClick={() => setOpen(false)}>Member / affiliate login</a>
        </nav>
      )}
    </header>
  );
}

function Countdown() {
  const now = new Date(); const t1 = new Date('2026-11-15T05:00:00+05:30'); const t2 = new Date('2027-01-03T05:00:00+05:30');
  const live = now >= t1 && now < t2; const to = now < t1 ? t1 : t2;
  const d = Math.max(0, Math.ceil((to - now) / 864e5));
  if (now >= t2) return null;
  const label = live ? 'days to the Grand Prix' : 'days to the first city start';
  return <p className="count-chip" role="status"><i aria-hidden="true" /><b>{d}</b> {label}</p>;
}

function Hero() {
  return (
    <section className="sec forest hero">
      <div className="wrap hero-grid">
        <div>
          <Countdown />
          <p className="eyebrow">Run &amp; Ride series · 17 cities · Grand Prix 2027</p>
          <h1>Your city is the starting line. January is the summit.</h1>
          <p className="lede">Join a city run or ride from 15 November, then take on the Grand Prix in the hills, 3–17 January.</p>
          <div className="cta-row">
            <a className="btn" href="#/book">Book Grand Prix · {inr(D.OFFER.price)}</a>
            <button className="btn btn-ghost" onClick={() => go('cities')}>Find my city</button>
          </div>
          <ul className="facts"><li><b>5–500 km</b> ride</li><li><b>5–50 km</b> run</li><li><b>5 to 80+</b> years</li></ul>
        </div>
        <Scene kind="hero" className="hero-art" />
      </div>
    </section>
  );
}

function DiscoverStrip() {
  return (
    <section className="sec sand" id="discover">
      <div className="wrap">
        <Head eyebrow="One park, every generation" title="Discover the park" sub="Six ways in. Pick the one that sounds like you." />
        <ul className="tiles">
          {D.DISCOVER.map((d, i) => (
            <li key={d.t} className="tile">
              <Scene kind={d.s} />
              <div><span className="num">{String(i + 1).padStart(2, '0')}</span><h3>{d.t}</h3><p>{d.d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Film() {
  const [on, setOn] = useState(false);
  return (
    <section className="sec forest" id="film">
      <div className="wrap">
        <Head eyebrow="15 seconds" title="Watch the park in motion" />
        <div className="film">
          {on ? <div className="film-on"><p>The video loads here only after a tap, so nobody on mobile data pays for it unasked.</p></div> : (
            <button className="film-poster" onClick={() => setOn(true)} aria-label="Play the DPX film">
              <Scene kind="stories" /><span className="play" aria-hidden="true">▶</span><span className="cap">Play the DPX film</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Habit() {
  return (
    <section className="sec sand">
      <div className="wrap split">
        <div>
          <p className="eyebrow">National healthy habit movement</p>
          <h2>From screens to skills. From gadgets to greatness.</h2>
          <p>Less scrolling, more self-discovery. DPX turns daily movement into a shared habit, with a city starting line near you and a mountain finish in January.</p>
          <button className="btn" onClick={() => go('oath')}>Start my healthy habit journey</button>
        </div>
        <Scene kind="oath" className="rounded" />
      </div>
    </section>
  );
}

function GrandPrixSlider() {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const slides = useMemo(() => [
    ...D.DESTINATIONS.map((d) => ({ name: d.name, scene: d.scene, kind: 'Destination' })),
    ...D.CITIES.map((c, k) => ({ name: c.name, scene: `city${k % 3}`, kind: c.state })),
  ], []);
  const onScroll = () => {
    const el = ref.current; const first = el?.firstElementChild;
    if (el && first) setI(Math.min(slides.length - 1, Math.round(el.scrollLeft / (first.offsetWidth + 12))));
  };
  const step = (d) => { const el = ref.current; el?.scrollBy({ left: d * (el.firstElementChild.offsetWidth + 12), behavior: 'smooth' }); };
  return (
    <section className="sec forest" id="grand-prix">
      <div className="wrap">
        <Head eyebrow="Grand Prix · 21 stops" title="Where the journey leads" sub="Four destinations in the hills and your 17 starting cities. Swipe or use the arrows." />
      </div>
      <div className="wrap">
        <ul className="rail" ref={ref} onScroll={onScroll} aria-label="Grand Prix destinations and cities" tabIndex={0}>
          {slides.map((s, k) => (
            <li className="slide" key={s.name}>
              <Scene kind={s.scene} />
              <div className="slide-b"><span className="num">{String(k + 1).padStart(2, '0')}</span><div><h3>{s.name}</h3><p>{s.kind}</p></div></div>
              <p className="chips"><span>Ride 5–500 km</span><span>Run 5–50 km</span></p>
            </li>
          ))}
        </ul>
        <div className="rail-ctl">
          <button className="circ" aria-label="Previous stop" onClick={() => step(-1)} disabled={i === 0}>←</button>
          <span aria-live="polite">{String(i + 1).padStart(2, '0')} / {slides.length}</span>
          <button className="circ" aria-label="Next stop" onClick={() => step(1)} disabled={i >= slides.length - 1}>→</button>
          <a className="btn btn-sm" href="#/book">Book Grand Prix</a>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section className="sec sand" id="offer">
      <div className="wrap grid2">
        <article className="card hi">
          <p className="tag">Advance booking</p>
          <h2>One booking, two adventures</h2>
          <p className="price"><s>{inr(D.OFFER.regular)}</s> <strong>{inr(D.OFFER.price)}</strong> <span>per participant</span></p>
          <ul className="ticks">{D.OFFER.perks.map((p) => <li key={p}>{p}</li>)}</ul>
          <a className="btn" href="#/book">Book Grand Prix &amp; continue</a>
          <p className="fine">{D.OFFER.note}</p>
        </article>
        <article className="card">
          <p className="tag">Try your city first</p>
          <h2>Start local, get 25% off the Grand Prix</h2>
          <p className="price"><strong>{inr(D.LAUNCHPAD.withCycle)}</strong> <span>with cycle &amp; gear</span></p>
          <p className="price sm"><strong>{inr(D.LAUNCHPAD.runOnly)}</strong> <span>run or own-cycle entry</span></p>
          <p>Finish your city activity to unlock 25% off a Grand Prix booking. One redemption; it does not stack with the advance offer.</p>
          <p className="fine">{D.OFFER.kit}</p>
          <button className="btn btn-ghost" onClick={() => go('cities')}>Find my Launchpad city</button>
        </article>
      </div>
    </section>
  );
}

function Paths() {
  const [sel, setSel] = useState('beginner');
  const cur = D.PATHS.find((p) => p.id === sel);
  return (
    <section className="sec forest" id="entry">
      <div className="wrap">
        <Head eyebrow="Find my Grand Prix path" title="Pick your level" />
        <div className="seg" role="tablist" aria-label="Level">
          {D.PATHS.map((p) => <button key={p.id} role="tab" aria-selected={sel === p.id} className={sel === p.id ? 'on' : ''} onClick={() => setSel(p.id)}>{p.title}</button>)}
        </div>
        <div className="panel" role="tabpanel">
          <Scene kind={cur.s} className="rounded" />
          <div>
            <p className="tag">{cur.tag}</p><h3>{cur.title}</h3><p>{cur.text}</p>
            <p className="fine">Participation depends on age, skill, fitness and course requirements. Younger children have separate short discovery activities.</p>
            <a className="btn btn-sm" href="#/book">{cur.cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteMap() {
  const d = 'M30 120 C90 40 140 150 210 80 S330 30 390 110 S500 150 570 60';
  const pts = [[30, 120], [210, 80], [390, 110], [570, 60], [470, 142]];
  return (
    <svg className="map" viewBox="0 0 600 180" role="img" aria-label={`Route: ${D.ROUTE.join(', ')}`}>
      <path className="trk" d={d} /><path className="go" pathLength="1" d={d} />
      {D.ROUTE.map((r, i) => <g key={r}><circle cx={pts[i === 4 ? 3 : i][0]} cy={pts[i === 4 ? 3 : i][1]} r="9" style={i === 4 ? { display: 'none' } : null} /><text x={pts[i][0]} y={pts[i][1] + (i % 2 ? -18 : 30)} textAnchor="middle">{r}</text></g>)}
    </svg>
  );
}

function Programme() {
  return (
    <section className="sec sand" id="programme">
      <div className="wrap">
        <Head eyebrow="3–17 January 2027" title="One day, three days, or five stages" sub="You do not need all 15 days. Routes and eligibility are confirmed before paid entry." />
        <ol className="steps">
          {D.PROGRAMMES.map((p) => (
            <li key={p.title}><span className="badge">{p.days}</span><div><h3>{p.title}</h3><p className="when">{p.when}</p><p>{p.detail}</p></div></li>
          ))}
        </ol>
        <RouteMap />
        <a className="btn" href="#/programme">View the full programme</a>
      </div>
    </section>
  );
}

function Cities() {
  const [q, setQ] = useState(''); const [state, setState] = useState('All');
  const list = useMemo(() => D.CITIES.filter((c) => (state === 'All' || c.state === state) && c.name.toLowerCase().includes(q.trim().toLowerCase())), [q, state]);
  return (
    <section className="sec forest" id="cities">
      <div className="wrap">
        <Head eyebrow={`Run & Ride · ${D.LAUNCHPAD.window}`} title="Find your starting line" sub={`All city events run ${D.LAUNCHPAD.hours}. ${D.LAUNCHPAD.starts}. Venues are confirmed per city.`} />
        <div className="finder">
          <label className="srch"><span className="sr">Search your city</span><input type="search" placeholder="Search your city" value={q} onChange={(e) => setQ(e.target.value)} /></label>
          <div className="seg small" role="group" aria-label="State">
            {['All', 'Andhra Pradesh', 'Telangana'].map((s) => <button key={s} className={state === s ? 'on' : ''} aria-pressed={state === s} onClick={() => setState(s)}>{s}</button>)}
          </div>
        </div>
        <p className="count" aria-live="polite">{list.length} of {D.CITIES.length} cities</p>
        <ul className="city-grid">
          {list.map((c) => (
            <li key={c.slug}><a className="city" href={`#/city/${c.slug}`}><span><b>{c.name}</b><small>{c.state}</small></span><em>Enrol</em></a></li>
          ))}
        </ul>
        {!list.length && <p className="sub">No match. Try another spelling.</p>}
        <p className="fine">Age groups: {D.LAUNCHPAD.age.join(' · ')}. Separate boys/men and girls/women results in running and cycling.</p>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="sec sand" id="journey">
      <div className="wrap">
        <Head eyebrow="The journey" title="Four steps to the summit" />
        <ol className="journey">{D.JOURNEY.map(([t, d], i) => <li key={t}><span className="big-n">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
        <ul className="seasons">{D.SEASONS.map(([n, w, live]) => <li key={n} className={live ? 'live' : ''}><b>{n}</b><span>{w}</span></li>)}</ul>
      </div>
    </section>
  );
}

function Prizes() {
  return (
    <section className="sec forest" id="prizes">
      <div className="wrap">
        <Head eyebrow="Prizes" title="Race for the podium" />
        <Scene kind="podium" className="rounded wide" />
        <div className="prize">
          <div className="card"><p className="tag">Per city · running and cycling</p><p className="bigm">{D.PRIZES.perCity}</p>
            <p>{D.PRIZES.split.map(([k, v]) => `${k} ${v}`).join(' · ')}</p>
            <p className="fine">{D.PRIZES.podium.map(([k, v]) => `${k} ${v}`).join(' · ')} in each age-and-gender division.</p></div>
          <div className="card"><p className="tag">Grand Prix flagship pool</p><p className="bigm">{D.PRIZES.flagship}</p>
            <p className="fine">Specified competitive events only. Discovery entry is not automatic entry to a cash-prize final.</p></div>
        </div>
        <a className="btn btn-ghost" href="#/prizes">See prize categories &amp; rules</a>
      </div>
    </section>
  );
}

function Challenge() {
  return (
    <section className="sec sand" id="mountain-challenge">
      <div className="wrap split">
        <Scene kind="riders" className="rounded" />
        <div>
          <p className="eyebrow">Mountain challenge</p>
          <h2>Bring five friends. Climb together.</h2>
          <p>Challenge five friends to join the movement and go for the Grand Prix as a group. Every finisher keeps their own results and completion record.</p>
          <a className="btn" href="#/challenge">Challenge five friends</a>
        </div>
      </div>
    </section>
  );
}

function Oath() {
  return (
    <section className="sec forest oath" id="oath">
      <div className="wrap narrow">
        <Head eyebrow="Healthy habit oath" title="Take the oath. Join your city." />
        <ol className="oath-list">{D.OATH.map((o) => <li key={o}>{o}</li>)}</ol>
        <button className="btn" onClick={() => go('cities')}>Take the oath &amp; join my city</button>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="sec sand" id="partners">
      <div className="wrap split">
        <div>
          <p className="eyebrow">Affiliate partners</p>
          <h2>Share the movement, grow with it</h2>
          <p>Partners get tools to refer participants and track results.</p>
          <ul className="ticks">{D.AFFILIATE.map((a) => <li key={a}>{a}</li>)}</ul>
          <div className="cta-row">
            <a className="btn" href="#/partner">Become an affiliate partner</a>
            <a className="btn btn-ghost" href="#/login">Affiliate login</a>
            <a className="btn btn-ghost" href="#/influencer">Influencer / story partner</a>
          </div>
        </div>
        <Scene kind="family" className="rounded" />
      </div>
    </section>
  );
}

function Verticals() {
  return (
    <section className="sec forest" id="camps">
      <div className="wrap">
        <Head eyebrow="Camps, clubs & events" title="Beyond race day" sub="Six ways to use the park all year." />
        <div className="grid3">
          {D.VERTICALS.map((v) => (
            <article className="card pic" id={v.id} key={v.id}>
              <Scene kind={v.s} /><div className="pad"><p className="tag">{v.tag}</p><h3>{v.name}</h3><p>{v.text}</p><a className="link" href={`#/enquire/${v.id}`}>{v.cta}</a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Estates() {
  return (
    <section className="sec sand" id="da-vinci">
      <div className="wrap">
        <Head eyebrow="Da Vinci 360 · luxury estates" title="Live where the park lives" sub="Our estate projects, kept apart from the sports journey." />
        <div className="grid3">
          {D.ESTATES.map(([n, s]) => <article className="card pic" key={n}><Scene kind={s} /><div className="pad"><h3>{n}</h3><a className="link" href={`#/estates/${n.toLowerCase()}`}>Explore {n}</a></div></article>)}
        </div>
        <a className="btn" href="#/estates">Enquire about estate ownership</a>
      </div>
    </section>
  );
}

function Experiences() {
  return (
    <section className="sec forest" id="experiences">
      <div className="wrap">
        <Head eyebrow="Experiences" title="Find a suitable experience" />
        <ul className="grid3 plain">
          {D.EXPERIENCES.map((e) => (
            <li className="card pic" key={e.t}><Scene kind={e.s} /><div className="pad"><h3>{e.t}</h3><p>{e.d}</p><a className="link" href={`#/enquire/${e.to}`}>Learn more</a></div></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section className="sec sand" id="video-stories">
      <div className="wrap">
        <Head eyebrow="Video stories" title="Stories from the park" />
        <div className="grid3">
          {D.STORIES.map(([t, d, s]) => (
            <article className="card pic" key={t}><div className="poster"><Scene kind={s} /><span className="play sm" aria-hidden="true">▶</span></div><div className="pad"><h3>{t}</h3><p>{d}</p></div></article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="sec forest" id="faq">
      <div className="wrap narrow">
        <Head eyebrow="Questions" title="Before you book" />
        {D.FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="sec sand close">
      <div className="wrap">
        <h2>Ready when you are.</h2>
        <div className="cta-row center">
          <a className="btn" href="#/book">Book Grand Prix · {inr(D.OFFER.price)}</a>
          <button className="btn btn-ghost" onClick={() => go('cities')}>Find my city</button>
          <a className="btn btn-ghost" href="#/enquire/whatsapp">Talk to DPX on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div><b>DPX360</b><p>The Discovery Park. Where eagles dare.</p><p>{D.CONTACT.email}</p><p className="chipline">{D.CONTACT.member.map((m) => <span key={m}>{m}</span>)}</p></div>
        <div>{D.CONTACT.sites.map(([n, a]) => <p key={n}><b>{n}</b><br />{a}</p>)}</div>
        <nav aria-label="Legal"><a href="#/careers">Careers</a><a href="#/safety">Safety &amp; care</a><a href="#/terms">Terms &amp; conditions</a><a href="#/privacy">Privacy</a><a href="#/refund-policy">Cancellation &amp; refund</a><a href="#/credits">Image credits</a></nav>
        <p className="fine">Concept redesign for discussion. Names, prices and dates are taken from the public site as of 10 Nov 2026 and must be confirmed by DPX. All art is original illustration.</p>
      </div>
    </footer>
  );
}

function Sheet({ route }) {
  const close = () => { window.location.hash = ''; };
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', k); document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, []);
  const [kind, id] = route.split('/');
  let title = 'Book Grand Prix', body;
  if (kind === 'city') {
    const c = D.CITIES.find((x) => x.slug === id);
    title = c ? `Enrol — ${c.name}` : 'City not found';
    body = c && (<>
      <p className="muted">{c.state} · {D.LAUNCHPAD.window} · {D.LAUNCHPAD.hours}</p>
      <p><b>Date and venue:</b> to be announced. Get a message when they are confirmed.</p>
      <label className="field"><span>Mobile number</span><input inputMode="tel" placeholder="10-digit number" /></label>
      <p className="price sm"><strong>{inr(D.LAUNCHPAD.withCycle)}</strong> <span>with cycle &amp; gear</span> · <strong>{inr(D.LAUNCHPAD.runOnly)}</strong> <span>run / own cycle</span></p>
    </>);
  } else if (kind === 'book') {
    body = (<>
      <p className="price"><s>{inr(D.OFFER.regular)}</s> <strong>{inr(D.OFFER.price)}</strong> <span>per participant</span></p>
      <ul className="ticks">{D.OFFER.perks.map((p) => <li key={p}>{p}</li>)}</ul>
      <label className="field"><span>Participant age group</span><select defaultValue=""><option value="" disabled>Choose</option>{D.LAUNCHPAD.age.map((a) => <option key={a}>{a}</option>)}</select></label>
    </>);
  } else {
    title = kind === 'enquire' ? 'Enquire' : 'Own page in the full build';
    body = <p>In production this gets its own address, such as <code>/{route}</code>, so it can be linked from ads, WhatsApp and emails.</p>;
  }
  return (
    <div className="scrim" onClick={close}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <button className="x" aria-label="Close" onClick={close}>×</button>
        <h2>{title}</h2><p className="url">dpx360.example/<b>{route}</b></p>{body}
        <button className="btn wide" onClick={close}>Continue (concept — nothing is submitted)</button>
      </div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const route = useRoute();
  if (route === 'pitch') return <Pitch />;
  return (
    <>
      <div className="trail" aria-hidden="true" />
      <div className="banner" role="note">Unofficial redesign concept. Not the official DPX site. Nothing here takes bookings or payments.</div>
      <Header open={open} setOpen={setOpen} />
      <main>
        <Hero /><DiscoverStrip /><Film /><Habit /><GrandPrixSlider /><Offer /><Paths /><Programme /><Cities /><Journey /><Prizes /><Challenge /><Oath /><Partners /><Verticals /><Estates /><Experiences /><Stories /><Faq /><Closing />
      </main>
      <Footer />
      <div className="sticky" role="region" aria-label="Quick booking">
        <div><small>Grand Prix from</small><b>{inr(D.OFFER.price)}</b></div>
        <a className="btn btn-sm" href="#/book">Book now</a>
      </div>
      {route && <Sheet route={route} />}
    </>
  );
}
