import React, { Component } from 'react';
import RestaurantDetail from './RestaurantDetail';
import { base, app } from '../../constants/base';
import { Paper, Typography, withStyles, Dialog, DialogContent, CircularProgress } from '@material-ui/core';
import RestaurantMap from '../RestaurantMap';
import Leaflet from 'leaflet';
import '../RestaurantMap/index.css';
import 'leaflet/dist/leaflet.css';
import { withSnackbar } from 'notistack';
Leaflet.Icon.Default.imagePath = 'leaflet/dist/images/';

const styles = theme => ({
  titre: {
    fontFamily: 'Allura'
  },
  main: {
    padding: theme.spacing.unit,
  }
})
class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      restaurant: {},
      value: 0,
      loading: false,
    }
  }
  toggleLoading(newloading) {
    this.setState({
      loading: newloading,
    });
  }
  handleUploadFile(event){
    var fileList = event.target.files;
    var name = 'restaurant/' + this.state.id + fileList[0].name;
    this.setState({
      photo: name,
    })
    var reader = new FileReader();
    reader.onload = (loadedEvent) => {        
        var storageRef = app.storage().ref();
        var imgref = storageRef.child(this.state.photo);
        imgref.putString(loadedEvent.target.result, 'data_url').then((snapshot) => {
        let  copieRestaurant = {...this.state.restaurant};
        copieRestaurant['photo'] = imgref.fullPath || "default-thumbnail.jpg";
        this.setState({
          restaurant: copieRestaurant
        });
        this.toggleLoading(false);
        this.props.enqueueSnackbar("L'image a été correctement ajouté(e)",
          {
            variant: 'default',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
      });
    }
    this.toggleLoading(true);
    reader.readAsDataURL(fileList[0]);
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  componentWillMount() {
    console.log("Will mount")
    this.ref = base.syncState("restaurant/" + this.state.id, {
      context: this,
      state: 'restaurant',
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Restaurant">
        <div>
          <Paper className={classes.main}>
            <Typography variant="h2" className={classes.titre} gutterBottom>Restaurant {this.state.restaurant.nom}</Typography>
            <RestaurantDetail handleUploadFile={this.handleUploadFile.bind(this)} item={this.state.restaurant}/>
            <RestaurantMap position={this.state.restaurant.position || {lat:0, lng:0}} nom={this.state.restaurant.nom}/>
          </Paper>
        <Dialog open={this.state.loading} onClose={() => { this.toggleLoading(false) }} aria-labelledby="Chargement...">
          <DialogContent>
            <CircularProgress size={68} />
          </DialogContent>
        </Dialog>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withSnackbar(Restaurant));
