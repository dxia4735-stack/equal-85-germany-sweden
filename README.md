# EQUAL / 8.5 — Germany & Sweden

An English-language interactive story about equal pay for equal work or work of equal value, comparing Germany and Sweden within the ambition of SDG Target 8.5.

## Run

Requires Node.js 22.12+ (or a supported newer version) and npm.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm audit --omit=dev --audit-level=high
```

Vite produces `dist/`, suitable for Vercel or another static host. The existing `.openai/hosting.json` retains the project's Sites association. No API keys, backend or external runtime data requests are required.

## Story and interactions

- Equal work / equal value introduction, with the UN target linked.
- Two-country 2024 comparison and a sticky indexed-pay illustration.
- 2014–2024 trend chart with keyboard-accessible year slider and expandable data table.
- Three explanations of the aggregate pay gap and three expandable policy comparisons.
- A qualified conclusion, methodology, direct official sources and downloadable source data.
- Responsive layout, reduced-motion support, keyboard focus, mobile menu with Escape handling and print styles.

The English presentation uses the supplied FIND visual specifications: Instrument Sans, Lora for the closing editorial statement, near-black / light-gray surfaces, large typography, four nested chevron image windows and an original cloud-campus hero. The hero blends into an image-filled EQUAL wordmark during scrolling. GSAP provides heading reveals, image parallax and a transition into the dark policy section. The policy comparisons retain explicit accessible expand/collapse buttons. Workplace photography is illustrative; the opening campus is AI-generated and is not a real German or Swedish location. FIND and CFR are visual references only.

The design uses a separate fluid geometry unit rather than reducing the browser's root font size. Body copy remains readable at narrow widths. Responsive WebP assets cover 375, 768, 1024, 1440 and 1920 pixels; fonts are hosted locally. Reference-only FIND images, property copy, testimonials, and branding are not included.

## Data and interpretation

`src/data/eurostat-sdg-05-20.json` is a Eurostat JSON-stat snapshot retrieved on 16 September 2026. Vite serves and publishes that same file at `/data/eurostat-sdg-05-20.json` for downloads:

https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sdg_05_20?lang=EN&geo=DE&geo=SE&sinceTimePeriod=2014

The snapshot's data update is 26 February 2026. `src/data/pay.js` decodes this snapshot for every quantitative chart; it is not a separate hand-maintained series. Latest common year: 2024, Germany 15.6%, Sweden 11.2%, both provisional. Germany has a break in series in 2022, indicated by a dashed segment and explanatory notes. Both countries' 2023 values are also provisional.

Coverage: employees of enterprises with at least 10 employees in NACE B–S excluding O. The measure is the difference in average gross hourly earnings, as a percentage of men's average. It is unadjusted, not a direct discrimination rate. Indexed earnings use each country's male average as 100; they are not currency amounts or purchasing-power comparisons.

National figures using other wage concepts or populations should not be mixed into this chart. The policy section labels Germany's 2017 law as a historical baseline and distinguishes it from the 2026 EU transposition deadline. It does not assert that each national implementation is complete or estimate causal policy effects.

Sources and prose are in `src/data/content.js`. To update the series, check the Eurostat dimension ordering, country coverage, flags and current latest common year, then update the snapshot, retrieval metadata and any explicit date references in the presentation.

## Verification for this revision

The previous data revision passed production build, dependency audit and DOM interaction checks. The visual revision adds browser checks at desktop and 375-pixel mobile widths: hero, typography, fixed navigation, policy expansion, year-slider values and data-table content. Mobile horizontal overflow was corrected. Reduced-motion handling disables smooth scrolling and scroll-triggered reveals, leaving all content accessible.

## Reuse and license

The project adapts MotionFolio by Firdaus Zickrian under the MIT License. The original copyright notice remains in `LICENSE`; attribution is retained in `THIRD_PARTY_NOTICES.md`. Existing assets and unused animation utilities remain available. Lenis enhances wheel scrolling on fine-pointer devices; touch and reduced-motion preferences use native scrolling. Anchor links, keyboard controls and data interactions remain functional without scroll animation.
