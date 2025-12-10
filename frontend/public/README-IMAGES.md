# Image Setup Instructions

## Adding Your Portrait Photo

To use your own portrait photo in the hero components:

### Step 1: Add Your Photo
1. Take or select a high-quality portrait photo
2. Rename it to `piyusha-portrait.jpg`
3. Place it in the `frontend/public/` directory

### Step 2: Photo Requirements
- **Format**: JPG, PNG, or WebP
- **Aspect Ratio**: 4:5 (portrait orientation works best)
- **Resolution**: At least 800x1000 pixels for crisp display
- **File Size**: Optimize to under 500KB for fast loading

### Step 3: File Location
```
frontend/
├── public/
│   ├── piyusha-portrait.jpg  ← Your photo goes here
│   └── README-IMAGES.md
```

### Step 4: Alternative Names
If you prefer a different filename, update these components:
- `frontend/components/ui/hero-fashion.tsx`
- `frontend/components/ui/hero-portfolio.tsx`

Change the `src` attribute from `/piyusha-portrait.jpg` to your preferred filename.

### Current Usage
Your portrait is used in:
- Fashion Hero Component (`/hero-demo`)
- Portfolio Hero Component (`/hero-portfolio-demo`)
- Main Portfolio Page (`/portfolio`)
- Modern Portfolio Page (`/portfolio-modern`)

### Fallback
If no image is provided, the components will show a broken image placeholder. Make sure to add your photo for the best experience.

## Image Optimization Tips
- Use tools like TinyPNG or ImageOptim to compress your photo
- Consider using WebP format for better compression
- Ensure good lighting and professional appearance
- Crop to focus on your face and upper body