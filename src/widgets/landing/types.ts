export type ScrollObservable = {
    root: HTMLDivElement;
    scrollTop: number;
    totalScroll: number;
    scrollProgress: number;
    increment: number;
    onChange: (observer: (observable: ScrollObservable) => void) => void;
    notify(scrollTop: number, totalScroll: number, increment: number): void;
};
