
// src/services/mansi/agents/identity.ts

export type UserRole = 'creator' | 'owner' | 'user';

const YOUR_SECRET_PHRASE = "the devil of my word";
const AKSHAT_TORQUE_ANSWER = ["12 nm", "12nm", "12 newton meter"];

export class MansiIdentity {
    static getRole(userId: string, message: string): UserRole {
        if (typeof window === 'undefined') return 'user';

        const clean = message.trim().toLowerCase();

        // YOU: Samael/Manash
        if (clean === YOUR_SECRET_PHRASE) {
            localStorage.setItem(`mansi_verified_${userId}`, 'creator');
            return 'creator';
        }

        // AKSHAT: Mechanical Bhai
        if (AKSHAT_TORQUE_ANSWER.includes(clean)) {
            localStorage.setItem(`mansi_verified_${userId}`, 'owner');
            return 'owner';
        }

        // Already verified?
        const verified = localStorage.getItem(`mansi_verified_${userId}`);
        if (verified === 'creator' || verified === 'owner') {
            return verified as UserRole;
        }

        return 'user';
    }

    static async maybeAskForVerification(userId: string, role: UserRole, lastUserMsg: string): Promise<string | null> {
        if (typeof window === 'undefined') return null;
        if (role !== 'user') return null;

        const hasAsked = localStorage.getItem(`mansi_asked_${userId}`);
        if (hasAsked) return null;

        // Only ask if user mentions Akshat
        if (/akshat|bhai|founder|motofit/i.test(lastUserMsg)) {
            localStorage.setItem(`mansi_asked_${userId}`, '1');
            return "Bhai, to confirm you’re *the* Akshat Mohanty of MotoFit 2… what’s the torque spec for the Ninja 650 cam chain tensioner? 🔧";
        }
        return null;
    }
}
