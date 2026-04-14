'use server';

// Define the secrets on the server so they are never sent to the client bundle
const SECRETS: Record<string, string> = {
    "The Devil of My Word": "Samael",
    "Trade Bullish King": "Akshat"
};

export async function verifyAdminSecret(passphrase: string) {
    const trimmed = passphrase.trim();
    const userKey = Object.keys(SECRETS).find(k => k === trimmed);
    if (userKey) {
        return { success: true, userName: SECRETS[userKey] };
    }
    return { success: false, userName: null };
}
