'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Badge } from '@/components/ui/graphics/Badge';
import { cn } from '@/lib/utils';

// Declare custom elements to avoid TS errors
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'gmp-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                center?: string;
                zoom?: string;
                'map-id'?: string;
            };
            'gmp-place-autocomplete': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                placeholder?: string;
            };
            'gmp-advanced-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                position?: string;
                title?: string;
            };
        }
    }
}

export default function PlaceAutocompleteMap({ className }: { className?: string }) {
    const mapRef = useRef<HTMLElement>(null);
    const placeAutocompleteRef = useRef<HTMLElement>(null);
    const infoWindowContentRef = useRef<HTMLDivElement>(null);
    const [apiKeyError, setApiKeyError] = useState(false);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            console.error('Google Maps API Key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local');
            setApiKeyError(true);
            return;
        }

        const loader = new Loader({
            apiKey: apiKey,
            version: "weekly",
            libraries: ["places", "maps", "marker"]
        });

        (loader as any).load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps") as any;
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as any;
            const { PlaceAutocompleteElement } = await google.maps.importLibrary("places") as any;

            // The web components are now registered.
            // We can interact with them nicely.

            const mapElement = mapRef.current as any;
            const map = mapElement.innerMap as google.maps.Map;
            const placeAutocomplete = placeAutocompleteRef.current as any;

            // Set map options via the inner map instance if needed, 
            // though attributes on gmp-map usually handle init.
            if (map) {
                map.setOptions({
                    clickableIcons: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                });

                // Bias results to map bounds
                map.addListener('bounds_changed', () => {
                    const bounds = map.getBounds();
                    if (bounds) {
                        placeAutocomplete.locationBias = bounds;
                    }
                });
            }

            const infoWindow = new google.maps.InfoWindow();

            // Create marker
            const marker = new AdvancedMarkerElement({
                map: map,
                title: 'MotoFit 2 Hub',
                position: { lat: 23.109, lng: 72.593 }, // Default to MotoFit location
            });

            marker.addListener('click', () => {
                if (infoWindowContentRef.current && map) {
                    infoWindow.setContent(infoWindowContentRef.current);
                    infoWindow.open({
                        anchor: marker,
                        map: map,
                    });
                }
            });

            // Handle place selection
            placeAutocomplete.addEventListener('gmp-select', async ({ detail }: any) => {
                const placePrediction = detail.placePrediction; // Or standard event structure
                // The user snippet used: async ({ placePrediction }: any) => { ... }
                // In some versions it's passed directly or in detail. 
                // Using the snippet's structure logic:

                infoWindow.close();

                const place = placePrediction.toPlace();

                await place.fetchFields({
                    fields: ['displayName', 'formattedAddress', 'location', 'id'],
                });

                if (!place.location) return;

                if (place.viewport && map) {
                    map.fitBounds(place.viewport);
                } else if (map) {
                    map.setCenter(place.location);
                    map.setZoom(17);
                }

                // Move marker
                marker.position = place.location;

                // Update info window content
                if (infoWindowContentRef.current) {
                    const nameEl = infoWindowContentRef.current.querySelector('#place-name');
                    const addressEl = infoWindowContentRef.current.querySelector('#place-address');

                    if (nameEl) nameEl.textContent = place.displayName || '';
                    if (addressEl) addressEl.textContent = place.formattedAddress || '';

                    infoWindow.open({
                        anchor: marker,
                        map: map,
                    });
                }
            });

        }).catch((e: any) => {
            console.error("Error loading Google Maps:", e);
        });

    }, []);

    if (apiKeyError) {
        return (
            <div className={cn("flex flex-col items-center justify-center bg-[#111] border border-[#333] rounded-2xl h-[400px] text-center p-8", className)}>
                <span className="text-4xl mb-4">🗺️</span>
                <h3 className="text-xl font-bold text-white mb-2">Map Unavailable</h3>
                <p className="text-gray-400 max-w-md">
                    Google Maps API Key is missing. Please configure <code className="text-orange-500">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in your environment variables.
                </p>
            </div>
        );
    }

    return (
        <div className={cn("relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-[#333] bg-[#0a0a0a]", className)}>

            {/* Search Bar Container - Floating on top */}
            <div className="absolute top-4 left-4 right-4 z-10 max-w-sm">
                <gmp-place-autocomplete
                    ref={placeAutocompleteRef}
                    placeholder="Search for a location..."
                    className="w-full shadow-2xl rounded-lg overflow-hidden"
                ></gmp-place-autocomplete>
            </div>

            {/* Map Element */}
            <gmp-map
                ref={mapRef}
                center="23.109,72.593"
                zoom="14"
                map-id="DEMO_MAP_ID"
                className="w-full h-full block"
                style={{ height: '100%', width: '100%' }} // Explicit style for web component
            >
            </gmp-map>

            {/* Hidden InfoWindow Content */}
            <div style={{ display: 'none' }}>
                <div ref={infoWindowContentRef} id="infowindow-content" className="p-2 min-w-[200px]">
                    <h3 id="place-name" className="text-lg font-bold text-black mb-1">MotoFit 2</h3>
                    <p id="place-address" className="text-sm text-gray-600">Loading address...</p>
                </div>
            </div>
        </div>
    );
}
