
// src/services/mansi/utils/time-logic.ts

export type AppMode = 'whatsapp' | 'instagram';

export class TimeLogic {
    // Day time is defined as 9:00 AM to 8:00 PM (20:00)
    static isDayTime(): boolean {
        const hour = new Date().getHours();
        return hour >= 9 && hour < 20;
    }

    static getCurrentApp(): AppMode {
        return this.isDayTime() ? 'whatsapp' : 'instagram';
    }

    static getNextSwitch(): Date {
        const now = new Date();
        if (this.isDayTime()) {
            // Currently Day, Switch to Instagram at 8 PM today
            const switchTime = new Date(now);
            switchTime.setHours(20, 0, 0, 0);
            return switchTime;
        } else {
            // Currently Night, Switch to WhatsApp at 9 AM tomorrow (or today if currently early morning)
            const switchTime = new Date(now);
            if (now.getHours() >= 20) {
                // It's after 8 PM, so next 9 AM is tomorrow
                switchTime.setDate(switchTime.getDate() + 1);
            }
            switchTime.setHours(9, 0, 0, 0);
            return switchTime;
        }
    }
}
