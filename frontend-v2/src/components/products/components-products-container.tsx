import * as React from "react";
import { ProductsContainerStyles } from "./components-products-styles";
import { WithStyles, Paper, withStyles } from "@material-ui/core";
import { ProductsListComponent } from "./components-products-component";
import { ProductFormComponent } from "./form/components-products-form-component";

class ProductContainerClass extends React.PureComponent<WithStyles<typeof ProductsContainerStyles>> {
    public render(): JSX.Element {
        const { classes } = this.props;
        return <Paper className={classes.Container}>
            <ProductFormComponent />
            <ProductsListComponent />
        </Paper>;
    }
}
export const ProductContainer = withStyles(ProductsContainerStyles)(ProductContainerClass);