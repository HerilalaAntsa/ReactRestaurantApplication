import React, { Component } from 'react';
import {base} from '../../constants/base';
import RestaurantListItem from './RestaurantListItem';
import { Typography, Divider, Grid, withStyles, TextField, InputAdornment, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  titre: {
    fontFamily: 'Allura'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});
class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurant: {}, nom: '', cuisine: '' }
  }

  changeQuery(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentWillMount() {
    console.log("Will mount")
    // this runs right before the <App> is rendered
    this.ref = base.bindToState("restaurant", {
      context: this,
      state: 'restaurant'
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
  }

  render() {
    const { classes } = this.props;
    let listRestaurant = Object.keys(this.state.restaurant).map((id) => {
      let item = this.state.restaurant[id];
      if(item.nom.toLowerCase().indexOf(this.state.nom.toLowerCase()) !== -1
      || item.adresse.toLowerCase().indexOf(this.state.nom.toLowerCase()) !== -1
      && item.cuisine.toLowerCase().indexOf(this.state.cuisine.toLowerCase()) !== -1){
        return  <RestaurantListItem key={id}
                item={item}>
              </RestaurantListItem>
      }      
    })
    return (
      <Grid container justify="center" alignItems="center" spacing={8} direction="column">
        <Grid item>
          <Typography variant="h2" className={classes.titre}>Liste des restaurants</Typography>
          <Divider variant="middle"/>
        </Grid>
        <Grid item>
          <TextField
            name="nom"
            label="Chercher"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">
                                <SearchIcon />
                              </InputAdornment>,
            }}
            onChange={this.changeQuery.bind(this)}  
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="cuisine">Cuisine</InputLabel>
            <Select
              onChange={this.changeQuery.bind(this)}
              value={this.state.cuisine}
              inputProps={{
                name: 'cuisine',
              }}
            >
              <MenuItem value="">
                <em>Tous</em>
              </MenuItem>
              <MenuItem value="Italienne">Italienne</MenuItem>
              <MenuItem value="Française">Française</MenuItem>
              <MenuItem value="Espagnole">Espagnole</MenuItem>
              <MenuItem value="Malagasy">Malagasy</MenuItem>
              <MenuItem value="Americaine">Americaine</MenuItem>
              <MenuItem value="Européenne">Européenne</MenuItem>
              <MenuItem value="Ici et Ailleurs">Ici et Ailleurs</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Grid container justify="center" alignItems="center" spacing={32}>
              {listRestaurant}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(RestaurantList);
