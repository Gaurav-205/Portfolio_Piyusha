# Hero Components

Two beautiful hero section components for portfolio websites, built with Framer Motion animations.

## Components

### 1. HeroFashion
A minimalist fashion-inspired hero section with elegant typography and hover animations.

**Features:**
- Clean, minimal design
- Animated service list with hover effects
- Professional portrait layout
- Responsive grid system

**Usage:**
```tsx
import HeroFashion from "@/components/ui/hero-fashion";

export default function Page() {
  return <HeroFashion />;
}
```

**Demo:** Visit `/hero-demo` to see it in action.

### 2. HeroPortfolio
A modern, gradient-rich hero section with floating design elements and smooth animations.

**Features:**
- Gradient backgrounds and text effects
- Floating animated design elements
- Staggered text animations
- Call-to-action buttons
- Professional color scheme

**Usage:**
```tsx
import HeroPortfolio from "@/components/ui/hero-portfolio";

export default function Page() {
  return <HeroPortfolio />;
}
```

**Demo:** Visit `/hero-portfolio-demo` to see it in action.

## Customization

### Images
Both components are configured to use your personal portrait photo:

```tsx
// Both components use:
src="/piyusha-portrait.jpg"
```

**To add your photo:**
1. Place your portrait photo in `frontend/public/piyusha-portrait.jpg`
2. Recommended: 4:5 aspect ratio, at least 800x1000px
3. If no photo is provided, a placeholder will be shown

See `frontend/public/README-IMAGES.md` for detailed instructions.

### Content
Update the following sections:
- Name and title
- Service/skill lists
- Description text
- Contact information
- Call-to-action links

### Colors
Both components use customizable color schemes:

**HeroFashion:** Minimal black/white with pink accent
**HeroPortfolio:** Purple/pink gradients with gray tones

### Animations
Built with Framer Motion for smooth, professional animations:
- Hover effects on list items
- Staggered text reveals
- Floating design elements
- Button interactions

## Dependencies

- `motion` - For animations (already installed)
- `framer-motion` - Alternative animation library (already installed)
- Tailwind CSS - For styling (already configured)

## Responsive Design

Both components are fully responsive:
- Mobile-first approach
- Adaptive typography scaling
- Flexible grid layouts
- Touch-friendly interactions

## Integration Options

### Replace Current Homepage
To use either hero as your main homepage:

```tsx
// In app/page.tsx
import HeroPortfolio from "@/components/ui/hero-portfolio";
// or
import HeroFashion from "@/components/ui/hero-fashion";

export default function Home() {
  return <HeroPortfolio />; // or <HeroFashion />
}
```

### Use as Landing Section
Add to existing pages as a landing section:

```tsx
export default function AboutPage() {
  return (
    <>
      <HeroPortfolio />
      {/* Other page content */}
    </>
  );
}
```

## Performance

- Optimized images with proper sizing
- Efficient animations with Framer Motion
- Minimal bundle impact
- Fast loading times