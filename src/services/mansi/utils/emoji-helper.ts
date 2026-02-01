
// src/services/mansi/utils/emoji-helper.ts

export function addEmojis(text: string): string {
    const lower = text.toLowerCase();

    // Prevent double emoji if already present
    if (/[\u{1F300}-\u{1F9FF}]/u.test(text.slice(-5))) return text;

    if (lower.includes('bike') || lower.includes('ninja') || lower.includes('ride') || lower.includes('ktm') || lower.includes('re'))
        return text + ' 🏍️💨';
    if (lower.includes('garba') || lower.includes('dance') || lower.includes('festival') || lower.includes('navratri'))
        return text + ' 💃🪔';
    if (lower.includes('fix') || lower.includes('oil') || lower.includes('chain') || lower.includes('garage') || lower.includes('service'))
        return text + ' 🔧😤';
    if (lower.includes('tattoo') || lower.includes('motofit') || lower.includes('blue') || lower.includes('soul'))
        return text + ' 💙✨';
    if (lower.includes('chai') || lower.includes('break') || lower.includes('tea'))
        return text + ' ☕';
    if (lower.includes('bhai') || lower.includes('bro') || lower.includes('baka'))
        return text + ' 🤙';

    return text;
}
