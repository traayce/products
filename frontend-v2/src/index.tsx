import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
// import { Products } from "./components/App";
import { Provider } from "react-redux";
import { storeCreator } from "./store/createStore";
const rootEl = document.getElementById("root");

const store = storeCreator();
render(
    <Provider store={store}>
        <AppContainer>
            <div>test</div>
        </AppContainer>
    </Provider>,
    rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
    module.hot.accept("./components/App", () => {
        const NewApp = require("./components/App").default;

        render(
            <AppContainer>
                <NewApp />
            </AppContainer>,
            rootEl
        );
    });
}
