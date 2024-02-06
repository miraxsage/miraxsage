export type AnyObject = { [k: string]: unknown };

export function isAnyObject(arg: unknown): arg is AnyObject {
    return typeof arg == "object";
}
