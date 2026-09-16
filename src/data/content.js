export const SOURCES = {
  un: { title: 'United Nations · Sustainable Development Goal 8', note: 'Target 8.5 and the 2030 ambition', url: 'https://sdgs.un.org/goals/goal8' },
  eurostat: { title: 'Eurostat · Gender pay gap, sdg_05_20', note: 'Germany and Sweden · 2014–2024 · common coverage', url: 'https://ec.europa.eu/eurostat/databrowser/view/sdg_05_20/default/table?lang=en' },
  methods: { title: 'Eurostat · Gender pay gap statistics', note: 'Definition, coverage and interpretation', url: 'https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Gender_pay_gap_statistics' },
  de: { title: 'German Federal Ministry · Pay transparency law', note: 'Historical baseline: law introduced in 2017', url: 'https://www.bmbfsfj.bund.de/bmbfsfj/ministerium/gesetze/gesetz-zur-foerderung-der-transparenz-von-entgelt-strukturen-116728' },
  se: { title: 'Swedish Equality Ombudsman · Annual pay surveys', note: 'Equal work, work of equal value and documentation', url: 'https://www.do.se/choose-language/english/active-measures/conduct-a-pay-survey-each-year' },
  deCare: { title: 'German Family Portal · Family benefits', note: 'Basic Parental Allowance and Parental Allowance Plus', url: 'https://familienportal.de/familienportal/meta/languages/family-benefits' },
  seCare: { title: 'Försäkringskassan · Parental benefit', note: '480 days per child and reserved days', url: 'https://www.forsakringskassan.se/english/parents/when-the-child-is-born/parental-benefit' },
  eu: { title: 'Council of the EU · Pay transparency', note: 'Directive (EU) 2023/970: common European framework', url: 'https://www.consilium.europa.eu/en/policies/pay-transparency/' },
  ec: { title: 'European Commission · EU action for equal pay', note: 'Transposition deadline: 7 June 2026; national implementation is assessed separately', url: 'https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/gender-equality/equal-pay/eu-action-equal-pay_en' },
};
export const POLICIES = [
  { title: 'Make pay visible', question: 'Who has to ask — and who has to act?',
    de: 'Germany’s 2017 law introduced an individual information right in establishments with more than 200 employees. It also called on private employers with more than 500 employees to review pay structures, with reporting duties for certain large employers.',
    se: 'Sweden’s Equality Ombudsman describes an annual pay survey duty for all employers. Employers with at least ten employees must document the survey and analysis of gender-related pay differences.',
    deSource: 'de', seSource: 'se', label: 'Germany: 2017 baseline / Sweden: published guidance',
    takeaway: 'An information request and a recurring employer review put responsibility in different places. Coverage, follow-through and remedies matter as much as visibility.' },
  { title: 'Share the care', question: 'Who can afford to step away — and return?',
    de: 'Basic Parental Allowance generally supports parents for up to 12 months in total, extended to 14 when the conditions for partner months are met. Parental Allowance Plus offers a different route for combining work and care.',
    se: 'Parental benefit provides 480 days for one child. For two parents, 90 income-related days are reserved for each parent and cannot be transferred to the other. Eligibility and benefit levels vary.',
    deSource: 'deCare', seSource: 'seCare', label: 'Benefit design / not a like-for-like duration ranking',
    takeaway: 'These benefits use different units and payment rules. Their relevance to pay equality lies in who takes leave, how care is shared and what happens to careers afterwards.' },
  { title: 'Value the work', question: 'Are different jobs being assessed fairly?',
    de: 'The German transparency law was introduced to strengthen equal pay for both equal and equivalent work. Its objective extends beyond comparing people with the same job title.',
    se: 'Swedish pay surveys examine equal work and work of equal value. They include comparison of female-dominated work with other work of equal value, looking at demands such as knowledge, skills, responsibility and effort.',
    deSource: 'de', seSource: 'se', label: 'Principle and evaluation / not proof of equal outcomes',
    takeaway: 'A fair pay system needs consistent job evaluation. An economy-wide average cannot tell us whether a particular employer pays equally for work of equal value.' },
];
export const DRIVERS = [
  { title: 'The jobs we do', text: 'Occupations and sectors have different pay levels. Unequal representation across them changes the national average.' },
  { title: 'The paths we take', text: 'Care responsibilities and career interruptions can affect progression, experience and access to higher-paid roles.' },
  { title: 'The pay we can see', text: 'Opaque pay decisions make unequal treatment harder to identify. Clear criteria and usable information help make comparisons possible.' },
];
