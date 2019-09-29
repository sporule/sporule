import * as types from './ActionTypes';
import PostResources from "../resources/PostResources";
import { posts } from '../reducers/PostReducer';


export function loadPostsSuccess(Posts) {
    return { type: types.LOAD_POSTS_SUCCESS, Posts };
}


export function clearPostsSuccess() {
    return { type: types.CLEAR_POSTS_SUCCESS };
}

export function loadPosts(paths) {
    let resources = new PostResources();
    return function (dispatch) {
        return resources.getAll(paths).then(Posts => {
            if (Posts) {
                dispatch(loadPostsSuccess(Posts));
            }
        })
    }
}

export function clearPosts() {
    return function (dispatch) {
        dispatch(clearPostsSuccess())
    }
}