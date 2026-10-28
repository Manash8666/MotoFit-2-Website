'use client';

import React, { useEffect, useRef, useState } from 'react';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { COMPANY_DETAILS } from '@/config/company';
import { MapPin, Navigation, Search, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export interface PlaceSelectionResult {
    id?: string;
    name?: string;
    address?: string;
    lat?: number;
    lng?: number;
}

interface GooglePlaceMapProps {
    className?: string;
    placeId?: string;
    center?: { lat: number; lng: number };
    zoom?: number;
    showSearch?: boolean;
    onPlaceSelected?: (result: PlaceSelectionResult) => void;
    compact?: boolean;
}

export default function GooglePlaceMap({
    className = '',
    placeId = COMPANY_DETAILS.location.placeId, // ChIJ-9YrbNCDXjkRhF-6ojNgrS8
    center = { lat: COMPANY_DETAILS.location.lat, lng: COMPANY_DETAILS.location.lng },
    zoom = 16,
    showSearch = true,
    onPlaceSelected,
    compact = false
}: GooglePlaceMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasApiKey, setHasApiKey] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<PlaceSelectionResult>({
        id: placeId,
        name: COMPANY_DETAILS.name,
        address: COMPANY_DETAILS.location.address,
        lat: center.lat,
        lng: center.lng
    });

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

    useEffect(() => {
        if (!apiKey) {
            setHasApiKey(false);
            setIsLoading(false);
            return;
        }

        setHasApiKey(true);

        setOptions({
            key: apiKey,
            v: 'weekly',
        });

        let map: google.maps.Map | null = null;
        let marker: any = null;
        let infoWindow: google.maps.InfoWindow | null = null;
        let autocomplete: google.maps.places.Autocomplete | null = null;

        Promise.all([
            importLibrary('maps') as Promise<google.maps.MapsLibrary>,
            importLibrary('marker') as Promise<google.maps.MarkerLibrary>,
            importLibrary('places') as Promise<google.maps.PlacesLibrary>,
        ])
            .then(async ([{ Map, InfoWindow }, { AdvancedMarkerElement }, placesLib]) => {

                if (!mapContainerRef.current) return;

                // 1. Initialize Map
                map = new Map(mapContainerRef.current, {
                    center: center,
                    zoom: zoom,
                    mapId: 'MOTOFIT_CYBER_MAP_V1',
                    clickableIcons: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: true,
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#0d0d0d" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
                        { featureType: "road", elementType: "geometry", stylers: [{ color: "#1f1f1f" }] },
                        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#2d2d2d" }] },
                        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#ff5e1a" }] },
                        { featureType: "water", elementType: "geometry", stylers: [{ color: "#051622" }] }
                    ]
                });

                // 2. InfoWindow
                const createInfoWindowContent = (data: PlaceSelectionResult) => {
                    return `
                        <div style="background:#0a0a0a; color:#fff; padding:12px 14px; border-radius:10px; font-family:sans-serif; max-width:280px; border:1px solid #ff5e1a;">
                            <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                                <span style="color:#ff5e1a; font-weight:900; font-size:14px;">${data.name || 'Selected Place'}</span>
                            </div>
                            <p style="font-size:11px; color:#a1a1aa; margin:0 0 6px 0; line-height:1.4;">${data.address || ''}</p>
                            <div style="font-family:monospace; font-size:9px; color:#00d1ff; background:#000; padding:4px 6px; border-radius:4px; margin-bottom:8px; word-break:break-all;">
                                Place ID: ${data.id || 'N/A'}
                            </div>
                            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.name || 'MotoFit 2')}&query_place_id=${data.id || placeId}" target="_blank" rel="noopener noreferrer" style="display:inline-block; font-size:11px; font-weight:bold; color:#000; background:#ff5e1a; padding:6px 12px; border-radius:6px; text-decoration:none; text-transform:uppercase;">
                                Open in Maps →
                            </a>
                        </div>
                    `;
                };

                infoWindow = new InfoWindow({
                    content: createInfoWindowContent(selectedPlace)
                });

                // 3. Advanced Marker
                marker = new AdvancedMarkerElement({
                    map: map,
                    position: center,
                    title: COMPANY_DETAILS.name,
                    gmpClickable: true
                });

                marker.addListener('click', () => {
                    infoWindow?.open({
                        map: map,
                        anchor: marker
                    });
                });

                // 4. Place Autocomplete Integration
                if (searchInputRef.current && placesLib?.Autocomplete) {
                    const auto = new placesLib.Autocomplete(searchInputRef.current, {
                        fields: ['place_id', 'geometry', 'formatted_address', 'name'],
                        componentRestrictions: { country: 'in' }
                    });
                    autocomplete = auto;

                    // Bounds bias
                    map.addListener('bounds_changed', () => {
                        const bounds = map?.getBounds();
                        if (bounds && autocomplete) {
                            autocomplete.setBounds(bounds);
                        }
                    });

                    auto.addListener('place_changed', () => {
                        infoWindow?.close();
                        const place = auto.getPlace();
                        if (!place || !place.geometry || !place.geometry.location) {
                            return;
                        }

                        const newLoc = {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        };

                        if (place.geometry.viewport) {
                            map?.fitBounds(place.geometry.viewport);
                        } else {
                            map?.setCenter(newLoc);
                            map?.setZoom(17);
                        }

                        marker.position = newLoc;

                        const result: PlaceSelectionResult = {
                            id: place.place_id,
                            name: place.name || 'Custom Location',
                            address: place.formatted_address || '',
                            lat: newLoc.lat,
                            lng: newLoc.lng
                        };

                        setSelectedPlace(result);
                        infoWindow?.setContent(createInfoWindowContent(result));
                        infoWindow?.open({ map, anchor: marker });

                        if (onPlaceSelected) {
                            onPlaceSelected(result);
                        }
                    });
                }

                setIsLoading(false);
            })
            .catch((err: any) => {
                console.warn('[GooglePlaceMap] Map load error:', err);
                setIsLoading(false);
                setHasApiKey(false);
            });
    }, [apiKey, placeId, zoom]);

    return (
        <div className={`relative w-full rounded-2xl overflow-hidden border border-[#222] bg-[#080808] ${className}`}>
            {/* Search Input Bar (Place Autocomplete) */}
            {showSearch && (
                <div className="absolute top-3 left-3 right-3 z-10 flex gap-2">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ff5e1a] transition-colors" size={16} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search location / pickup address in Ahmedabad..."
                            className="w-full bg-[#0d0d0d]/95 backdrop-blur-md border border-[#333] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder:text-gray-500 focus:outline-none focus:border-[#ff5e1a] shadow-lg transition-all"
                            defaultValue=""
                        />
                    </div>
                </div>
            )}

            {/* Map Canvas or Interactive Universal Google Map */}
            {hasApiKey ? (
                <div ref={mapContainerRef} className="w-full h-full min-h-[380px]" />
            ) : (
                /* Interactive Universal Google Maps Embed (Zero API Key Dependency) */
                <div className="relative w-full h-full min-h-[420px] flex flex-col">
                    <iframe
                        title="MotoFit 2 Google Maps Hub"
                        src="https://maps.google.com/maps?q=MotoFit%202%20Bike%20Service%20Centre%2C%20Shop%20No%209%2C%20Kirtan%20Complex%2C%20Nigam%20Nagar%2C%20Chandkheda%2C%20Ahmedabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        className="w-full flex-1 min-h-[360px] border-0 filter contrast-125 brightness-90 hover:filter-none transition-all duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                    
                    {/* Bottom HUD Bar */}
                    <div className="p-4 bg-[#0a0a0a] border-t border-[#222] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#ff5e1a] animate-ping" />
                            <span className="text-[#00d1ff] truncate">Place ID: {selectedPlace.id || placeId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <a
                                href={COMPANY_DETAILS.location.mapsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-[#ff5e1a] text-black font-bold uppercase text-[11px] hover:bg-[#ff7a42] transition-all flex items-center gap-1.5"
                            >
                                <Navigation size={12} />
                                <span>Get Directions</span>
                                <ExternalLink size={10} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
