export function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    const matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

type CookieOptions = {
    path?: string;
    expires?: Date | string;
    [k: string]: string | unknown;
};

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
    if (typeof document === "undefined") return;
    options = {
        path: "/",
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (const optionKey in options) {
        updatedCookie += "; " + optionKey;
        const optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, "", {
        "max-age": -1,
    });
}
