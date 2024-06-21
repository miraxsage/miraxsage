import { showLoadingShield } from "@/components/App";
import { AnyObject, isAnyObject } from "@/types/common";
import { NavigateOptions, To, useLocation, useNavigate as useReactRouterNavigate } from "react-router-dom";

export default function deepMerge(obj1: unknown, obj2: unknown): AnyObject | null {
    if (!isAnyObject(obj1)) {
        if (!isAnyObject(obj2)) return null;
        else return obj2;
    } else {
        if (!isAnyObject(obj2)) return obj1;
        const obj: AnyObject = { ...obj1 };
        for (const prop in obj2) {
            if (prop in obj && typeof obj[prop] == "object" && typeof obj2[prop] == "object")
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
const debounceIds: { id: string; timerId: NodeJS.Timeout | null; time: number; delay: number }[] = [];
export function debounce(id: string, handler: () => void, delay: number = 100, immidiateLaunch: boolean = false) {
    const dToken = debounceIds.find(({ id: dId }) => dId == id);
    if (dToken) {
        if (dToken.timerId) clearTimeout(dToken.timerId);
        if (Date.now() - dToken.time > delay) {
            dToken.time = Date.now();
            dToken.delay = delay;
            handler();
        } else {
            dToken.delay = delay;
            setTimeout(handler, delay - (Date.now() - dToken.time));
        }
    } else {
        if (immidiateLaunch) handler();
        debounceIds.push({ id, timerId: immidiateLaunch ? null : setTimeout(handler, delay), time: Date.now(), delay });
    }
}

export function useNavigate() {
    const navigate = useReactRouterNavigate();
    const location = useLocation();
    function customNavigate(delta: number): void;
    function customNavigate(to: To, options?: NavigateOptions): void;
    function customNavigate(toOrDelta: To | number, options?: NavigateOptions): void {
        if (typeof toOrDelta == "string") {
            const root = toOrDelta.match("^(/projects/?)|(/[^/]*)");
            if (
                !root ||
                (location.pathname.startsWith(root[0]) && (root[0] != "/projects" || location.pathname == "/projects"))
            ) {
                navigate(toOrDelta, options);
                return;
            }
        }
        showLoadingShield();
        setTimeout(() => {
            if (typeof toOrDelta == "number") navigate(toOrDelta);
            else navigate(toOrDelta, options);
        }, 10);
    }
    return customNavigate;
}
