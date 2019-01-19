import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { storeCreator } from "./store/createStore";
import { ProductsComponent } from "./components/products/components-products-component";
const rootEl = document.getElementById("root");

const store = storeCreator();
render(
    <Provider store={store}>
        <AppContainer>
            <ProductsComponent />
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
