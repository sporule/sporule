import React from "react";
import CustomPages from "../../template/customPages";

class CustomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        let Page = CustomPages[this.props.match.params.page.toLowerCase()];
        if (!Page) {
            window.location.href = window.location.origin;
        }
        else {
            return <Page />
        }

    }
}



export default CustomPage
