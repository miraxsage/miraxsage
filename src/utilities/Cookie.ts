export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
                // eslint-disable-next-line no-useless-escape
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

type cookieOptions = {
    path?: string;
    expires?: Date | string;
    [k: string]: string | unknown;
};
export function setCookie(
    name: string,
    value: string,
    options: cookieOptions = {}
) {
    options = {
        path: "/",
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
        encodeURIComponent(name) + "=" + encodeURIComponent(value);

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

export default { getCookie, setCookie, deleteCookie };

declare global {
    interface Window {
        cookie: {
            get: typeof getCookie;
            set: typeof setCookie;
            delete: typeof deleteCookie;
        };
    }
}
window.cookie = { get: getCookie, set: setCookie, delete: deleteCookie };
