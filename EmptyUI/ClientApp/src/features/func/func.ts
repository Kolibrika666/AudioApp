export function debounce(func: any, ms: number) {
    let timeout: any;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
}