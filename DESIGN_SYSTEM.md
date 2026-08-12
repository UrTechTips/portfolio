# Portfolio Visual Design System Reference

This document is derived from the implementation in the current codebase and is intended for LLM-driven reproduction of the existing website style.

## 1. Overall visual style

- The site is a high-contrast, editorial/portfolio-style experience with a strong split-screen aesthetic.
- The dominant visual language is a monochrome palette with a deliberate black/white inversion effect.
- The landing experience is intentionally dramatic: a large hero title, fixed navigation, and a custom cursor that visually overrides the browser cursor.
- The website favors bold typography, large spacing, flat surfaces, and minimal decoration rather than soft shadows or complex UI kits.
- The design uses a mix of full-width sections and centered content blocks, with strong contrast between light and dark sections.

### Primary implementation files
- src/app/globals.css
- src/components/Landing/page.module.scss
- src/components/sideNav/sideNav.module.scss
- src/components/timeline/timeline.module.scss
- src/app/about/about.module.scss
- src/components/cursor/cursor.module.scss
- src/components/mainAlert/mainAlert.module.scss
- src/components/slider/slider.module.scss

## 2. Color palette

### Core colors
- Light background: #d9d9d9
- Light background (RGBA): rgba(217, 217, 217, 1)
- Dark background: #0d1112
- Dark background (RGBA): rgba(13, 17, 18, 1)
- White: #fff / #ffffff
- Black: #000
- Accent red (legacy loading/progress UI): red

### Semantic usage
- Light section background: #d9d9d9
- Dark section background: #0d1112
- Primary text on light sections: #000
- Primary text on dark sections: #fff
- Borders on dark sections: #fff
- Borders on light sections: #000
- Cursor fill: #ffffff
- Cursor text inversion effect: mix-blend-mode: difference

### State colors
- Project row hover: background becomes #fff, text becomes #000
- Link hover on dark surfaces: text remains white but scales in size and uses mix-blend-mode difference
- Loading progress fill (legacy): red
- Inverse text effect is achieved by mixing white text with the underlying background instead of changing text color explicitly

## 3. Typography

### Font families
- Global body/root font: "Playfair Display", serif
- Landing hero and most interface text: sans-serif
- About page text: sans-serif
- Timeline component CSS declares "Poppins", sans-serif, but no import is present in the component; browser fallback behavior depends on availability
- Landing stylesheet imports Lato from Google Fonts, but the current implementation does not appear to use it directly

### Type scale (implemented values)
- Hero title: 7.5rem on desktop; 5.2rem at 1025px; 4.5rem at 940px
- Section heading on homepage: 5rem (for top-level h1 in .body)
- About heading: 3.5rem in contact block; 2.5rem in about page bio section
- Project title: 2rem
- Navigation item font size: 1.6rem, increasing to 1.75rem on hover
- Body paragraph text: 1.5rem in about section; 1.3rem in project detail text
- Small supporting text: 1.25rem, 1.2rem, 1.35rem, 1.5rem depending on section

### Weight and style
- Headings are bold/strong by default in the CSS cascade, but specific weights are not heavily used beyond standard bold/normal.
- The about page uses emphasized spans with font-weight: 600 and surrounding text at 300.
- Text is generally presented as straightforward, modern sans-serif or serif with no decorative letterspacing except a few narrow values.

### Line height
- Hero text: default line-height from browser, visually stacked due to line breaks
- About copy: 1.9rem
- Project description: 2.3rem
- Timeline content: default paragraph layout

## 4. Spacing, sizing, borders, radius, shadows

### Spacing tokens used repeatedly
- 0.3rem gap for small nav/icon spacing
- 0.5rem padding/margin increments
- 1rem, 1.5rem, 2rem, 2.5rem, 3rem, 4rem, 5rem for section spacing
- 5rem vertical gap between major content blocks

### Layout widths
- Main content width for about/projects/contact sections: 60% on desktop
- Main content width on tablet: 80%
- About page bio/timeline containers: 60% width
- Side navigation: fixed left, 1rem offset from viewport edge
- Hero area: full viewport height minus top nav height, centered vertically and horizontally

### Border radius
- Cursor: 50%
- Progress bar and loading UI: 5rem
- Bento cards and overview cards: 0.5rem
- Main alert: 8px
- Timeline cards: 6px

### Borders
- Dark cards/sections often use 1px solid white or 1px solid black
- Inputs use no visible frame; instead they use a 1px bottom border
- Project list rows use top/bottom border lines

### Shadows
- No box-shadow values appear in the current implementation.
- The style relies on contrast, borders, and spacing rather than elevation shadows.

## 5. Layout structure and responsive behavior

### Page-level structure
- The homepage is a single long page composed of:
  1. Landing hero section
  2. About section
  3. Dark projects section
  4. Dark contact section
- The about page is a standalone route with a fixed back link and a two-column bio/timeline layout.
- Project detail pages use a dark full-page layout with a fixed side navigation and stacked content sections.

### Container patterns
- Centered content blocks with max-width-like behavior using percentages rather than CSS max-width containers.
- Full-width sections with internal centered content using width: 60% or width: 80%.
- Fixed-position elements for navigation and custom cursor.

### Flex/Grid patterns
- Hero: flex with justify-content center and align-items center
- About section: flex column on mobile/desktop, with a row for mainSection on desktop
- Bento section: flex row with gap and wrapping on smaller screens
- Project rows: flex row for left and right columns
- Contact section: flex row with gap; stacked on smaller screens through media queries
- About page bio layout: flex row with image and text columns

### Breakpoints
- 1025px: reduce hero size, alter section widths, stack about main section
- 940px: further reduce hero size and allow wrapping of bento items
- 880px: project detail page switches to a simplified layout and hides the navigation column
- 600px: timeline changes to a single-column mobile layout

## 6. Component styles and variants

### Landing / hero
- Full-height hero with split-color background running from light to dark across the page.
- Large single-line/stacked heading, white and inverted via mix-blend mode.
- Fixed top nav with STron branding at 2.325rem size.
- Scroll indicator positioned bottom-right.

### Side navigation
- Fixed left-side vertical navigation with writing-mode: vertical-rl.
- Navigation items are initially hidden with opacity 0 and animated into view with GSAP.
- Hover increases font size from 1.6rem to 1.75rem.

### About section
- Light background section with centered content.
- Two-part structure: a mainSection with text block and a bento grid of indicator tiles.
- Bento tiles are compact, bordered cards with 1px border and 0.5rem radius.

### Projects section
- Dark background section with white text.
- Project rows are bordered at top/bottom and become white-on-black when hovered.
- Each row has left content (project title) and right content (external link or in-progress state).

### Contact section
- Dark background section with left-side copy and right-side form.
- Form controls are text-only inputs with bottom borders and transparent backgrounds.
- The send button is white with dark text and aligned to the right.

### About page
- Light background page with a fixed back navigation and a compact, editorial bio layout.
- Profile image is grayscale by default and becomes color on hover.
- Timeline is presented as alternating left/right cards with a centered vertical rule.

### Alert / callout
- A small centered popup with dark background, white text, white border, and 8px radius.

### Timeline
- Alternating left/right cards with a centered vertical line.
- White cards on a light background; black text; small date label; arrow markers.

## 7. Component states

### Hover
- Project rows: white background, black text
- Nav links: increased font size
- Links and interactive elements: cursor enlarges to 5rem
- Buttons/interactive text: special cursor effect that sticks to hovered targets
- Profile image: grayscale to full color

### Focus / active
- No explicit focus ring styling is defined for form inputs; the existing implementation relies on browser-default behavior or none.
- Side navigation active state is visually strengthened by increasing font size and color opacity.

### Disabled / loading / error
- Disabled styles are not implemented in the current UI.
- Loading states are inconsistent:
  - A legacy progress-bar loading screen exists in the old SCSS, but the current loading component uses a morphing text effect rather than a bar.
  - Error styling is not defined in the existing codebase; form submission uses alert dialogs rather than inline error UI.

## 8. Reusable UI patterns and conventions

### Pattern 1: Strong contrast section pairing
- Light section followed by dark section or vice versa.
- The same content hierarchy is repeated with different background colors.

### Pattern 2: Border-based cards
- Use thin borders and rounded corners rather than box shadows.
- Typical card: 1px solid border, border-radius 0.5rem, padding 2rem.

### Pattern 3: Inverted text treatment
- In dark sections, use white text and mix-blend differences for cursor and effect layers.
- In light sections, use black text and dark borders.

### Pattern 4: Minimal, custom interactive affordances
- Hover states are often subtle scaling or color inversion instead of full component redesign.
- The cursor is used as a major interaction metaphor.

### Pattern 5: Centered editorial content blocks
- Multi-section pages prioritize wide whitespace and vertically centered/symmetric layout rather than cramped cards.

## 9. Animation and interaction patterns

### GSAP-driven motion
- Hero words: animate from y: 80%, opacity 0, slight rotation on entry.
- Navigation items: slide in from left and fade in.
- Timeline cards: fade/slide up on scroll.
- Timeline center line: grows from 0 to full height using GSAP ScrollTrigger.

### CSS transitions
- Cursor transitions: all 0.25s ease-out
- Project hover transition: all ease-in-out 400ms
- Link hover/scale transitions: all 0.25s ease-in-out
- Slider auto-run animation: 10s linear infinite
- Image hover transitions: 0.3s ease-in-out

### Cursor behavior
- Browser cursor is globally hidden via cursor: none !important.
- A custom cursor is positioned absolutely and changes size, shape, and background depending on hover target.
- On project hover, the cursor becomes a preview frame with the project image.
- On button/interactive text hover, the cursor becomes a rectangular outline that sticks to the element.

## 10. Theme behavior and dark/light mode

- The website does not implement a formal light/dark theme toggle.
- Instead, it uses a hard-coded contrast system:
  - light sections on a light gray background
  - dark sections on a near-black background
- The visual system is effectively “light theme” and “dark theme” by section, not by user preference.

## 11. CSS variables and theme tokens

- No Tailwind is used in this project.
- No CSS custom properties are defined for theme colors or spacing.
- Styling is hard-coded in SCSS modules and a global stylesheet.
- The closest thing to design tokens are direct values such as:
  - #d9d9d9
  - #0d1112
  - #fff
  - #000
  - 1px borders
  - 0.5rem / 1rem / 2rem / 5rem spacing values
  - 50% / 0.5rem / 8px / 6px radii

## 12. Representative code/class examples

### Hero / landing shell
- Classes: .landing, .hero, .heroText, .scrollIndicator
- Source: src/components/Landing/page.module.scss
- Typical behavior: centered hero text, white text with inversion effect, full-height section

### Dark section content block
- Classes: .bodyBlack, .projects, .project
- Source: src/components/Landing/page.module.scss
- Typical behavior: full-width dark background, bordered project rows, hover state to white background/black text

### Form controls
- Classes: .contact, .smallInputs, input[type="text"], textarea, input[type="button"]
- Source: src/components/Landing/page.module.scss
- Typical behavior: bottom-border-only inputs and a white submit button

### About page bio and timeline
- Classes: .container, .bio, .timeline, .textBox
- Source: src/app/about/about.module.scss and src/components/timeline/timeline.module.scss
- Typical behavior: editorial image/text layout and alternating timeline cards

## 13. Inconsistencies and one-off decisions worth knowing

- The site mixes serif and sans-serif typography in a way that is visually intentional but not fully consistent: the global body uses Playfair Display while most UI text uses sans-serif.
- The cursor system is a major design feature and is globally enabled, but the browser cursor is hidden everywhere.
- There are legacy and current loading implementations: the old SCSS defines a progress bar, while the active component uses a morphing text animation.
- Several comments in the source indicate unfinished or TODO font-family decisions; the site still works with the existing declarations as-is.
- The design system is highly manual and hard-coded; there are no reusable theme variables or design tokens beyond raw values in the SCSS.

## 14. LLM Style Instructions

- Preserve the existing monochrome palette: light gray backgrounds, near-black dark sections, white text, and black text on light sections.
- Keep the layout editorial and spacious; avoid dense card-based UI unless the existing code does so.
- Use thin borders and simple rounded corners rather than shadows.
- Favor bold, oversized headings for hero-style sections and more restrained text sizes for supporting content.
- Maintain the split-section contrast between light and dark blocks.
- Reuse the existing spacing values (0.5rem, 1rem, 2rem, 3rem, 5rem) instead of inventing new ones.
- Keep the custom-cursor interaction model in mind when adding interactive elements; if the UI is clickable, it should fit the existing cursor behavior.
- Do not introduce Tailwind or CSS variables unless explicitly requested; mirror the existing hard-coded SCSS style.
- When adding new components, prefer simple borders, strong contrast, and minimal ornamentation over decorative effects.
