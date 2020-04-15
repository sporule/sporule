import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from 'react-router-dom';
import Page from '../pages/Page';
import Post from '../pages/Post';
import Nav from "../pages/Nav";
import ScriptsTemplate from "../../template/scripts";
import Footer from "../pages/Footer";
import Page404 from "../pages/Page404";
import Redirector from "../pages/Redirector";





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
                    <Route path="/404/" component={Page404} />
                    <Route exact path="/categories/:categories" component={Page} />
                    <Route exact path="/items/:path" component={Post} />
                    <Route exact path="/:page/categories/:categories" component={Page} />
                    <Route path="/:page/" component={Page} />
                    <Route component={Page404} />
                </Switch>
                <Footer />
                <ScriptsTemplate />
            </Router>
        );
    }
}


export default Main;