export function validateRequired(
    body: Record<string, unknown>,
    fields: string[],
) {
    const missing = fields.filter(
        (field) =>
            body[field] === undefined ||
            body[field] === null ||
            body[field] === "",
    );

    return { valid: missing.length === 0, missing };
}
