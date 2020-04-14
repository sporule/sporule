import React from 'react';
import Main from '../router/Main';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <React.Fragment>
                <Main />
            </React.Fragment>
        );
    }
}



export default App;