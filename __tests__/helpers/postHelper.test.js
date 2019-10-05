import * as PostHelper from "../../src/helpers/postHelper";

describe("Testing helpers/postHelper.js", () => {

    let posts = {
        "items": [
            {
                "title": "Test 1",
                "metas": {
                    "categories": ["Test Post"],
                    "tags": ["Fun"],
                    "date": "",
                    "coverimage": ""
                },
                "link": "",
                "content": "",
                "excerpt": "",
                "path": ""
            },
            {
                "title": "Test 2",
                "metas": {
                    "categories": ["Test Post"],
                    "tags": ["Fun"],
                    "date": "",
                    "coverimage": ""
                },
                "link": "",
                "content": "",
                "excerpt": "",
                "path": ""
            },
            {
                "title": "Test 3",
                "metas": {
                    "categories": ["Test Post"],
                    "tags": ["Fun"],
                    "date": "",
                    "coverimage": "",
                    "pinned": true
                },
                "link": "",
                "content": "",
                "excerpt": "",
                "path": ""
            }
        ],
        "categories": [],
        "tags": [],
        "invalidPage": false,
        hash: ""
    }
    test("getPinnedPosts(): It should only return pinned post", () => {
        let tempPosts = PostHelper.getPinnedPosts(posts);
        const actual = tempPosts.items[0].title;
        const expected = "Test 3";
        expected(actual).toEqual(expected);
    })
})