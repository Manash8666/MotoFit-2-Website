import { Vector2 } from "three";

export const HoloVertexShader = `
varying vec2 vUv;
varying float vElevation;

uniform float uTime;
uniform vec2 uMouse;
uniform float uParallaxStrength;

void main() {
    vUv = uv;

    // Simple parallax based on mouse
    vec3 newPosition = position;
    
    // Calculate distance from center
    float dist = distance(uv, vec2(0.5));
    
    // Parallax effect: Move vertices based on mouse position and distance from center
    // This creates a pseudo-3D effect where the center stays fixed but edges move
    newPosition.x += (uv.x - 0.5) * (uMouse.x * uParallaxStrength);
    newPosition.y += (uv.y - 0.5) * (uMouse.y * uParallaxStrength);
    
    // Subtle breathing animation
    newPosition.z += sin(uTime * 2.0) * 0.02;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const HoloFragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform vec3 uColor;
uniform float uGlowIntensity;
uniform float uScanSpeed;

varying vec2 vUv;

// Noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // Sample texture
    vec4 textureColor = texture2D(uTexture, vUv);
    
    // Scanline effect
    float scanline = sin(vUv.y * 800.0 + uTime * 5.0) * 0.04;
    
    // Moving holographic wave
    float wave = sin(vUv.y * 20.0 - uTime * uScanSpeed) * 0.05;
    
    // RGB Shift (Chromatic Aberration)
    float shift = 0.003;
    float r = texture2D(uTexture, vUv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, vUv).g;
    float b = texture2D(uTexture, vUv - vec2(shift, 0.0)).b;
    
    vec3 color = vec3(r, g, b);
    
    // Apply scanlines
    color -= scanline;
    
    // Apply wave brightness
    color += wave * uGlowIntensity;
    
    // Add holographic tint (Cyan/Blue) - REDUCED MIX
    color = mix(color, uColor, 0.05);
    
    // Edge glow (Fresnel-ish) - MOVED EDGE OUT TO 0.6 and REDUCED STRENGTH
    float dist = distance(vUv, vec2(0.5));
    float glow = smoothstep(0.6, 0.8, dist); // Moved further out
    color += glow * uColor * 0.2;            // Reduced intensity

    // Noise grain - REDUCED
    float noise = random(vUv + uTime) * 0.02;
    color += noise;

    // Output final color
    gl_FragColor = vec4(color, textureColor.a);
}
`;
