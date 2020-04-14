import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from 'react-router-dom';
import Page from '../pages/Page';
import Post from '../pages/Post';
import Nav from "../pages/Nav";
import ScriptsTemplate from "../../template/scripts";
import Footer from "../pages/Footer";
import Config from "../../_config";





class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.basename = process.env.REPO ? process.env.REPO : "/";
    }

    render() {
        return (
            <Router basename={this.basename}>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Page} />
                    <Route exact path="/categories/:categories" component={Page} />
                    <Route exact path="/items/:path" component={Post} />
                    <Route exact path="/:page/" component={Page} />
                    <Route exact path="/:page/categories/:categories" component={Page} />
                </Switch>
                <Footer />
                <ScriptsTemplate />
            </Router>
        );
    }
}


export default Main;