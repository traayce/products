import * as React from "react";
import { LinearProgress, Paper, GridList, GridListTile, ListSubheader, WithStyles, withStyles, GridListTileBar } from "@material-ui/core";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { IStore } from "../../store/state";
import { ProductDTO } from "../../store/modules/product";
import { ProductsContainerStyles } from "./components-products-styles";
import { actions } from "../../store/modules/product";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

interface StateProps {
  isLoading: boolean;
  products: Array<ProductDTO>;
  error: undefined | string;
}

interface DispatchProps {
  getProducts?: () => any;
}

type Props = StateProps & DispatchProps & WithStyles<typeof ProductsContainerStyles>;

class ProductsClass extends React.PureComponent<Props> {
  public static MapStateToProps: MapStateToProps<StateProps, object, IStore> = storeState => ({
    products: storeState.products.products,
    isLoading: storeState.products.isLoading,
    error: storeState.products.error,
  })

  public static MapDispatchToProps: MapDispatchToProps<DispatchProps, object> = (dispatch: ThunkDispatch<object, void, Action>, props) => ({
    getProducts: () => dispatch(actions.getProducts())
  })

  public render(): JSX.Element {
    const { products, isLoading, error, classes } = this.props;
    if (products.length === 0 && isLoading === false && error === undefined) {
      this.getProducts();
    }
    if (isLoading) {
      return <Paper className={classes.Container}>
        <LinearProgress />
      </Paper>;
    }
    return <Paper className={classes.Container}>
      <GridList cellHeight={180} >
        <GridListTile key="Subheader" cols={2} >
          <ListSubheader component="div">Products ({error})</ListSubheader>
        </GridListTile>
        {this.renderProducts(products)}
      </GridList>
    </Paper>;
  }

  private renderProducts = (products: ProductDTO[]) => {
    return products.map((product: ProductDTO) => (
      <GridListTile key={product.id}>
        <GridListTileBar
          title={product.name + " " + product.code}
          subtitle={<span>Product</span>}
        />
      </GridListTile>
    ));
  }

  private getProducts() {
    const { getProducts } = this.props;
    if (getProducts != null) {
      getProducts();
    }
  }
}
export const ProductsListComponent = withStyles(ProductsContainerStyles)(connect(ProductsClass.MapStateToProps, ProductsClass.MapDispatchToProps)(ProductsClass));