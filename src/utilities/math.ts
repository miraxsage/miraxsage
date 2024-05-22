export function rangeProgress(commonRangeVal: number, targetRangeFrom: number, targetRangeTo: number) {
    if (commonRangeVal <= targetRangeFrom) return 0;
    if (commonRangeVal >= targetRangeTo) return 1;
    return (commonRangeVal - targetRangeFrom) / (targetRangeTo - targetRangeFrom);
}

export function round(number: number, precision: number) {
    precision = Math.abs(precision);
    const ratio = 10 ** precision;
    return Math.round(number * ratio) / ratio;
}
