# Simplex AI — Digital matter

This redesign supersedes the original paper-and-orange visual direction recorded in motion-review.md.

## Visual system
- Graphite #111310 canvas, raised #191c17 surfaces, chalk #f1f2e9 text, and electric lime #c5f465 actions.
- The About manifesto deliberately uses a light chalk surface with dark text.
- Oversized, tightly tracked editorial headings; compact monospaced labels; generous section spacing.
- Shared foundations in app/globals.css; route-specific architecture in app/structure.css.

## Page architecture
- Home: full-width headline, central interactive sculpture with flanking copy, capability index, concept previews, interactive discipline map, process, answers, closing invitation.
- Services: editorial introduction, sticky capability directory, six detailed chapters, engagement section.
- Work: oversized introduction, alternating project showcases, explanatory project stories. Concepts remain explicitly identified as illustrative.
- About: studio introduction with interactive sculpture, contrasting manifesto, principles, partnership statement.
- Contact: full-width introduction, sticky brief guide, project brief form, direct email option, signoff. Downloads remain local; no automatic submission was added.
- Shared footer: studio statement, site directory, contact invitation, oversized linked wordmark.

## Interaction ownership
- app/transition-link.tsx: Next Link wrapper retains prefetching and native modified-click/external-link behavior; persistent GSAP curtain handles route exit and reveal. Same-page anchors use normal navigation. A timeout releases the curtain if navigation fails.
- app/motion.tsx: page entrances, visible-section reveals, pointer-reactive geometry and preview depth, reading progress, pause control. Only visible route content is selected, respecting Next's retained route trees.
- app/ui.tsx: server-rendered 3D CSS torus, cube and sphere; remains visible without JS. Ambient loops stop offscreen and in hidden tabs. Transforms use separate nested owners for pointer and ambient motion.
- app/playground.tsx: accessible discipline tabs with arrow/Home/End keyboard support and a linked visual map.
- Navigation supports Escape to close the mobile menu and restore focus.

## Motion accessibility
OS reduced-motion and the persistent session-local pause control remove displacement, ambient loops and pointer response. Short fades and color feedback remain. Reduced route changes use a short fade. No scroll hijacking or mandatory interaction is needed to read content.

## Verification
Production build, ESLint, browser checks across all five routes at 320/390/768/1440 widths, mouse response, pause persistence, live OS preferences, tabs, FAQ, mobile navigation, brief download and no-JS content. Browser QA artifacts are generated under .next/redesign-review/ and are not committed source.
