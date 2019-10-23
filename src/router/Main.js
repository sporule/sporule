import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from 'react-router-dom';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import Nav from "../pages/Nav";
import CustomPage from "../pages/CustomPage";
import ScriptsTemplate from "../../template/scripts";
import Footer from "../pages/Footer";





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
                    <Route exact path="/" component={Posts} />
                    <Route exact path="/categories/:categories" component={Posts} />
                    <Route exact path="/items/:path" component={Post} />
                    <Route exact path="/:path/" component={Post} />
                    <Route exact path="/pages/:page" component={CustomPage} />
                </Switch>
                <Footer />
                <ScriptsTemplate />
            </Router>
        );
    }
}


export default Main;