# Motion review and implementation

## Design language
- Audited surface: the Simplex AI marketing site, from the shared layout through Home, Services, Work, About, and Contact.
- Design sources: app/globals.css, app/ui.tsx, app/motion.tsx, and the five route compositions. No separate governing design document found.
- Documented decisions: existing paper, orange, and charcoal palette; native scrolling; scoped animation cleanup; ambient work stops offscreen and in hidden tabs. The request explicitly adds accessible animation and a more polished motion direction.
- Governing owners and consumers: layout.tsx now owns one persistent Motion wrapper. Route headings expose motion-line spans; shared cards and artwork retain their existing CSS owners.
- Explicit exceptions: None documented.

## Findings
| # | Problem | Evidence | Proposed change | Scope | Confidence |
| --- | --- | --- | --- | --- | --- |
| 1 | Continuous decorative motion lacked a pause control. | The original Motion effect created repeat:-1 ambient timelines consumed by Home and About. The requested accessible-animation policy requires a control for autoplay lasting more than five seconds. | Add a keyboard-accessible pause toggle, persisting through client navigation. | Shared layout and Motion | High |
| 2 | Reduced motion removed useful state feedback. | Both original reduced-motion CSS blocks used animation:none and transition:none universally, contradicting the requested tiered policy. | Retain short opacity/color transitions while removing movement and JS ambient work, including live preference updates. | Site-wide motion styles | High |
| 3 | Project preview transforms had competing owners. | ProjectGrid renders demo-window/chat-window under project-art; CSS hover rules and GSAP quickTo both wrote their transforms. | Give GSAP sole ownership of animated preview transforms and remove CSS hover transform rules. | Home and Work previews | High |

## Improve first
Provide control over ambient motion: this addresses the strongest accessibility finding on the site's primary visual.

## Implemented direction
The user requested direct improvements, so the findings were implemented along with staged, clipped heading entrances, restrained section reveals, pointer-responsive preview depth, slower ambient orbits, and keyboard-visible feedback. No dependencies were added. Content is visible without JavaScript. Motion effects clean up on route and preference changes. The pause toggle is session-local and survives client-side page navigation; reloading resets it. OS reduced-motion preferences always take precedence.

## Verification
Production build and ESLint; browser checks for all five routes, desktop and mobile layouts, client navigation, pause/resume, live reduced-motion changes, reduced hover states, retained fades, and content with JavaScript disabled. Screenshots are generated under .next/motion-review/ (build artifacts, not committed source).
