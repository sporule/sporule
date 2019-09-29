
export const isIntersect = (a, b) => {
    return a.filter(o => {
        return b.includes(o);
    }).length > 0;
}
