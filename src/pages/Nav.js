import React from "react";
import NavTemplate from "../../template/nav";
import { connect } from "react-redux";
import Config from "../../_config";
import analytics from 'universal-ga';


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
    }

    render() {
        return <NavTemplate categories={this.props.posts.categories} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);