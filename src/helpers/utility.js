
export const isIntersect = (a, b) => {
    return a.filter(o => {
        return b.includes(o);
    }).length > 0;
}

export const isSubset = (set, subset) => {
    return new Set([...set, ...subset]).length == set.length;
}
