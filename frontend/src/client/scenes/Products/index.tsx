import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Paper, RaisedButton, TextField, CircularProgress, LinearProgress } from 'material-ui';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import * as style from './style.scss';
import { Link } from 'react-router-dom';


import { getProducts } from 'client/store/modules/product/actions';
import { connect, MapStateToProps } from 'react-redux';
import { IStore } from 'client/store/state';
import { IRegisterModel } from 'client/helpers/registration'
import { Redirect } from 'react-router'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

interface IStateProps {
  isLoading: boolean;
  products: Array<IViewModel>;
  error: undefined | string
}

interface IViewModel {
  id: number
  price: number
  name: string
  code: string
  LastUpdated: Date
}

interface IDispatchProps {
  getProducts: () => any
}

type OwnProps = RouteComponentProps<{}>;
type IProps = IStateProps & IDispatchProps & OwnProps;

interface State {
  isOpen: boolean
  selectedItem?: IViewModel
}

class ProductsViewClass extends React.Component<IProps, State> {
  public state: State = {
    isOpen: false,
    selectedItem: undefined
  }
  constructor() {
    super()
  }

  private openModal = (product: IViewModel) => {
    this.setState({ isOpen: true, selectedItem: product })
  }
  private closeModal = () => {
    this.setState({ isOpen: false })
  }

  private renderProducts = (products: IViewModel[]) => {
    return products.map((product: IViewModel) => (
      <GridListTile key={product.id}>
        <GridListTileBar
          title={product.name + " " + product.code}
          subtitle={<span>Product</span>}
        />
      </GridListTile>
    ))
  }
  public render() {
    const { products, isLoading, error } = this.props;
    const { isOpen, selectedItem } = this.state;
    if (products.length === 0 && isLoading === false && error === undefined) {
      this.getProducts();
    }
    if (isLoading) {
      return (
        <Paper className={style.container}>
          <LinearProgress />
        </Paper>
      )
    }
    return <Paper className={style.container}>
      <GridList cellHeight={180} >
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Products ({error})</ListSubheader>
        </GridListTile>
        {this.renderProducts(products)}
      </GridList>
    </Paper>;
  }

  private getProducts() {
    this.props.getProducts();
  }
}

export default connect<IStateProps, IDispatchProps, OwnProps>(
  ({ products }: IStore) => ({
    products: products.products as IViewModel[],
    isLoading: products.isLoading,
    error: products.error,
  }),
  (dispatch, ownProps: OwnProps) => ({
    getProducts: () => dispatch(getProducts())
  })
)(ProductsViewClass);
