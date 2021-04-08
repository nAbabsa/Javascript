export function findOrThrow(selector: string) {
    const el = document.querySelector(selector);
    if (!el) {
        throw new Error(`No element found for selector: ${selector}`);
    }
    return el;
}