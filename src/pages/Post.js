import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Config from "../../_config";
import * as PostActions from "../actions/PostAction";
import PostTemplate from "../../template/post";
import renderHTML from 'react-render-html';
import MarkdownIt from 'markdown-it';
import Disqus from 'disqus-react';
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor-with-slugid";
import PostResources from "../resources/PostResources";
import prism from 'markdown-it-prism';
import "prismjs/components/prism-bash";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-go";
import "../styles/prism.css";
import iterator from 'markdown-it-for-inline';
import { Helmet } from "react-helmet";
import * as Utility from "../helpers/utility";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

class Post extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            "toc": "",
            "post": {
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
                "path": "",
                "html": ""
            }
        };
    }

    componentDidMount() {
        //map query string path to the local markdown path
        let path = Utility.getAllPostsPath().filter(o => o.includes(this.props.match.params.path))[0];
        if (Config.alwaysRefreshPost) {
            //always refresh the posts
            this.refreshPost(path);
        }
        else {
            //load from cache
            this.loadPostFromCache(path);
        }
    }

    loadPostFromCache = (path) => {
        let posts = this.props.posts.items.filter(o => o.path.includes(this.props.match.params.path));
        if (posts.length > 0) {
            let post = this.stylePost(posts[0]);
            this.setState(() => {
                return { "post": post };
            });
        }
        else {
            this.refreshPost(path);
        }

    }

    refreshPost = (path) => {
        let resources = new PostResources();
        resources.getAll([path]).then(posts => {
            if (posts != null && posts !== undefined && posts.items.length > 0) {
                let post = this.stylePost(posts.items[0]);
                this.setState(() => {
                    return { "post": post };
                });
            }
            else {
                window.location.href = "/";
            }
        })
    }

    stylePost = (post) => {
        const mdConfig = {
            html: true,
            linkify: true,
            typography: true,
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value;
                    } catch (__) { }
                }

                return ''; // use external default escaping
            }
        }
        const tocConfig = {
            "anchorClassName": "md-anchor",
            "tocClassName": "md-toc",
            "tocCallback": function (tocMarkdown, tocArray, tocHtml) {
                this.setState(() => {
                    return { "toc": tocHtml };
                });
            }.bind(this)
        }
        post.html = new MarkdownIt(mdConfig).use(markdownItTocAndAnchor, tocConfig).use(prism).use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
            var aIndex = tokens[idx].attrIndex('target');
            if (aIndex < 0) {
                tokens[idx].attrPush(['target', '_blank']);
            } else {
                tokens[idx].attrs[aIndex][1] = '_blank';
            }
            var aIndex = tokens[idx].attrIndex('rel');
            let link = tokens[idx].attrs[tokens[idx].attrIndex('href')][1];
            if (Config.internalLinkNames.filter(n=>link.includes(n)).length<=0) {
                if (aIndex < 0) {
                    tokens[idx].attrPush(['rel', 'nofollow noopener noreferrer']);
                } else {
                    tokens[idx].attrs[aIndex][1] = 'nofollow noopener noreferrer';
                }
            }
        }).render(post.content);
        return post;
    }

    render() {
        const disqusShortname = Config.disqusShortname;
        const disqusConfig = {
            url: window.location.href,
            identifier: window.location.href,
            title: this.props.match.params.path,
        };
        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{Config.site} - {this.state.post.title.toUpperCase()}</title>
                </Helmet>
                <div><ScrollUpButton /></div>
                <PostTemplate toc={renderHTML(this.state.toc)} post={this.state.post} content={renderHTML(this.state.post.html)} disqus={<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />} />
            </React.Fragment>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
