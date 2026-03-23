const enc = encodeURIComponent;

export default function getShareUrl(type: string, pageUrl: string, pageTitle: string): string {
    switch (type) {
        case "telegram":
            return `https://t.me/share/url?url=${enc(pageUrl)}&text=${enc(pageTitle)}`;
        case "whatsapp":
            return `https://api.whatsapp.com/send?text=${enc(pageTitle + " " + pageUrl)}`;
        case "max":
            return `https://max.ru/share?url=${enc(pageUrl)}&text=${enc(pageTitle)}`;
        case "facebook":
            return `https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}`;
        case "twitter":
            return `https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(pageTitle)}`;
        case "linkedin":
            return `https://www.linkedin.com/sharing/share-offsite/?url=${enc(pageUrl)}`;
        case "vk":
            return `https://vk.com/share.php?url=${enc(pageUrl)}&title=${enc(pageTitle)}`;
        case "odnoklassniki":
            return `https://connect.ok.ru/offer?url=${enc(pageUrl)}&title=${enc(pageTitle)}`;
        case "reddit":
            return `https://www.reddit.com/submit?url=${enc(pageUrl)}&title=${enc(pageTitle)}`;
        case "viber":
            return `viber://forward?text=${enc(pageTitle + " " + pageUrl)}`;
        case "email":
            return `mailto:?subject=${enc(pageTitle)}&body=${enc(pageUrl)}`;
        default:
            return pageUrl;
    }
}
