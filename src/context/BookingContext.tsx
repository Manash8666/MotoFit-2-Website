'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {
    isOpen: boolean;
    openBooking: (prefillService?: string) => void;
    closeBooking: () => void;
    serviceType: string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [serviceType, setServiceType] = useState('General Service');

    const openBooking = (prefill?: string) => {
        if (prefill) setServiceType(prefill);
        setIsOpen(true);
    };

    const closeBooking = () => setIsOpen(false);

    return (
        <BookingContext.Provider value={{ isOpen, openBooking, closeBooking, serviceType }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
