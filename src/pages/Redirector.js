import React from "react";
import Config from "../../_config";

class Redirector extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    componentDidMount() {
        //redirect to a url, it works with netlify redirect to give status code.
        window.location.href = Config.url + this.props.path;
    }

    render() {

        return (
            <span></span>
        )
    }
}




export default Redirector;
