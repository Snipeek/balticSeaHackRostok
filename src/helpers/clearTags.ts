export const clearTags = (text: string): string => {
    return text.replace(/<[^>]*>?/gm, "");
}
