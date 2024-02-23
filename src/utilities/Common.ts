import { AnyObject, isAnyObject } from "@/types/common";

export default function deepMerge(
    obj1: unknown,
    obj2: unknown
): AnyObject | null {
    if (!isAnyObject(obj1)) {
        if (!isAnyObject(obj2)) return null;
        else return obj2;
    } else {
        if (!isAnyObject(obj2)) return obj1;
        const obj: AnyObject = { ...obj1 };
        for (const prop in obj2) {
            if (
                prop in obj &&
                typeof obj[prop] == "object" &&
                typeof obj2[prop] == "object"
            )
                obj[prop] = deepMerge(obj[prop], obj2[prop]);
            else obj[prop] = obj2[prop];
        }
        return obj;
    }
}
export function areEqualShallow(a: unknown, b: unknown) {
    if (!isAnyObject(a) || !isAnyObject(b)) return a === b;
    for (const key in a) {
        if (!(key in b) || a[key] !== b[key]) {
            return false;
        }
    }
    for (const key in b) {
        if (!(key in a)) {
            return false;
        }
    }
    return true;
}
