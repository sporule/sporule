import * as types from '../actions/ActionTypes';
import InitialState from "./InitialState";



export function posts(state = InitialState.posts, action) {
    switch (action.type) {
        case types.LOAD_POSTS_SUCCESS:
            return action.Posts;
        case types.CLEAR_POSTS_SUCCESS:
            return {
                "items": [
                    {
                        "title": "",
                        "metas": {
                            "categories": [],
                            "tags": [],
                            "date": "",
                            "coverimage": ""
                        },
                        "link": "",
                        "content": "",
                        "excerpt": "",
                        "path": ""
                    }
                ],
                "categories": [],
                "tags": [],
                "invalidPage": false
            };
        default:
            return state;
    }
}