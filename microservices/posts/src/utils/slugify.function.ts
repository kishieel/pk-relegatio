export const slugify = (text: string, length?: number): string => {
    const slug = text
        .normalize()
        .replace(/[^A-Za-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim()
        .toLowerCase();

    const random = Math.random().toString(36).slice(2, 9);
    const base = length ? slug.slice(0, length - random.length) : slug;

    return `${base}-${random}`;
};
