# MotoFit 2 - High-Performance Motorcycle Engineering Website

An award-winning, Antimatter-inspired website for MotoFit 2 - a futuristic motorcycle garage in Ahmedabad, India. Built with cutting-edge web technologies for maximum performance and immersive animations.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router, React Server Components)
- **Styling**: Tailwind CSS with custom dark theme
- **Animations**: GSAP (GreenSock) + ScrollTrigger for scroll-based animations
- **3D Graphics**: Three.js + React Three Fiber (R3F) for floating particles
- **Smooth Scrolling**: Lenis for buttery-smooth inertia scrolling
- **TypeScript**: Full type safety across the application

## 🎨 Design System

### The Antimatter Aesthetic

**Color Palette**:
- **Deep Black**: `#050505` (background)
- **Accent Orange**: `#ff6b35` (interactive elements, highlights)
- **Grid Gray**: `#1a1a1a` (borders, subtle dividers)

**Typography**:
- **Headings**: Inter (900 weight, uppercase, tight tracking, `mix-blend-mode: difference`)
- **Body**: Inter (400-500 weight)

**Key Design Elements**:
- Thin borders (`border-neutral-800`) creating strict grid structure
- Custom cursor (expanding ring + dot on hover)
- Glassmorphism effects on CTAs
- Smooth transitions and staggered animations

## 📁 Project Structure

```
motofit-2/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Lenis provider
│   │   ├── page.tsx            # Home page (imports all sections)
│   │   └── globals.css         # Global Tailwind + custom styles
│   ├── components/
│   │   ├── Hero.tsx            # Hero section with 3D background
│   │   ├── HeroContent.tsx     # Split text animation + CTA
│   │   ├── FloatingEmbers.tsx  # Three.js 3D particle system
│   │   ├── Stats.tsx           # 4-column grid with count-up numbers
│   │   ├── Counter.tsx         # Count-up animation component
│   │   ├── Services.tsx        # Interactive accordion with image backgrounds
│   │   ├── FeaturedProjects.tsx # Horizontal scroll gallery
│   │   ├── Footer.tsx          # Site footer
│   │   ├── LenisWrapper.tsx    # Lenis smooth scroll provider
│   │   └── CustomCursor.tsx    # Custom cursor tracking
│   └── globals.css
├── public/                      # Static assets
├── next.config.ts              # Next.js configuration
└── package.json
```

## 🎯 Sections

### 1. **Hero Section**
- **3D Background**: 200 floating particles (embers/sparks) with sine/cosine animation
- **Headline**: "MOTOFIT 2" with character-by-character slide-up animation
- **Subheading**: "Advanced Motorcycle Engineering & PWA Diagnostics"
- **CTA Button**: "Initialize Build" with glassmorphism and hover scale effect
- **Animation**: 1.2s easing with GSAP from-animation

### 2. **Stats Grid**
- **Layout**: 4-column responsive grid with thin vertical/horizontal borders
- **Content**:
  - "150+" Custom Builds
  - "2.4k" PWA Users
  - "100%" Precision
  - "Ahmedabad" HQ
- **Animation**: Number count-up on scroll trigger (0 → target over 2s)

### 3. **Services Accordion**
- **4 Interactive Items**:
  1. Custom Fabrication
  2. ECU Remapping
  3. PWA Health Check
  4. Royal Enfield Modification
- **Interactions**:
  - Hover: Text turns orange, background image fades in
  - Toggle: +/- indicator
  - Smooth transitions on all states

### 4. **Featured Projects**
- **Horizontal Scroll**: Container scrolls on vertical scroll (scrub: 1)
- **4 Project Cards**:
  - Thunderbird 350 Mod
  - MotoFit App v2
  - Hunter 350 Pro
  - Scooty Pep+ Reimagined
- **Effects**: Hover scale, parallax image movement, gradient overlays

### 5. **Footer**
- 4-column layout (About, Services, Connect, Location)
- Copyright & legal links
- Responsive design

## 🎬 Animation Details

### GSAP ScrollTrigger Usage
All scroll animations use ScrollTrigger for optimal performance:
```javascript
gsap.from(element, {
  opacity: 0,
  y: 30,
  scrollTrigger: {
    trigger: containerElement,
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  duration: 0.8,
  ease: "power2.out",
});
```

### Lenis Smooth Scroll
Provides inertia-based smooth scrolling with 1.2s duration easing.

### 3D Particles (Three.js)
- 200 points animated with sine/cosine waves
- Orange color (`#ff6b35`) with size attenuation
- Efficient particle system with `BufferGeometry`

### Custom Cursor
- Hidden by default (CSS: `cursor: none`)
- Ring expands to `scale-150` on hover over interactive elements
- Smooth position tracking with `requestAnimationFrame`

## 🚀 Getting Started

### Installation
```bash
cd motofit-2
npm install
```

### Development
```bash
npm run dev
```
Navigate to `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## 📊 Performance Optimizations

- **Next.js Turbopack**: Faster builds and HMR
- **React Compiler**: Automatic memoization
- **Image Optimization**: Next.js `Image` component with lazy loading
- **Code Splitting**: Automatic per-route splitting
- **3D Optimization**: Efficient particle system with `useFrame` and `BufferGeometry`
- **Scroll Performance**: GSAP ScrollTrigger with requestAnimationFrame

## 🎨 Customization Guide

### Change Accent Color
Edit `src/app/globals.css`:
```css
:root {
  --accent: #your-color;
}
```

### Adjust Animation Speed
In component files, modify:
```javascript
duration: 0.8,  // Increase for slower animations
ease: "power2.out",  // Try "sine.inOut", "back.out", etc.
```

### Modify 3D Particles
In `src/components/FloatingEmbers.tsx`:
```javascript
const count = 200;  // Number of particles
PointMaterial size={0.3}  // Particle size
color="#ff6b35"  // Particle color
```

## 📱 Responsive Design

All sections are fully responsive:
- Mobile-first Tailwind breakpoints
- Adaptive grid layouts (1 col → 4 col)
- Touch-friendly interactive elements
- Optimized font sizes across devices

## 🔗 Key Files Reference

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, Lenis provider |
| `src/app/globals.css` | Global styles, CSS variables |
| `src/components/Hero.tsx` | Hero + 3D background |
| `src/components/Stats.tsx` | Animated statistics grid |
| `src/components/Services.tsx` | Accordion with image hover |
| `src/components/FeaturedProjects.tsx` | Horizontal scroll gallery |
| `src/components/CustomCursor.tsx` | Mouse tracking cursor |

## 🐛 Troubleshooting

**3D Particles Not Showing?**
- Check WebGL support in browser
- Verify Three.js Canvas renders
- Check console for WebGL errors

**Animations Lagging?**
- Reduce particle count in `FloatingEmbers.tsx`
- Disable GSAP ScrollTrigger on mobile
- Use Chrome DevTools Performance tab

**Custom Cursor Not Working?**
- Ensure `cursor: none` CSS is applied
- Check mouse event listeners in `CustomCursor.tsx`
- Verify cursor elements have correct z-index

## 📞 About MotoFit 2

- **Location**: Ahmedabad, India
- **Hours**: Mon-Sat 10AM-8PM
- **Services**: Custom motorcycle builds, ECU tuning, PWA diagnostics, Royal Enfield modifications
- **Tech**: Developing proprietary PWA diagnostic platform

---

**Built with ❤️ for MotoFit 2** | Inspired by Antimatter.design Aesthetic | Next.js 14 + GSAP + Three.js
