# Simplex AI — outcome-led service website

## Positioning

Simplex AI sells measurable service outcomes: faster customer resolution, more team capacity, better decisions, and smoother digital journeys. The site explains how a workflow is defined, deployed, measured, and improved. Illustrative scenarios remain explicitly labeled; they are not presented as client results.

## Visual system

- A quiet light canvas, near-black editorial type, and one blue action color.
- Spacious layouts on an 8px rhythm, large compact headlines, and restrained surface elevation.
- A dark operational flow diagram provides the primary visual anchor. It shows signal, AI with human judgment, and the measured outcome.
- A dark service-model section and a blue closing invitation create deliberate changes in pace.
- Structural styles are in `app/base.css`; color, type, surfaces, and responsive refinements are in `app/premium.css`. The old studio CSS and unused showcase components were removed.

## Motion

GSAP handles page entrances, section reveals, and reading progress. Intro timing was shortened, text rotation removed, and animation logic for removed studio visuals deleted. Route transitions remain brief and reduced-motion preferences retain a static readable presentation. The persistent motion control remains available when system reduced motion is not enabled.

## Page architecture

- Home: outcome promise, operational visual, four outcomes, service model, process, answers, CTA.
- Outcomes: measurable priorities and the service elements behind each.
- Scenarios: two clearly illustrative workflows.
- About: operating philosophy, principles, and partnership model.
- Contact: outcome-first brief with a local download and direct email path. The form does not submit data to a server.

## Verification

Production build, TypeScript, and ESLint passed after the visual system change. The computer preview bridge did not provide a reliable page screenshot, so visual browser QA remains outstanding.
