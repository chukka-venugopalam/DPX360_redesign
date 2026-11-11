import React from 'react';
import { PITCH } from './data.js';

const rows = [
  ['Lighthouse performance (mobile)', 'perf', 'Target 90+'],
  ['Layout shift (CLS)', 'cls', 'Good is under 0.1'],
  ['Largest contentful paint', 'lcp', 'Good is under 2.5 s'],
  ['Speed Index', 'si', 'Target under 4 s'],
  ['Page weight', 'weight', 'Target under 2 MB with photos'],
  ['Video', 'video', 'Poster first, load on tap'],
  ['Mobile length', 'screens', 'First visit, same content'],
];

const fixes = [
  ['Reserve space for the video block', 'Their layout shift was 0.484 in the first run and 0.055 in the latest; the film section is the source. A 16:9 box with a poster removes it.'],
  ['Poster-first video', '3.2 MB of video loads before anyone presses Play. Here it loads only on tap.'],
  ['Right-sized images', 'Their report estimates about 2.7 MB of image savings, for example a 2 MB PNG shown at 280 px.'],
  ['Web fonts that do not block', 'TTF and OTF files delay first text. System fonts here, or WOFF2 with font-display: swap.'],
  ['One city list, with search', 'Their cities appear in two long sections. Here: one searchable list, one address per city.'],
  ['Booking above the fold', 'Two buttons on the first screen plus a sticky Book bar on mobile.'],
  ['Labeled carousel controls', 'Arrow buttons with names, a visible counter, and native swipe.'],
];

export default function Pitch() {
  return (
    <div className="pitch">
      <div className="banner" role="note">Unofficial redesign concept. Not the official DPX site.</div>
      <div className="wrap">
        <a className="back" href="#">← Back to the demo</a>
        <p className="eyebrow">Optimization summary</p>
        <h1>Same content, faster and easier to book</h1>
        <p className="lede">Measured with Lighthouse (mobile). Their numbers come from the report saved on 10 Nov 2026. The concept numbers are from our build.</p>
        <div className="tbl" role="table" aria-label="Before and after">
          <div className="tr th" role="row"><span>Metric</span><span>DPX today</span><span>Concept</span><span>Note</span></div>
          {rows.map(([l, k, n]) => (
            <div className="tr" role="row" key={k}><span>{l}</span><span>{PITCH.theirs[k]}</span><b>{PITCH.concept[k]}</b><span className="muted">{n}</span></div>
          ))}
        </div>
        <p className="fine">Fair-comparison note: the concept uses lightweight illustrations. With real photos at the right size, expect a lower score than shown, still well above today. Their report also carried a Lighthouse warning that the page loaded too slowly to finish.</p>
        <h2>What changed</h2>
        <ul className="fixes">{fixes.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ul>
        <p className="fine">Accessibility, best practices and SEO already score 100 on their site, and the concept keeps all three at 100.</p>
      </div>
    </div>
  );
}
