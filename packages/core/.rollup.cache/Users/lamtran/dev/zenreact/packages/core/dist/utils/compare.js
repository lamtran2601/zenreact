export const simpleCompare = (val1, val2) => {
    if (val1 === val2)
        return true;
    if (!val1 || !val2 || typeof val1 !== 'object' || typeof val2 !== 'object')
        return false;
    if (Array.isArray(val1)) {
        return (Array.isArray(val2) && val1.length === val2.length && val1.every((v, i) => v === val2[i]));
    }
    const k1 = Object.keys(val1), k2 = Object.keys(val2);
    return (k1.length === k2.length &&
        k1.every((k) => val1[k] === val2[k]));
};
//# sourceMappingURL=compare.js.map