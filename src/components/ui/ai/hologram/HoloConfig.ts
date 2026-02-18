export const HoloConfig = {
    // Appearance - TUNED FOR CLARITY
    hologramColor: "#00f3ff", // Cyan
    glowIntensity: 0.3,       // Sharper, less bloom
    scanSpeed: 1.5,           // Slightly slower
    parallaxStrength: 0.1,    // Subtle depth

    // Performance (Mobile Optimization)
    mobileScale: 0.8,
    mobileParallaxStrength: 0.05,

    // Assets
    basePath: "/images/hologram/",
    defaultImage: "base.webp",

    // Image Schedule (Day of Month -> Image Filename)
    // Simplified logic: We have images 3,4,5,6,7,8,9,10,13,14,15 + base
    // We will map day of month % total available to an image
    availableImages: [
        "3.webp", "4.webp", "5.webp", "6.webp",
        "7.webp", "8.webp", "9.webp", "10.webp",
        "13.webp", "14.webp", "15.webp", "base.webp"
    ]
};
