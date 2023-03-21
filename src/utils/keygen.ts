
export class KeyGen {

    public static generateKey(length: number): string {
        let key = "";
        const start = Math.round(Math.random());
        for (let i = 0; i < length; i++) {
            if (i % 2 == start) {
                key += this.generateConsonant();
            } else {
                key += this.generateVowel();
            }
        }
        return key;
    }

    private static generateVowel(): string {
        return "aeiou"[Math.floor(Math.random() * 5)];
    }

    private static generateConsonant(): string {
        return "bcdfghjklmnpqrstvwxyz"[Math.floor(Math.random() * 21)];
    }
}