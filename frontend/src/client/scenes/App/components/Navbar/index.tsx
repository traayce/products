import * as React from 'react';
import { Link } from 'react-router-dom';
import * as style from './style.scss';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid, createStyles, WithStyles } from "@material-ui/core";

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  button: {
    color: 'white',
    'font-family': 'Open Sans'
  }
});


type Props = WithStyles<typeof styles>
interface State {
  isOpen: boolean
}
class Navbar extends React.Component<Props, State> {
  public state: State = {
    isOpen: false
  };
  constructor() {
    super();

  }
  public toggleMenu = (state: boolean) => {
    this.setState({ isOpen: state });
  }
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Drawer open={this.state.isOpen} >
          </Drawer>
          <Toolbar>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


export default withStyles(styles)(Navbar as any);
