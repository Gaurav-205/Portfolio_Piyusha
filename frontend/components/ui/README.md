# UI Components

## Magic Cursor System

A physics-based smooth cursor with rotation effects based on movement direction, powered by Framer Motion.

### Components

#### `SmoothCursor` (Magic Cursor)
Advanced smooth cursor with rotation effects and spring physics.

```tsx
import { SmoothCursor } from "@/components/ui/magic-cursor";

<SmoothCursor 
  cursor={<CustomCursorComponent />}
  springConfig={{
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  }}
/>
```

#### `SmoothCursorDemo`
Demo component showing the cursor in action.

```tsx
import { SmoothCursorDemo } from "@/components/ui/magic-cursor";

<SmoothCursorDemo />
```

### Features

- 🎯 **Smooth Physics**: Framer Motion spring-based animation system
- 🔄 **Rotation Effects**: Cursor rotates based on movement direction
- ⚡ **Performance Optimized**: Uses requestAnimationFrame with throttling
- 📱 **Mobile Aware**: Automatically disables on mobile devices
- 🎨 **Customizable**: Easy to style and configure with custom cursor designs

### Cursor States

- **Default**: Small circle with center dot
- **Hover**: Larger animated circle for interactive elements
- **Click**: Compressed state during mouse down
- **Text**: Vertical line for text inputs

### Usage Tips

1. Add `cursor-pointer` class to interactive elements
2. The system automatically detects buttons, links, and inputs
3. Global CSS hides the default browser cursor
4. Mobile devices won't show the custom cursor

### Global CSS Setup

```css
/* Hide default cursor */
* {
  cursor: none !important;
}

/* Keep text cursor for inputs */
input,
textarea,
select,
[contenteditable] {
  cursor: text !important;
}
```

### Spring Configuration

```tsx
interface SpringConfig {
  damping: number;    // How quickly animation settles (default: 40)
  stiffness: number;  // Spring stiffness (default: 350)
  mass: number;       // Virtual mass (default: 0.8)
  restDelta: number;  // Animation completion threshold (default: 0.001)
}
```

### Browser Support

- Modern browsers with requestAnimationFrame support
- CSS transforms and pointer events
- Gracefully degrades on unsupported browsers