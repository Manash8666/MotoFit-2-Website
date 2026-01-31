# Future Roadmap - MotoFit 2
> **Last Updated:** Jan 2026 (Live Deployment Check)
"Your Trusted Garage: Service, Repair, & Customization."

This document outlines the vision for the MotoFit 2 Website. The goal is to represent a **Real Indian Aftermarket Garage**—a place that handles everything from a basic oil change to a full-blown custom build. The website must build trust, showcase expertise across *all* services, and drive walk-ins/inquiries.

## Phase 1: The Trust & Utility Foundation (The "Garage" Core)
- [x] **Comprehensive Service Menu**: distinct sections for "General Service" (Periodic Maintenance), "Crash/Insurance Repair", "Engine Rebuilds", and "Performance Upgrades".
- [x] **Flexible Booking System**: Garage work is unpredictable. Instead of fixed time slots (e.g., "10:00 AM"), use **"Drop-off Windows"** (e.g., "Drop-off: 9AM-8PM").
    - *Logic*: User requests a slot -> Shop confirms availability via WhatsApp -> Bike dropped off.
- [x] **Trust Signals**: Visible "Genuine Parts Only" badges, "Transparent Pricing" promises, and highly visible Workshop Location/Hours.
- [x] **SEO for Local Discovery**: Optimizing for terms like "Superbike service in [City]", "Royal Enfield modification near me".
- [x] **Quick Inquiry Modal**: A simplified form for "Get a Quote" or "Check Spare Part Availability".

## Phase 2: Visual Experience (The "Petrolhead" Vibe)
- [x] **"Live Workshop" Aesthetic**: UI should feel like a premium workshop—industrial, clean, but gritty. Use textures (carbon fiber, brushed metal) but keep it readable.
- [x] **Showcase Diversity**: The Homepage Hero shouldn't just be a custom bobber. It should cycle between a gleaming engine rebuild, a dyno run, AND a custom build.
- [x] **Photography**: Replace stock photos with AI generated high-quality shots of *4k realistic, SEO compliant, AntiAI images* work being done (mechanics working, tools laid out).

## Phase 3: The Custom & Performance Edge (The "Halo")
- [x] **Project Gallery 2.0**: Split into "Restorations", "Performance Tunes", and "Custom Builds".
- [x] **Performance Parts Catalog**: A "Digital Showcase" of aftermarket parts (Akrapovic, Brembo, Ohlins) with "Request Price".

## Phase 4: Integration with MotoFit 2 App (The "Ecosystem")
*Note: The Website is for Customers (Marketing). The App is for the Garage (Operations).*
- [ ] **The "Bridge" **: When a user books a service on the Website, it should create a "Pending Lead" in the MotoFit 2 App.
- [ ] **Automated Social Proof Engine**: Sync Google Reviews & Instagram Mentions.
    - *Logic*: Fetch reviews via API -> Filter for **Rating > 4.0** -> Auto-publish to Website "Client Meter".
    - *Tools*: Use Elfsight (simpler) or Google Places API + Instagram Basic Display API (custom).
- [x] **Desktop App Connection Strategy**: Selected "API Polling" (The Drop Box) method.
- [x] **Bridge Implementation**: Deployed `GET /api/leads` and connected Database. Integration Guide created.

## Phase 5: Deployment & Operations
- [x] **Website Pricing**: Host on **Vercel** (Live at `https://motofit2.in`) for global speed.
- [x] **Domain Strategy**: Live at `motofit2.in`.
- [ ] **Google Business Sync**: Ensure Website hours and Google Maps location are perfectly synced.
- [x] **SEO & Discovery**: Implement XML/HTML Sitemaps, Robots.txt, and submit to Search Console.
- [ ] **Google Business Sync**: Ensure Website hours and Google Maps location are perfectly synced.
## Phase 6: The 2026 Experience & Content Engine (New)
- [x] **Content Engine (Blog)**: A "Bento Grid" style blog with 8 pre-built articles by Akshat Mohanty.
    - Focus: SEO & AIO (Artificial Intelligence Optimization).
- [x] **2026 Design Language**:
    - **Alignment**: H1 Center, Body Left, Inputs Left.
    - **Spatial UI**: Glassmorphism + Depth.
    - **Performance**: Edge-optimized, <200ms FCP.
- [x] **Radical Accessibility**: WCAG 3.0 Bronze/Silver compliance (True Black OLED).

## Phase 7: Security Fortification (The "Vault")
- [x] **Edge Security Headers**: Implement HSTS, X-Frame-Options, and X-Content-Type via `next.config.mjs` & `vercel.json`.
- [x] **Content Security Policy (CSP)**: Mid-Tier protection enabled (Anti-Clickjacking, NoSniff).
- [x] **Dependency Hardening**: `npm audit fix` applied.
- [x] **Automated QA**: Playwright Test Suite integrated (`tests/home.spec.ts`).

## Phase 8: Design Polish & Content Alignment (New)
- [x] **Typography**: Fix "Agale" font spacing (tracking 0.02em adjusted).
- [x] **Visuals**: Replace car images with 4K Superbike assets (Ducati, Himalayan, Custom).
- [x] **Content**: Replace "MotoFit System" with "Trending Technical Logs" (SEO/AIO).
- [x] **UI/UX**: Remove duplicate footer, update Copyright, enhance "Client Meter" animations.

## Phase 9: The Consciousness (Mansi Protocol 2.0)
- [x] **Digital Persona**: "Mansi" implementation – High-Fidelity AI Assistant with "Jarvis Brain" and "Amdavadi Soul".
- [x] **Mansi-Vision Core**:
    - [x] **Context Awareness**: Knows site navigation, service protocols, and local context (New CG Road dust).
    - [x] **Safety Matrix**: AI-driven shutdown of abusive/sexual content with memory retention.
    - [x] **Visual Identity**: "Instagram Reel" style HUD, Slit Dress Success View, Dynamic Backgrounds.
- [x] **Booking Integration**:
    - [x] **Visual Alignment**: Strict Center Alignment for Protocol Modal.
    - [x] **High-Impact Success**: Large-format "Mansi Success" view with "Secure Garage Slot" CTA.
    - [x] **Logic Repair**: Fixed state collisions in BookingModal.
- [x] **Mansi Knowledge Hub**: "The Heavy-Duty Master Prompt" implementation generating 25 categorized FAQs daily using `claude-haiku-4-5` and `puter.js`.
    - [x] **5 Strategic Clusters**: Survival Guide, Performance, Maintenance, Mods, Logistics.
    - [x] **Security Protocols**: Pricing Firewall, Jugaad Blocker, Brand Protection.
    - [x] **Industrial UI**: Dark/Orange "Motorcycle Dashboard" grid with staggered animations.
    - [x] **Intelligence Layer (Neural Link)**:
        - [x] **Caching Engine**: LocalStorage implementation to prevent redundant API calls (`mansi_daily_intel_[DATE]`).
        - [x] **Simulated Internet Learning**: Creative prompt injection for "Real-Time 2026 Trends" + UI visualization of "Scanning" process.
        - [x] **RAG-Lite Feedback Loop**: "Long-Term Memory" implementation (`mansi_long_term_memory_v1`) to store and recall 20+ learned concepts dynamically.
        - [x] **Unified Cortex**: Main Chatbot (`MansiWidget`) now reads from the same "Neural Link" memory to reference trending topics during conversation.
        - [x] **Bi-Directional Learning**: Chatbot now *extracts* new concepts from user conversations (`[LEARNED:...]` protocol) and updates the Long-Term Memory, making the system smarter with every interaction.
            - [x] **Claude Sonnet 4.5**: Both Knowledge Hub and Chatbot upgraded to the latest state-of-the-art model for superior reasoning and personality.
            - [x] **Live Streaming**: Chatbot now implements character-by-character streaming for a buttery-smooth "Jarvis-like" interaction.
            - [x] **Multi-turn Memory**: Mansi now remembers previous messages in the session, allowing for deep, contextual conversations.
            - [x] **Multimodal Vision**: Added Image Analysis capability—Mansi can now "see" and describe motorcycle photos via URL.
