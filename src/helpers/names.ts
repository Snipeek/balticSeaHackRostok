export function nameInitials(name?: string): string {
    if (name) {
        const items = name.split(" ");
        const result: string[] = [];
        items.forEach(item => {
            item = item.trim();
            if (item && result.length < 2) {
                result.push(item[0].toUpperCase());
            }
        });
        return result.join("");
    }
    return "SU";
}
