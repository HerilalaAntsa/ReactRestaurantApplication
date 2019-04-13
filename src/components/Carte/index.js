import React, { Component } from 'react';
import CarteListItem from './CarteListItem';
import { app, base } from '../../constants/base';
import ModalCommande from './ModalCommande';
import { Slide, Dialog, DialogContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class CarteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      carte: {}, categorie: {},
      openCommande: false,
      detail: {},
      value: 0,
      loading: false,
    }
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleClickOpenCommande(carte) {
    this.setState({ openCommande: true, detail: carte });
  }
  handleCloseCommande() {
    this.setState({ openCommande: false });
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({
          authentificated: true,
          loading: false
        })
      }else{
        this.setState({
          authentificated: false,
          loading: true
        })
      }
    })
    this.ref = base.syncState("carte/" + this.state.id, {
      context: this,
      state: 'carte'
    });
    this.refCategorie = base.syncState("categorie/", {
      context: this,
      state: 'categorie/'
    })
  }

  componentWillUnmount() {
    this.removeAuthListener(); 
    base.removeBinding(this.ref);
  }

  toggleLoading(newloading) {
    this.setState({
      loading: newloading,
    });
  }

  render() {
    if(this.state.loading === true){
      return (
        <div>
          <CircularProgress disableShrink />;
        </div>
    )}
    let tabHorsDoeuvre = [];
    let tabPlat = [];
    let tabDessert = [];
    let tabAutre = [];
    let carte = Object.keys(this.state.carte).map((key) => {
      let item = this.state.carte[key];
      
      let comp = <CarteListItem
        key={item._id}
        id={this.state.id}
        item={item}
        authentificated = {this.state.authentificated}
        handleClickOpenCommande={this.handleClickOpenCommande.bind(this)} />

      switch (item.type) {
        case "Hors d'oeuvre":
          tabHorsDoeuvre.push(comp);
          break;
        case "Plat":
          tabPlat.push(comp);
          break;
        case "Dessert":
          tabDessert.push(comp);
          break;
        default:
          tabAutre.push(comp);
          break;
      }
      return comp;
    });

    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className="CarteList">
        <h1>Notre Carte</h1>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Tous" />
              <Tab label="Hors d'oeuvres" />
              <Tab label="Plats" />
              <Tab label="Desserts" />
              <Tab label="Autres" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>{carte}</TabContainer>}
          {value === 1 && <TabContainer>{tabHorsDoeuvre}</TabContainer>}
          {value === 2 && <TabContainer>{tabPlat}</TabContainer>}
          {value === 3 && <TabContainer>{tabDessert}</TabContainer>}
          {value === 4 && <TabContainer>{tabAutre}</TabContainer>}
        </div>
        <ModalCommande
          resto={this.state.id}
          carte={this.state.detail}
          handleClose={this.handleCloseCommande.bind(this)}
          open={this.state.openCommande}
          toggleLoading={this.toggleLoading.bind(this)}
          Transition={Transition} />
          <Dialog open={this.state.loading} onClose={() => { }} aria-labelledby="Chargement...">
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
export default withStyles(styles)(CarteList);
