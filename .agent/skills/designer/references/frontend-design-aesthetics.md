# Frontend Design Aesthetics — Anti-AI-Slop Guide

> Source: [Anthropic Official Skills](https://github.com/anthropics/skills) (Apache 2.0)

## Design Thinking

Before coding, understand the context and commit to a **BOLD** aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme — brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian
- **Constraints**: Technical requirements (framework, performance, accessibility)
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is **intentionality**, not intensity.

## Anti-AI-Slop Aesthetics

### Typography
- Choose fonts that are **beautiful, unique, and interesting**
- AVOID generic fonts: Arial, Inter, Roboto
- Pair a distinctive display font with a refined body font
- **NEVER** converge on common AI choices (e.g., Space Grotesk) across generations

### Color & Theme
- Commit to a cohesive aesthetic via CSS variables
- Dominant colors with sharp accents > timid, evenly-distributed palettes
- AVOID cliched color schemes (particularly purple gradients on white)

### Motion
- CSS-only solutions for HTML, Motion library for React
- Focus on high-impact moments: **one well-orchestrated page load with staggered reveals** > scattered micro-interactions
- Use scroll-triggering and hover states that surprise

### Spatial Composition
- Unexpected layouts. Asymmetry. Overlap. Diagonal flow.
- Grid-breaking elements. Generous negative space OR controlled density.

### Backgrounds & Visual Details
- Create atmosphere and depth — never default to solid colors
- Gradient meshes, noise textures, geometric patterns, layered transparencies
- Dramatic shadows, decorative borders, custom cursors, grain overlays

## The NEVER List

❌ Overused font families (Inter, Roboto, Arial, system fonts)
❌ Cliched color schemes (purple gradients on white backgrounds)
❌ Predictable layouts and component patterns
❌ Cookie-cutter design lacking context-specific character
❌ Same design choices across different generations

## The ALWAYS List

✅ Match implementation complexity to the aesthetic vision
✅ Maximalist designs → elaborate code, extensive animations
✅ Minimalist designs → restraint, precision, subtle details
✅ Every design should be contextually unique
✅ Vary between light/dark themes, different fonts, different aesthetics
