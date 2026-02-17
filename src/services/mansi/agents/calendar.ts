
// src/services/mansi/agents/calendar.ts
// Phase 3: Mansi's Calendar — She manages your bookings

export interface BookingSlot {
    date: string;       // YYYY-MM-DD
    time: string;       // HH:MM
    available: boolean;
}

export interface BookingIntent {
    customerName?: string;
    phone?: string;
    bikeModel?: string;
    serviceType?: string;
    preferredDate?: string;
    preferredTime?: string;
    ts: number;
}

export class MansiCalendar {
    private static BOOKING_KEY = 'mansi_bookings';
    private static SLOTS_PER_DAY = 8; // Max 8 bikes per day

    /**
     * Check if a given date is Wednesday (auto-blocked).
     */
    static isWednesday(date?: Date): boolean {
        const d = date || new Date();
        return d.getDay() === 3;
    }

    /**
     * Check if a given date is in the past.
     */
    static isPastDate(dateStr: string): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(dateStr);
        return target < today;
    }

    /**
     * Get available slots for a given date.
     * Currently uses mock data — ready for Google Calendar API integration later.
     */
    static getAvailableSlots(dateStr: string): { available: boolean; slotsLeft: number; message: string } {
        const date = new Date(dateStr);

        // Rule 1: Wednesday is always blocked
        if (this.isWednesday(date)) {
            return {
                available: false,
                slotsLeft: 0,
                message: "Wednesday hai boss! Garage bandh. Mansi bhi off hai 😴 Koi aur din choose karo!"
            };
        }

        // Rule 2: Past dates
        if (this.isPastDate(dateStr)) {
            return {
                available: false,
                slotsLeft: 0,
                message: "Boss, time travel abhi available nahi hai 😂 Future date do na!"
            };
        }

        // Rule 3: Check existing bookings for that day
        const bookings = this.getBookingsForDate(dateStr);
        const slotsLeft = this.SLOTS_PER_DAY - bookings.length;

        if (slotsLeft <= 0) {
            // Find next available dates
            const alternatives = this.findNextAvailableDates(dateStr, 3);
            const altStr = alternatives.map(d => this.formatDate(d)).join(', ');
            return {
                available: false,
                slotsLeft: 0,
                message: `Oh no, ${this.formatDate(new Date(dateStr))} is fully packed! 😅 But I've got openings on: ${altStr}. Koi aur din chalega?`
            };
        }

        return {
            available: true,
            slotsLeft,
            message: `${this.formatDate(date)} pe ${slotsLeft} slots available hai! 🔧 Book kar doon?`
        };
    }

    /**
     * Store a booking intent in localStorage.
     */
    static saveBookingIntent(intent: BookingIntent): void {
        if (typeof window === 'undefined') return;
        try {
            const raw = localStorage.getItem(this.BOOKING_KEY);
            const bookings: BookingIntent[] = raw ? JSON.parse(raw) : [];
            bookings.push({ ...intent, ts: Date.now() });
            localStorage.setItem(this.BOOKING_KEY, JSON.stringify(bookings));
        } catch (e) {
            console.error('[Mansi Calendar] Booking save error:', e);
        }
    }

    /**
     * Get all bookings for a specific date.
     */
    static getBookingsForDate(dateStr: string): BookingIntent[] {
        if (typeof window === 'undefined') return [];
        try {
            const raw = localStorage.getItem(this.BOOKING_KEY);
            const bookings: BookingIntent[] = raw ? JSON.parse(raw) : [];
            return bookings.filter(b => b.preferredDate === dateStr);
        } catch {
            return [];
        }
    }

    /**
     * Find the next N available dates after the given date.
     */
    static findNextAvailableDates(afterDate: string, count: number): Date[] {
        const results: Date[] = [];
        const start = new Date(afterDate);
        let cursor = new Date(start);
        cursor.setDate(cursor.getDate() + 1);

        while (results.length < count) {
            if (!this.isWednesday(cursor)) {
                const bookings = this.getBookingsForDate(this.toDateStr(cursor));
                if (bookings.length < this.SLOTS_PER_DAY) {
                    results.push(new Date(cursor));
                }
            }
            cursor.setDate(cursor.getDate() + 1);
            // Safety: don't look more than 30 days ahead
            if (cursor.getTime() - start.getTime() > 30 * 24 * 60 * 60 * 1000) break;
        }
        return results;
    }

    /**
     * Get a summary of today's calendar status for Mansi's context.
     */
    static getTodayStatus(): string {
        const today = new Date();
        if (this.isWednesday(today)) {
            return 'TODAY: Wednesday — Garage CLOSED. Mansi off duty.';
        }
        const dateStr = this.toDateStr(today);
        const bookings = this.getBookingsForDate(dateStr);
        const slotsLeft = this.SLOTS_PER_DAY - bookings.length;
        return `TODAY: ${this.formatDate(today)} — ${slotsLeft}/${this.SLOTS_PER_DAY} slots available.`;
    }

    // --- Utility Methods ---

    static toDateStr(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    static formatDate(date: Date): string {
        return date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
    }
}
