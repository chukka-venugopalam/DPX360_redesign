// Business facts below were checked against the public DPX site on 12 Nov 2026.
// The illustrations are original to this concept; client-approved photography is still needed.

export const NAV = [
  { id: 'cities', label: 'Run & Ride cities' },
  { id: 'grand-prix', label: 'Grand Prix' },
  { id: 'camps', label: 'Camps & clubs' },
  { id: 'partners', label: 'Partners' },
  { id: 'faq', label: 'FAQ' },
];

const ap = ['Rajahmundry', 'Kakinada', 'Visakhapatnam', 'Vijayawada', 'Ongole', 'Nellore', 'Anantapur', 'Kadapa', 'Kurnool'];
const ts = ['Khammam', 'Warangal', 'Nalgonda', 'Karimnagar', 'Hyderabad', 'Mancherial', 'Nizamabad', 'Mahbubnagar'];
const cityDates = {
  Rajahmundry: '15 Nov 2026',
  Kakinada: '22 Nov 2026',
  Khammam: '28 Nov 2026',
  Visakhapatnam: '29 Nov 2026',
  Warangal: '29 Nov 2026',
  Nalgonda: '5 Dec 2026',
  Karimnagar: '5 Dec 2026',
  Hyderabad: '6 Dec 2026',
  Mancherial: '6 Dec 2026',
  Ongole: '12 Dec 2026',
  Nizamabad: '12 Dec 2026',
  Vijayawada: '13 Dec 2026',
  Mahbubnagar: '13 Dec 2026',
  Nellore: '19 Dec 2026',
  Anantapur: '19 Dec 2026',
  Kadapa: '20 Dec 2026',
  Kurnool: '20 Dec 2026',
};
export const CITIES = [
  ...ap.map((name) => ({ name, slug: name.toLowerCase(), state: 'Andhra Pradesh', date: cityDates[name] })),
  ...ts.map((name) => ({ name, slug: name.toLowerCase(), state: 'Telangana', date: cityDates[name] })),
].sort((a, b) => a.name.localeCompare(b.name));

export const DESTINATIONS = [
  { name: 'Ocean Thunder', scene: 'ocean' },
  { name: 'Paderu', scene: 'hills2' },
  { name: 'Lambasingi', scene: 'hills' },
  { name: 'Araku Valley', scene: 'valley' },
];

export const DISCOVER = [
  { t: 'Kids', d: 'First runs and first rides, at their own pace.', s: 'kids' },
  { t: 'Schools & colleges', d: 'Day-out and overnight adventure camps.', s: 'school' },
  { t: 'Riders', d: 'Red-soil trails and skill discovery.', s: 'riders' },
  { t: 'Shared experiences', d: 'Good company, great outdoors.', s: 'family' },
  { t: 'Senior adventurers', d: 'Discovery has no age limit.', s: 'seniors' },
  { t: 'Teams', d: 'Retreats shaped around your group.', s: 'corporate' },
];

export const OFFER = {
  price: 2950, regular: 3950,
  perks: ['Grand Prix Discovery programme', 'DPX cycle and safety gear included', 'One free Launchpad city entry', 'Eligible for prizes at both events'],
  note: 'Limited advance allocation. Regular price ₹3,950 once the offer closes. Discovery entry does not include competitive finals or multi-day races.',
  kit: 'One T-shirt and one kit are issued across the two events. Each event has its own results, awards and completion record.',
};

export const LAUNCHPAD = {
  withCycle: 1999, runOnly: 1299, window: '15 Nov – 20 Dec 2026', hours: '5:00 – 11:30 am',
  starts: 'Run from 6:30 am · Ride from 8:15 am', age: ['8–12', '13–17', '18–39', '40–59', '60+'],
};

export const PATHS = [
  { id: 'beginner', tag: 'Start here', title: 'Student & beginner', text: 'First runs, first rides, age-appropriate discovery.', cta: 'Start here', s: 'kids' },
  { id: 'amateur', tag: 'Go further', title: 'Amateur & experienced', text: 'Sport, endurance and advanced challenges for your next step.', cta: 'Find my challenge', s: 'riders' },
  { id: 'elite', tag: 'Bring your race', title: 'Elite & professional', text: 'Competitive categories with focused preparation.', cta: 'Enter my race', s: 'podium' },
  { id: 'ultra', tag: 'Answer the big call', title: 'Ultra-endurance', text: 'Long-distance and multi-day riding. Grand Prix 500 awaits.', cta: 'Apply for my challenge', s: 'hills2' },
];

export const PROGRAMMES = [
  { days: '1 day', title: 'Run or ride', when: 'Selected dates, 3–17 Jan', detail: 'Pick one day, run or ride.' },
  { days: '3 days', title: 'Mountain challenge', when: '9–11 Jan', detail: '150 or 300 km riding formats.' },
  { days: '5 days', title: 'Grand Prix 500', when: '13–17 Jan', detail: 'Pre-qualified MTB entrants. 500 km cumulative across five stages.' },
  { days: 'Finale', title: 'Finals & celebration', when: '17 Jan 2027', detail: 'MTB and running finals.' },
];
export const ROUTE = ['Ocean Thunder', 'Lambasingi', 'Paderu', 'Araku Valley', 'Borra Caves'];

export const JOURNEY = [
  ['Take the oath', 'Promise yourself, your family and your community daily movement and real-world discovery.'],
  ['Run & ride', 'Run, walk or cycle in your Launchpad city and find your starting level.'],
  ['Practise', 'Build the habit and the skill for a suitable Grand Prix programme.'],
  ['Answer the call', 'Choose your age-appropriate Grand Prix experience. Advanced entries need approval.'],
];
export const SEASONS = [['Winter 1.0', 'January 2027', true], ['Summer 2.0', 'Planned', false], ['Post-monsoon 3.0', 'Planned', false]];

export const PRIZES = {
  perCity: '₹2,00,000', split: [['Running', '₹1,00,000'], ['Cycling', '₹1,00,000']],
  podium: [['1st', '₹5,000'], ['2nd', '₹3,000'], ['3rd', '₹2,000']], flagship: '₹25 lakh',
};

export const OATH = [
  'I will make room for movement, learning and real-world discovery.',
  'I will walk, run or cycle every day, at a level that suits me, and spend less free time scrolling.',
  'I will invite my family, friends and neighbours to join me.',
  'For a healthier self, a stronger community and a healthier nation, I begin today and keep going.',
];

export const AFFILIATE = ['Your partner ID', 'Personal referral link', 'Partner dashboard', 'Promotional support'];

export const VERTICALS = [
  { id: 'schools', tag: 'Schools & colleges', name: 'Every child is a hero', text: 'Day-out and overnight adventure camps that turn curiosity into confidence.', cta: 'Explore camps & book', s: 'school' },
  { id: 'reunions', tag: 'Family & alumni reunions', name: 'Come together', text: 'Family, school and college reunions with nature and shared adventures.', cta: 'Plan my reunion', s: 'family' },
  { id: 'corporate', tag: 'Corporate events & retreats', name: 'Better together', text: 'Team days, corporate camps and work-from-hills escapes.', cta: 'Plan a team experience', s: 'corporate' },
  { id: 'wild-wings', tag: 'Foundation circle · monthly', name: 'Wild Wings', text: 'Monthly MTB discovery with complimentary horse bonding and joy rides. Sessions of 2–3 hours.', cta: 'View Wild Wings & enrol', s: 'wild' },
  { id: 'royal-hawk', tag: 'Weekly premium', name: 'Royal Hawk', text: 'A weekly three-hour session combining MTB, equestrian discovery and a refreshing break.', cta: 'View Royal Hawk & enrol', s: 'hawk' },
  { id: 'stays', tag: 'Camps & expeditions', name: 'Coast to the clouds', text: 'Ocean Thunder, Lambasingi and Araku: day-outs, overnight stays and longer journeys.', cta: 'Explore stays & book', s: 'glamp' },
];

export const ESTATES = [['Olympus', 'estate'], ['Atlantis', 'glamp'], ['Odyssey', 'estate']];

export const EXPERIENCES = [
  { t: 'MTB trails', d: 'Red-soil terrain, movement and skill discovery.', s: 'riders', to: 'wild-wings' },
  { t: 'Equestrian discovery', d: 'A closer connection with horses and the outdoors.', s: 'equestrian', to: 'royal-hawk' },
  { t: 'Childhood games', d: 'Friendly games, teamwork and the joy of playing again.', s: 'games', to: 'group-day' },
  { t: 'Senior discovery', d: 'Gentle outdoor experiences at your pace.', s: 'seniors', to: 'senior' },
  { t: 'Trekking & discovery', d: 'Shared trails and the mountains calling.', s: 'trek', to: 'trekking' },
  { t: 'Motorcycle expeditions', d: 'A different journey through the hills.', s: 'moto', to: 'expeditions' },
];

export const STORIES = [
  ['Trails, skills & adventure', 'MTB preparation, coaching and the joy of the ride.', 'riders'],
  ['Every child is a hero', 'Supervised learning, first rides and growing confidence.', 'kids'],
  ['Outdoors, together', 'Family reunions, shared adventures and team memories.', 'family'],
];

export const FAQ = [
  ['Can I do both running and cycling?', 'Yes. Select both when you register. They have separate starts and results. Planned main starts: running from 6:30 am, cycling from 8:15 am. Exact waves and junior sessions are confirmed per city.'],
  ['What is the Grand Prix double benefit?', 'Book the ₹2,950 advance offer and reserve one free Launchpad city entry. Cycle and gear are included for booked activities, subject to stock. The physical kit is issued once.'],
  ['What if I book Launchpad first?', 'Complete your paid city activity and get 25% off the prevailing regular Grand Prix price. At ₹3,950 that is ₹2,962.50. It does not stack with the advance offer.'],
  ['Do I need to win to attend the Grand Prix?', 'No. Winners and non-winners can choose a suitable programme. Age, skill, fitness and experience decide course eligibility. Long and technical formats need assessment.'],
  ['Can I win prizes at both events?', 'Yes, in each event and sport where you entered an eligible prize category. Running and cycling have independent results. Discovery entry does not buy a competitive final.'],
  ['How many T-shirts and kits will I receive?', 'One T-shirt and one set of physical participant-kit items across the two-event offer. Each event has its own credentials, completion record and eligible awards.'],
];

export const CONTACT = {
  email: 'support@dpxlive360.com',
  sites: [
    ['Ocean Thunder', 'Ocean Discovery Beach, oceanfront, near Tuni, Visakhapatnam region, Andhra Pradesh'],
    ['DPX Discovery Highway Hub', 'Basecamp, NH-16, beside Indian Oil petrol bunk, Vempadu village, Nakkapalli mandal, Anakapalli district, Andhra Pradesh'],
  ],
  member: ['ATOAI allied member', 'Member of Equestrian Association'],
};

export const LINKS = {
  website: 'https://www.dpxlive360.com/',
  booking: 'https://www.dpxlive360.com/grand-prix/student-beginner',
  launchpad: 'https://www.dpxlive360.com/launchpad',
  login: 'https://www.dpxlive360.com/portal/login',
  affiliate: 'https://www.dpxlive360.com/affiliate/apply',
  whatsapp: 'https://wa.me/918186085876',
  film: 'https://www.dpxlive360.com/hp/assets/live-discovery-park.mp4',
};
