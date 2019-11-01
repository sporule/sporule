import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import * as PostActions from "../actions/PostAction";
import * as PostHelper from "../helpers/postHelper";
import { Helmet } from "react-helmet";
import Config from "../../_config";
import CustomPages from "../../template/customPages";

class Page extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            "pinnedPosts":
            {
                "items": [
                    {
                        "title": "",
                        "metas": {
                            "categories": [],
                            "tags": [],
                            "title": "",
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
                "invalidPage": false,
                hash: "",
            }
            ,
            "posts":
            {
                "items": [
                    {
                        "title": "",
                        "metas": {
                            "categories": [],
                            "tags": [],
                            "title": "",
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
                "invalidPage": false,
                hash: ""
            }
        };
        const categoriesString = this.props.match.params.categories;
        const tagsString = queryString.parse(this.props.location.search).tags;
        const excludedTagsString = queryString.parse(this.props.location.search).extags;
        this.page = queryString.parse(this.props.location.search).page || 1;
        this.categories = categoriesString ? categoriesString.split(",") : [];
        this.tags = tagsString ? tagsString.split(",") : [];
        this.excludedTags = excludedTagsString ? excludedTagsString.split(",") : [];
        this.searchString = queryString.parse(this.props.location.search).search || "";


    }


    toPage = (page) => {
        window.location.href = window.location.pathname + "?page=" + page;
    }

    render() {
        let pageName = this.props.match.params.page || "home";
        let Page = CustomPages[pageName.toLowerCase()];
        if (!Page) {
            window.location.href = window.location.origin;
        }
        else {
            const pinnedPosts = PostHelper.getPinnedPosts(this.props.posts);
            const posts = PostHelper.getPostsByPage(this.props.posts, this.page, true, this.searchString, this.categories, this.tags, this.excludedTags);
            if ((posts.length <= 0 && this.props.posts.length > 0) || posts.invalidPage) {
                //reset filters if there is no posts
                window.location.href = "/";
                return null;
            }
            var prev;
            var next;
            if (posts.hasPrevPage) {
                prev = () => {
                    this.toPage(parseInt(posts.page) - 1);
                }
            }
            if (posts.hasNextPage) {
                next = () => {
                    this.toPage(parseInt(posts.page) + 1);
                }
            }
            return (
                <React.Fragment>
                    <Helmet>
                        <title>{Config.site} - {Page.title}</title>
                    </Helmet>
                    <Page.component posts={posts} categories={this.categories} tags={this.tags} exTags={this.excludedTags} prev={prev} next={next} pinned={pinnedPosts} />
                </React.Fragment>
            )
        }

    }
}


function mapStateToProps(state) {
    return {
        posts: state.posts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(PostActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
