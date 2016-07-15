export function leadZero(str = '', num = 2) {
    const zeros = (new Array(Number(num) + String(str).length)).fill('0').join('');

    return `${zeros}${str}`.slice(-1 * num);
}
