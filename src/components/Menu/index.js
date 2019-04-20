import React, { Component } from 'react';
import MenuListItem from './MenuListItem';
import ModalDetail from './ModalDetail';
import ModalCommande from './ModalCommande';
import { Slide, CircularProgress, Dialog, DialogContent, Grid, Typography, withStyles, IconButton, Fab } from '@material-ui/core';
import { base } from '../../constants/base';
import { RESTAURANT } from '../../constants/routes';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import ModalNew from './ModalNew';

const styles = theme => ({
  titre: {
    fontFamily: 'Allura'
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      menu: {},
      openDetail: false,
      openCommande: false,
      openNew: false,
      detail: {},
      loading: false,
    }
  }
  handleClickOpenDetail(menu) {
    this.setState({ openDetail: true, detail: menu });
  }
  handleClickOpenCommande(menu) {
    this.setState({ openCommande: true, detail: menu });
  }
  handleCloseCommande() {
    this.setState({ openCommande: false });
  }
  handleCloseDetail() {
    this.setState({ openDetail: false });
  }
  handleClickOpenNew() {
    this.setState({ openNew: true });
  }
  handleCloseNew() {
    this.setState({ openNew: false });
  }
  toggleLoading(newloading) {
    this.setState({
      loading: newloading,
    });
  }

  componentWillMount() {
    console.log("Will mount");
    // this runs right before the <App> is rendered
    this.ref = base.syncState("menu/" + this.state.id, {
      context: this,
      state: 'menu'
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
  }
  render() {
    let menu = Object.keys(this.state.menu).map((key) => {
      let item = this.state.menu[key];
      return <Grid item
        key={key}>
        <MenuListItem
          item={item}
          handleClickOpenDetail={this.handleClickOpenDetail.bind(this)}
          handleClickOpenCommande={this.handleClickOpenCommande.bind(this)}
        />
      </Grid>
    })
    const { classes } = this.props;
    return (
      <div className="MenuList">
        <Grid container justify="space-between">
          <Grid item>
            <IconButton component={Link} to={RESTAURANT + '/' + this.state.id}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography
              className={classes.titre}
              variant="h3"
              align="center"
              gutterBottom>
              Les Menus Proposés
            </Typography>
          </Grid>
          <Grid item>
            <Fab onClick={this.handleClickOpenNew.bind(this)} color="secondary" variant="extended" aria-label="Delete" className={classes.fab}>
              <AddIcon className={classes.extendedIcon} />
              Ajouter un menu
            </Fab>
          </Grid>
        </Grid>
        <Grid container spacing={24} justify="center" alignItems="center">
          {menu}
        </Grid>
        <ModalDetail
          menu={this.state.detail}
          handleClose={this.handleCloseDetail.bind(this)}
          open={this.state.openDetail}
          Transition={Transition} />
        <ModalCommande
          menu={this.state.detail}
          resto={this.state.id}
          handleClose={this.handleCloseCommande.bind(this)}
          open={this.state.openCommande}
          toggleLoading={this.toggleLoading.bind(this)}
          Transition={Transition} />
          <ModalNew
            resto={this.state.id}
            handleClose={this.handleCloseNew.bind(this)}
            open={this.state.openNew}
            toggleLoading={this.toggleLoading.bind(this)}
            Transition={Transition} />
        <Dialog open={this.state.loading} onClose={() => { this.toggleLoading(false) }} aria-labelledby="Chargement...">
          <DialogContent>
            <CircularProgress size={68} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
export default withStyles(styles)(MenuList);
