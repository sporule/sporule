import MarkdownHandler from 'markdown-handler';
import { store } from "../index";
import * as PostHelper from "../helpers/postHelper";
import * as Utility from "../helpers/utility";

let instance = null;

export default class PostResources {
    constructor() {
        if (!instance) {
            const context = require.context("../../posts", false, /\.md$/)
            this.defaultPaths = Utility.getAllPostsPath();
            instance = this;
        }
        return instance;
    }

    getAll(paths = this.defaultPaths, forceUpdate = false) {
        const states = store.getState();
        let currentPostItems = states.posts.items;
        let currentPaths = currentPostItems.map(item => item["path"]);
        let newPaths = paths.filter(path => !currentPaths.includes(path));
        currentPostItems = currentPostItems.filter(item => paths.includes(item.path));
        if (newPaths.length <= 0 && !forceUpdate) {
            //return null if there are no new updates
            return new Promise((resolve, reject) => {
                resolve(null);
            })
        }
        //add  new updates to the store
        let mdHandler = new MarkdownHandler();
        return mdHandler.loadMds(newPaths).then(posts => {
            posts.items = [...posts.items, ...currentPostItems];
            posts.categories = PostHelper.getCategories(posts);
            posts.tags = PostHelper.getTags(posts);
            posts = PostHelper.addLink(posts);
            return new Promise((resolve, reject) => {
                resolve(posts);
            });
        });
    }
}