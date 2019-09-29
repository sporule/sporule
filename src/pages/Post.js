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
import * as pj from "prismjs/components/prism-javascript";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-go";
import "../styles/prism.css";
import iterator from 'markdown-it-for-inline';

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
        let path = "/posts/" + this.props.match.params.path + ".md";
        if (process.env.ROUTE) {
            path = process.env.ROUTE + path;
        }
        this.loadSinglePost(path);
    }


    loadSinglePost = (path) => {
        let resources = new PostResources();
        resources.getAll([path], true).then(posts => {
            if (posts != null && posts !== undefined && posts.items.length > 0) {
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
                const prismConfig = {

                }
                posts.items[0].html = new MarkdownIt(mdConfig).use(markdownItTocAndAnchor, tocConfig).use(prism).use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
                    var aIndex = tokens[idx].attrIndex('target');
                    if (aIndex < 0) {
                        tokens[idx].attrPush(['target', '_blank']);
                    } else {
                        tokens[idx].attrs[aIndex][1] = '_blank';
                    }
                    var aIndex = tokens[idx].attrIndex('rel');
                    if (aIndex < 0) {
                        tokens[idx].attrPush(['rel', 'nofollow']);
                    } else {
                        tokens[idx].attrs[aIndex][1] = 'nofollow';
                    }
                }).render(posts.items[0].content);
                this.setState(() => {
                    return { "post": posts.items[0] };
                });
            }
            else {
                window.location.href = "/";
            }
        })
    }

    render() {
        document.title = document.title.split(" - ")[0] + " - " + this.state.post.title;
        const disqusShortname = Config.disqusShortname;
        const disqusConfig = {
            url: window.location.href,
            identifier: window.location.href,
            title: this.props.match.params.path,
        };
        return (
            <PostTemplate toc={renderHTML(this.state.toc)} post={this.state.post} content={renderHTML(this.state.post.html)} disqus={<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />} />
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

