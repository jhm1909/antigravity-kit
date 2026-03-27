---
name: designer
description: >
  UI/UX design intelligence with searchable database. 50+ styles, 161 color palettes, 57 font pairings,
  161 product types, 99 UX guidelines. BM25 search engine for data-driven design decisions.
  Use for creating interfaces, visual identity, design systems, and accessibility.
license: MIT
compatibility: Claude Code, Cursor, Gemini CLI, GitHub Copilot
metadata:
  author: jhm1909
  version: "4.0.0"
  domain: design
  estimated_tokens: 15000
---

# Designer ??Design Intelligence

Expert design guidance powered by a **searchable design database** with BM25 ranking.

## Knowledge Graph

- **extends**: []
- **requires**: []
- **suggests**: [[frontend-developer]], [[research-first]]
- **conflicts**: []
- **enhances**: [[frontend-developer]] (implementation of designs)
- **moc**: [[design-moc]]

---

## Design Intelligence Search (REQUIRED)

Before making ANY design decision, **search the database** for data-driven recommendations.

### Prerequisites

```bash
python3 --version  # Python 3.x required (zero external dependencies)
```

### Design System Generation (Start Here)

```bash
python3 skills/designer/scripts/ui-search/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

**Example:**
```bash
python3 skills/designer/scripts/ui-search/search.py "fintech SaaS dashboard modern" --design-system -p "PayFlow"
```

Returns: Complete design system (style, colors, typography, effects, anti-patterns).

### Domain Search (Deep-Dive)

```bash
python3 skills/designer/scripts/ui-search/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

| Domain | Use For | Example |
|--------|---------|---------|
| `product` | Product type recommendations | `--domain product "SaaS e-commerce"` |
| `style` | UI styles, effects | `--domain style "glassmorphism dark"` |
| `color` | Color palettes by product | `--domain color "fintech professional"` |
| `typography` | Font pairings | `--domain typography "elegant modern"` |
| `chart` | Chart types + libraries | `--domain chart "trend dashboard"` |
| `ux` | Best practices, anti-patterns | `--domain ux "animation accessibility"` |
| `icons` | Icon recommendations | `--domain icons "navigation e-commerce"` |
| `react` | React/Next.js performance | `--domain react "rerender bundle"` |
| `web` | App interface guidelines | `--domain web "touch targets safe areas"` |
| `landing` | Page structure, CTA | `--domain landing "hero social-proof"` |

### Workflow

```
1. ANALYZE requirements ??product type, audience, style keywords
2. SEARCH --design-system ??get full recommendation
3. DEEP-DIVE --domain ??supplement specific needs
4. IMPLEMENT ??using verified, data-driven choices
```

---

## Rule Categories by Priority

| Priority | Category | Impact | Key Checks |
|----------|----------|--------|------------|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, alt text, keyboard nav, aria-labels |
| 2 | Touch & Interaction | CRITICAL | Min 44Ã—44px targets, 8px spacing, loading feedback |
| 3 | Performance | HIGH | WebP/AVIF, lazy loading, CLS < 0.1 |
| 4 | Style Selection | HIGH | Match product type, consistency, SVG icons |
| 5 | Layout & Responsive | HIGH | Mobile-first, viewport meta, no horizontal scroll |
| 6 | Typography & Color | MEDIUM | Base 16px, line-height 1.5, semantic tokens |
| 7 | Animation | MEDIUM | 150-300ms, transform/opacity only, reduced-motion |
| 8 | Forms & Feedback | MEDIUM | Visible labels, error near field, progressive disclosure |
| 9 | Navigation | HIGH | Bottom nav ??, predictable back, deep linking |
| 10 | Charts & Data | LOW | Legends, tooltips, accessible colors |

---

## Core Principles

### Intentionality Over Trends
- **Why this color?** ??Brand meaning, accessibility, contrast
- **Why this font?** ??Readability, personality, performance
- **Why this animation?** ??User feedback, spatial understanding

### Distinctive Over Generic (Anti-AI-Slop)
- ??Default gradients, Inter everywhere, card templates
- ??Committed aesthetic, unique typography, contextual layouts
- ?“– Load [Frontend Design Aesthetics](./references/frontend-design-aesthetics.md) for Anthropic's anti-AI-slop guide

### Technical Excellence
- Semantic HTML first
- CSS custom properties for theming
- Performance-minded animations
- Accessibility as foundation

---

## Pre-Delivery Checklist

### Visual
- [ ] SVG icons (no emojis as UI elements)
- [ ] Consistent icon family and style
- [ ] Semantic theme tokens (no hardcoded hex)

### Interaction
- [ ] All tappable elements have press feedback
- [ ] Touch targets ??4Ã—44pt
- [ ] Micro-interactions 150-300ms
- [ ] Disabled states visually clear

### Light/Dark Mode
- [ ] Primary text contrast ??.5:1 in both modes
- [ ] Dividers/borders visible in both modes
- [ ] Both themes tested before delivery

### Layout
- [ ] Safe areas respected
- [ ] 4/8dp spacing rhythm maintained
- [ ] Verified on small + large screens

### Accessibility
- [ ] All images/icons have alt text
- [ ] Color is never the only indicator
- [ ] Reduced motion supported

---

## Asset Creation Workflow

1. **Generate** with `generate_image` (follow `.agent/rules/nano-banana.md`)
2. **Process** with `scripts/remove_background.py`
3. **Deliver** to [[frontend-developer]] for implementation

---

*Design intelligence v4.0 | Searchable database + Anthropic aesthetics | Source: [Anthropic frontend-design](https://github.com/anthropics/skills)*
