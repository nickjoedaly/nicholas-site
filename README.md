# Nicholas Composer — Website Prototypes

A professional home base website for a composer and researcher, unifying compositional output, software tools, games, scholarly work, and writings under one roof.

## Status

**Phase: Interactive Prototyping**

Seven browser-ready HTML prototypes covering the core user experience. Three remaining pages (About, Scholarly Work, Blog) to be prototyped before transitioning to the Astro build.

## Prototypes

Open any `.html` file directly in your browser — they're fully self-contained with no dependencies.

| # | Page | File | Status |
|---|------|------|--------|
| 01 | Homepage | `prototypes/01-homepage.html` | ✅ Complete |
| 02 | Compositions browse | `prototypes/02-compositions-browse.html` | ✅ Complete |
| 03 | Composition detail | `prototypes/03-composition-detail.html` | ✅ Complete |
| 04 | Commission request | `prototypes/04-commissions.html` | ✅ Complete |
| 05 | Compositional Bestiary | `prototypes/05-bestiary.html` | ✅ Complete |
| 06 | Software & Plugins | `prototypes/06-software-plugins.html` | ✅ Complete |
| 07 | Admin dashboard + AI | `prototypes/07-admin-dashboard.html` | ✅ Complete |
| 08 | About / Bio | — | 🔲 To do |
| 09 | Scholarly Work | — | 🔲 To do |
| 10 | Writings / Blog | — | 🔲 To do |

## Design System

### Palette
- **Navy:** `#0e1b2e` (backgrounds, nav, hero areas)
- **Cream:** `#f5f0e8` (page background, card surfaces)
- **Gold:** `#c8963e` (accents, CTAs, active states)
- **Gold pale:** `#f0e6d0` (tag backgrounds, hover states)

### Typography
- **Headings:** Source Serif 4 (light weight for display, semibold for section heads)
- **Body:** DM Sans (clean, readable)
- **Monospace / metadata:** DM Mono (technical details, tags, labels, dates)

### Key Patterns
- Header motif: faint staff lines with gold noteheads below the nav
- Hero watermark: ghosted score notation behind composition titles (unique per piece)
- Unified warm-tone tags (not multi-colored by category)
- Network graph: clean circle nodes with color-coded edges and legend
- Version tree: indented branches showing compositional lineage
- Card-based dropdowns inspired by Behold.so
- Multi-category additive filtering inspired by Kronos 50 for the Future

### Visual References
- [Behold.so](https://behold.so/) — boxed card dropdowns, clean UI
- [Kronos 50ftf](https://50ftf.kronosquartet.org/composers) — tag filtering across categories
- [David Bruce](https://davidbruce.com/) — illustrative header/footer touches (not body)

## Architecture Plan

### Target Stack
- **Framework:** Astro (static site generation)
- **Data:** JSON Content Collections (one file per composition)
- **Admin:** Custom dashboard with embedded Claude API (diff-based review)
- **Bulk editing:** CSV export/import for AI-assisted batch operations
- **Fonts:** Self-hosted DM Mono, Source Serif 4, DM Sans

### Data Model
Compositions are the central entity. Each JSON file contains:
- Metadata (title, year, duration, movements, status, visibility)
- Tags (nested by category: character, tonality, tempo, technique, instrumentation, difficulty)
- Assets (score, parts, audio, electronics — each with version tracking)
- Licensing terms
- Related versions/arrangements (linked by ID)
- Performance history

### AI Integration
The admin dashboard includes a Claude-powered assistant panel that:
- Reads content collection JSON files
- Proposes batch edits (program note rewrites, tag filling, metadata standardization)
- Shows diffs for human review and approval
- Writes approved changes back to JSON files
- Never modifies data without explicit approval

### Content Sections
| Section | Description |
|---------|-------------|
| Compositions | Browse, filter, preview, and license original works |
| Compositional Bestiary | Physical + digital card game for compositional problem-solving |
| Software & Plugins | MuseScore plugins (Composition Tutor, Form Scaffold) and web tools |
| Scholarly Work | PhD thesis, publications, conference papers |
| Writings | Blog, essays, program notes |
| About | Bio, artistic statement, CV, contact |
| Commissions | Inquiry form with structured fields and process overview |

## Real Plugins Included

### Composition Tutor (v1.0)
Guided diagnostic tool for compositional problem-solving. Decision tree across harmony, melody, texture, rhythm, and form. Each endpoint provides diagnostic reframing, solution strategies, reading references, and a "Discuss with Claude AI" button.

### Form Scaffold (v3.2)
Generates formal scaffolds for 8 form types: Sonata, Rondo, Theme & Variations, Ternary, Binary, Fugue, Concerto, Song Form. Includes historical presets (Classical/Romantic), section properties (tempo, time sig, key), rehearsal marks, staff text, and form map output.

## Next Steps

1. Prototype remaining pages (About, Scholarly Work, Blog)
2. Initialize Astro project with content collection schemas
3. Port prototype designs into Astro components/layouts
4. Build admin dashboard as protected Astro route
5. Integrate Claude API for catalog management
6. Populate with real composition data
