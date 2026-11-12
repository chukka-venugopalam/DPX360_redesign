import React from 'react';

const metrics = [
  'Performance',
  'Accessibility',
  'Best Practices',
  'SEO',
  'LCP, INP and CLS',
  'Speed Index and transferred bytes',
];

export default function Pitch() {
  return (
    <div className="pitch">
      <div className="banner" role="note">Internal comparison page · Unofficial redesign concept</div>
      <div className="wrap">
        <a className="back" href="#">← Back to the demo</a>
        <p className="eyebrow">Measurement status</p>
        <h1>Performance results are not yet verified</h1>
        <p className="lede">No Lighthouse reports for both sites under matched conditions are available in this project. This page intentionally avoids estimated scores and unverified improvement claims.</p>
        <div className="tbl" role="table" aria-label="Lighthouse measurement status">
          <div className="tr th" role="row"><span>Metric</span><span>DPX website</span><span>Redesign</span><span>Status</span></div>
          {metrics.map((metric) => (
            <div className="tr" role="row" key={metric}>
              <span>{metric}</span>
              <span>Not measured</span>
              <span>Not measured</span>
              <span className="muted">Comparable reports required</span>
            </div>
          ))}
        </div>
        <h2>Before presenting results</h2>
        <ul className="fixes">
          <li><b>Use the same test setup.</b><p>Record Lighthouse version, browser, device profile, network conditions, location, and the URLs tested.</p></li>
          <li><b>Run repeat tests.</b><p>Capture multiple mobile and desktop runs for each site and report the median rather than a single result.</p></li>
          <li><b>Keep evidence with the comparison.</b><p>Save the reports and include their dates. Do not compare estimates or different test environments.</p></li>
        </ul>
      </div>
    </div>
  );
}
