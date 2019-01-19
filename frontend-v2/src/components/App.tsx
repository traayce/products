import * as React from "react";
import "./../assets/scss/App.scss";

export interface AppProps {
}

export default class App extends React.PureComponent<AppProps> {
    render() {
        return (
            <div className="app">
                <div>init</div>
            </div>
        );
    }
}
