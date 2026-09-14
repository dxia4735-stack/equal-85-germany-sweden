# EQUAL / 8.5

An interactive SDG Target 8.5 presentation site comparing Germany and Sweden. It turns the supplied cinematic reference into an original visual system for the course project.

## Run

```powershell
npm ci
npm run dev
```

For the production bundle:

```powershell
npm run build
npm audit --omit=dev --audit-level=high
```

## Project content

The site covers the target definition, country context, four tests of progress, an illustrative comparison index, a comparative conclusion, and source links. Replace illustrative chart values with the latest comparable data before the oral presentation.

## Reuse and license

This project adapts the open-source MotionFolio repository by Firdaus Zickrian under the MIT License. The original copyright notice is preserved in `LICENSE`; attribution and the retained mechanisms are documented in `THIRD_PARTY_NOTICES.md`.

Reused foundations: React/Vite project structure, Lenis integration, GSAP/ScrollTrigger setup and reduced-motion handling.

Removed foundations: portfolio content, AI services, project routes, personal metadata, sample photos, demo tracking and unrelated files.
