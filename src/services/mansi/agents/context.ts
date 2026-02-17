
// src/services/mansi/agents/context.ts
// Phase 2: Mansi's Eyes — She knows where you are on the website

export class MansiContext {
    private static PAGE_MAP: Record<string, { name: string; hint: string; greeting: string }> = {
        '/': {
            name: 'Home',
            hint: 'User is on the homepage. They might be new or just browsing.',
            greeting: 'Welcome to the garage, boss! Kuch dhundh rahe ho ya bas vibe check? 🏍️'
        },
        '/services': {
            name: 'Services',
            hint: 'User is browsing services. They likely need a repair, maintenance, or customization. Help them choose and push for a visit.',
            greeting: 'Services dekh rahe ho? Bolo kya issue hai — oil change, chain clean, ya full service? 🔧'
        },
        '/gallery': {
            name: 'Gallery',
            hint: 'User is looking at the gallery/builds. They are probably interested in custom work or past projects.',
            greeting: 'Gallery mein ghoom rahe ho? Ye sab humne apne haathon se banaya hai. Which build caught your eye? 🔥'
        },
        '/about': {
            name: 'About',
            hint: 'User is reading about MotoFit. They want to know the team, the story, the vibe.',
            greeting: 'About page pe ho? Haan, this is the fam. Akshat sir started this from scratch. Koi sawaal ho to bolo! 💙'
        },
        '/parts': {
            name: 'Parts Catalog',
            hint: 'User is browsing parts. They need genuine parts — oils, filters, brakes, tyres. Emphasize quality and genuineness.',
            greeting: 'Parts dekh rahe ho? Sirf genuine stock hai yaha — Motul, Brembo, Rolon. Kya chahiye? 🛒'
        },
        '/blog': {
            name: 'Blog',
            hint: 'User is reading blog posts. They are interested in knowledge, tips, or MotoFit stories.',
            greeting: 'Blog padh rahe ho! Knowledge seeker detected. Koi topic pe question hai? 📚'
        }
    };

    /**
     * Get the current page pathname.
     */
    static getCurrentPage(): string {
        if (typeof window === 'undefined') return '/';
        return window.location.pathname;
    }

    /**
     * Get a human-readable page name for the current location.
     */
    static getPageName(): string {
        const page = this.getCurrentPage();
        // Match exact or partial (for nested routes like /blog/post-slug)
        const match = this.PAGE_MAP[page] || this.findPartialMatch(page);
        return match?.name || 'Unknown Page';
    }

    /**
     * Get a context hint for Mansi's system prompt.
     * This tells the AI what the user is likely thinking about based on their location.
     */
    static getPageHint(): string {
        const page = this.getCurrentPage();
        const match = this.PAGE_MAP[page] || this.findPartialMatch(page);
        if (!match) return 'User is browsing the website.';
        return `PAGE CONTEXT: User is on the "${match.name}" page. ${match.hint}`;
    }

    /**
     * Get a context-aware greeting for when Mansi opens on a specific page.
     */
    static getPageGreeting(): string {
        const page = this.getCurrentPage();
        const match = this.PAGE_MAP[page] || this.findPartialMatch(page);
        return match?.greeting || 'Oye! Kem cho? Ready to ride? 🏍️';
    }

    /**
     * Find a partial match for nested routes (e.g., /blog/my-post → /blog)
     */
    private static findPartialMatch(pathname: string) {
        for (const [key, value] of Object.entries(this.PAGE_MAP)) {
            if (key !== '/' && pathname.startsWith(key)) {
                return value;
            }
        }
        return null;
    }

    /**
     * Track idle time since last user activity.
     */
    private static lastActivity: number = Date.now();

    static resetActivity(): void {
        this.lastActivity = Date.now();
    }

    static getIdleSeconds(): number {
        return Math.floor((Date.now() - this.lastActivity) / 1000);
    }

    /**
     * Initialize activity tracking (call once on mount).
     */
    static initTracking(): () => void {
        if (typeof window === 'undefined') return () => { };

        const handler = () => this.resetActivity();
        const events = ['mousemove', 'scroll', 'keydown', 'touchstart', 'click'];

        events.forEach(e => window.addEventListener(e, handler, { passive: true }));

        // Return cleanup function
        return () => {
            events.forEach(e => window.removeEventListener(e, handler));
        };
    }
}
