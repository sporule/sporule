import React from "react";
import { Helmet } from "react-helmet";
import Config from "../../_config";
import CustomPages from "../../template/customPages";
import { withRouter } from 'react-router'
import * as Utility from "../helpers/utility";
import { Link } from "react-router-dom";

class Page404 extends React.Component {
    constructor(props, context) {
        super(props, context);
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
        let pageName = 'page404';
        let Page = CustomPages[pageName.toLowerCase()];
        if (!Page) {
            Page = {
                "title": "Page not Found 404",
                "component": () => {
                    return (
                        <React.Fragment>
                            <div className="notfound">
                                <div className="notfound-404">
                                    <h1>404</h1>
                                </div>
                                <h2>Page not found</h2>
                                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                                <Link to={"/"}>Home page</Link>
                            </div>
                        </React.Fragment>
                    )
                }
            }
        }
        return (
            <React.Fragment>
                <Helmet>
                    <title>{Config.site} - {Page.title}</title>
                </Helmet>
                <Page.component searchAction={this.searchAction} />
            </React.Fragment>
        )
    }
}




export default withRouter(Page404);
