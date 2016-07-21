export function leadZero(str = '', num = 2) {
    if (str.length < num) {
        return str;
    }

    const zeros = (new Array(Number(num) + String(str).length)).join('0');

    return `${zeros}${str}`.slice(-1 * num);
}


export function supplant(str, values) {
    return str.replace(/\{{([^{}]*)\}}/g, (a, b) => {
        const r = values[b];

        return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
}
