import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import * as PostActions from "../actions/PostAction";
import * as PostHelper from "../helpers/postHelper";
import { Helmet } from "react-helmet";
import Config from "../../_config";
import CustomPages from "../../template/customPages";
import { withRouter } from 'react-router'
import * as Utility from "../helpers/utility";

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
                "invalidPage": false
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
                "invalidPage": false
            }
        };
    }


    toPage = (page) => {
        let search = window.location.search
        let pageNum = queryString.parse(this.props.location.search).page;
        if (pageNum){
            search = search.replaceAll("page="+pageNum,"page="+page)
        }else if(search.includes("?")){
            search = search+"&page="+page;
        }else{
            search = search +"?page="+page;
        }
        let link = window.location.pathname + search;
        this.props.history.push(link);
    }

    searchAction = (search_route) => {
        event.preventDefault();
        for (var i = 0; i <= 50; i++) {
            if (event.target[i].name == "search") {
                this.props.history.push(search_route + "&search=" + event.target[i].value);
                break;
            }
        }
    }

    componentDidMount() {
        Utility.scrollToTop();
    }

    componentDidUpdate() {
        Utility.scrollToTop();
    }

    render() {
        // get parameters
        const categoriesString = this.props.match.params.categories;
        const tagsString = queryString.parse(this.props.location.search).tags;
        const excludedTagsString = queryString.parse(this.props.location.search).extags;
        this.page = queryString.parse(this.props.location.search).page || 1;
        this.categories = categoriesString ? categoriesString.split(",") : [];
        this.tags = tagsString ? tagsString.split(",") : [];
        this.excludedTags = excludedTagsString ? excludedTagsString.split(",") : [];
        this.searchString = queryString.parse(this.props.location.search).search || "";

        let pageName = this.props.match.params.page || "home";
        let Page = CustomPages[pageName.toLowerCase()];
        if (!Page) {
            this.props.history.push("/404/");
            return null;
        }
        else {
            const pinnedPosts = PostHelper.getPinnedPosts(this.props.posts);
            const posts = PostHelper.getPostsByPage(this.props.posts, this.page, true, this.searchString, this.categories, this.tags, this.excludedTags);
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
                        <meta name="description" content={Page.description || Page.title} />
                    </Helmet>
                    <Page.component posts={posts} categories={this.categories} tags={this.tags} exTags={this.excludedTags} prev={prev} next={next} pinnedPosts={pinnedPosts} searchAction={this.searchAction} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));
