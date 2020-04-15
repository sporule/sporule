import React from "react";
import NavTemplate from "../../template/nav";
import { connect } from "react-redux";
import Config from "../../_config";
import analytics from 'universal-ga';
import AddToHomeScreen from "a2hs.js";
import { withRouter } from 'react-router';

class Nav extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        if (Config.googleAnaltics.length > 5) {
            analytics.initialize(Config.googleAnaltics);
            analytics.pageview(window.location.pathname);
            analytics.ecSend();
        }
        AddToHomeScreen({
            brandName:Config.site,
            logoImage:"<img class='pwa-logo' src="+Config.logo+" />"
        });
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

    render() {
        return <NavTemplate searchAction={this.searchAction} categories={this.props.posts.categories} />
    }
}


function mapStateToProps(state) {
    return {
        posts: state.posts,
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));