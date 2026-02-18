'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { COMPANY_DETAILS } from '@/config/company';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Next.js/Leaflet
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function LeafletMap({ className }: { className?: string }) {
    const [isMounted, setIsMounted] = useState(false);
    const position: [number, number] = [COMPANY_DETAILS.location.lat, COMPANY_DETAILS.location.lng];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className={cn("w-full h-full min-h-[400px] bg-[#0a0a0a] border border-[#333] rounded-2xl flex items-center justify-center", className)}>
                <span className="text-gray-500 animate-pulse">Loading Map...</span>
            </div>
        );
    }

    return (
        <div className={cn("relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-[#333] bg-[#0a0a0a] z-0", className)}>
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={DefaultIcon}>
                    <Popup>
                        <div className="text-center">
                            <h3 className="font-bold text-black">{COMPANY_DETAILS.name}</h3>
                            <p className="text-xs text-gray-600">Service Hub</p>
                            <a
                                href={COMPANY_DETAILS.location.mapsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline text-xs mt-1 block"
                            >
                                Get Directions
                            </a>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
