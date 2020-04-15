import MarkdownHandler from 'markdown-handler';
import * as PostHelper from "../helpers/postHelper";

let instance = null;

export default class PostResources {
    constructor() {
        if (!instance) {
            this.defaultPaths = ['/md.js']
            instance = this;
        }
        return instance;
    }

    getAll(paths = this.defaultPaths) {
        let mdHandler = new MarkdownHandler();
        return mdHandler.loadMds(paths).then(posts => {
            posts.categories = PostHelper.getCategories(posts);
            posts.tags = PostHelper.getTags(posts);
            posts = PostHelper.addLink(posts);
            return new Promise((resolve, reject) => {
                resolve(posts);
            });
        });
    }
}