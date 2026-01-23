# 🚀 MotoFit 2 Website - Quick Start Guide

## Installation & Running

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup (One-time)
```bash
cd "e:\MotoFit Website\motofit-2"
npm install
```

### Development Server
```bash
npm run dev
```
Then open: **http://localhost:3000**

### Production Build
```bash
npm run build
npm start
```

---

## 🎨 Website Sections

### 1. **Hero** (~100vh)
- Full-screen section
- 3D animated particles background
- Large "MOTOFIT 2" headline with char-by-char animation
- Orange glassmorphism CTA button

### 2. **Stats** (~60vh)
- 4-column grid with borders
- Count-up numbers (150+, 2.4k, 100%, Ahmedabad)
- Animates on scroll

### 3. **Services** (~80vh)
- 4 accordion items
- Hover effects with orange highlights
- Staggered entrance animation

### 4. **Featured Projects** (~100vh)
- Horizontal scrolling gallery
- 4 project cards with colored gradients
- Scroll-linked parallax effect

### 5. **Footer** (~20vh)
- 4-column layout
- Contact info, links, copyright

---

## ⚙️ Configuration

### Change Colors
Edit `src/app/globals.css`:
```css
:root {
  --accent: #ff6b35;  /* Change this */
}
```

### Adjust Animation Speed
Edit any component, e.g. `src/components/Hero.tsx`:
```javascript
duration: 1,  // Increase for slower animations
ease: "power2.out"
```

### Modify Particle Count
Edit `src/components/FloatingEmbers.tsx`:
```javascript
const count = 200;  // More particles = more GPU usage
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (2-3 columns)
- **Desktop**: > 1024px (full 4-column grids)

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Server won't start | Try `npm install` first, check Node version |
| Animations not working | Check browser console for errors, verify GSAP loaded |
| Particles not visible | Check WebGL support (not all browsers), try Chrome |
| Cursor not showing | Mouse must be over interactive elements (buttons, links) |
| Scroll is jittery | Disable animations on slower devices, reduce particle count |

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main page (imports all sections) |
| `src/components/Hero.tsx` | Hero section with 3D |
| `src/components/Stats.tsx` | Statistics grid |
| `src/components/Services.tsx` | Accordion |
| `src/components/FeaturedProjects.tsx` | Scroll gallery |
| `src/app/globals.css` | Global styles & colors |

---

## 🎬 Animation Libraries Used

- **GSAP**: Text animations, scroll triggers, count-ups
- **Three.js**: 3D particle system
- **React Three Fiber**: 3D in React
- **Lenis**: Smooth scrolling

---

## 📊 Performance Tips

1. **Mobile Users**: Reduce particle count to 100
2. **Slower PCs**: Disable 3D animations on scroll
3. **Best Performance**: Use Chrome/Edge (better WebGL)

---

## 🚢 Deployment

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel deploy
```

### Option 2: Self-Hosted
```bash
npm run build
node_modules/.bin/next start
```

### Option 3: Docker
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📞 Support

For issues or questions:
1. Check `BUILD_SUMMARY.md` for detailed info
2. Review error messages in browser console
3. Check Next.js documentation: https://nextjs.org/docs

---

**Built with ❤️ for MotoFit 2** | Next.js 14 + GSAP + Three.js
