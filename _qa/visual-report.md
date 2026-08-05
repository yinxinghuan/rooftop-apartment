# Rooftop Apartment Visual QA

## Context

- Build: 0.1.0 independent release
- Viewports: 390×844 and 320×568
- Primary evidence: `_qa/ui/rooftop-apartment-*-final-platform-layout-*.png`
- External release evidence: `_qa/ui/rooftop-apartment-entry-final-external-guest-390x844.png`
- Baseline: `_qa/ui/rooftop-apartment-entry-pass1-platform-layout-320x568.png`

## Decision

Pass. Rooftop Apartment is now a single relationship game rather than a selectable world inside a template. No P0/P1 remains.

| Category | Score |
|---|---:|
| Hierarchy | 5 |
| Coherence | 5 |
| Readability | 4 |
| Game feel | 4 |
| Asset quality | 5 |
| Responsive UX | 5 |
| Polish | 5 |

## Findings and fixes

### P1 · Product entry exposed template internals — fixed

The baseline showed a two-world Cartridge selector and engineering controls. The independent build removes both. Browser-direct and AlterU production entries now default to Aigram AI; a valid/restored `chat_id` selects the experimental remote session, while `story_mode=demo` is explicit finite QA only.

### P1 · Shared identity and save boundary — fixed

The copied template initially carried the mother UUID and `stateful-story-template` local namespace. The release has UUID `929af687-289a-4712-b8fb-77a21fbe506f`, local key `rooftop-apartment-save`, one fixed Cartridge, and no Seventh Dock source or world image.

### P1 · Missing independent poster — fixed

The template poster depicted Seventh Dock. Rooftop Apartment now has its own Aigram transit-generated 1024×1024 key art with the exact English title in the top safe area. The 160×160 review keeps the title, protagonist, three housemates and shared-space conflict readable.

### P1 · Narrow avatar overflow — fixed in inherited engine

The Shell uses `minmax(0,1fr)`, the conversation can shrink, and the player bubble reserves 41 px for its avatar. Automated bounding-box and document-width assertions pass at 320 px.

## Foundation audit

- Functional emoji icons: none; custom linear SVG family only.
- Primary actions and all controls meet 44 px targets.
- Horizontal choices use `onClick`; drag-to-scroll does not submit on pointer down.
- Opening and generated-turn captures at 390×844 and 320×568 confirm text-first reading anchors; image placeholder/ready transitions do not move the feed. Choice widths differ by label length and stay within 82vw.
- Aigram default-mode QA forces one HTTP 503, proves scene/state remain unchanged, anchors the visible 44 px retry control, retries the same action with `WORLD_STATE_JSON`, and commits a genuinely new response. Both 390×844 and 320×568 pass.
- Entry, core play, player avatar, check/state feedback, World drawer, platform layout and external guest states are captured.
- Debug HTTPS avatar reaches action, protagonist record and gen-image `ref_url`; fallback stays local and is not sent to img2img.
- Text size: top `Aa` menu, 44 px target, small/standard/large states, 19 px large prose, reload persistence, title/control non-overlap and 320 px overflow assertions pass.
- Formal poster is English-only and validated at 1024 and 160.

## Final recommendation

Average 4.7/5. Default Aigram continuation and real `head_url` are verified; cross-device cloud restoration and experimental remote chatId creation remain production follow-ups.
