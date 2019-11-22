
export const isIntersect = (a, b) => {
    return a.filter(o => {
        return b.includes(o);
    }).length > 0;
}

export const isSubset = (set, subset) => {
    return new Set([...set, ...subset]).size == set.length;
}

export const getAllPostsPath=()=>{
    const context = require.context("../../posts", false, /\.md$/)
    let path = context.keys().map(context);
    if (process.env.ROUTE) {
        path = path.map(o => process.env.ROUTE + o.replace("/" + process.env.REPO, ""));
    }
    return path;
}