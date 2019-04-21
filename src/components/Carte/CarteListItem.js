import React, { Component } from 'react';
import { Button, ListItem, Avatar, ListItemText, withStyles, Chip, Grid, Typography } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { app } from '../../constants/base';

const styles = theme => ({
    titre: {
        fontFamily: 'Allura'
    },
    button: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
});
    
var storageRef = app.storage().ref();
class CarteListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            img : '',
            loading: false,
        }
    }
    getImageUrl(value){
        storageRef.child(value).getDownloadURL().then((url)=>{
            this.setState({
                img : url,
            })
        }).catch(()=>{});
    }
    render(){
        this.getImageUrl(this.props.item.photo || '');
        const { classes } = this.props;
        return (
            <ListItem key={this.props.item._id} alignItems="flex-start" divider>
                <Grid container spacing={8} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <input
                            accept="image/*"
                            style={{display:'none'}}
                            type="file"
                            name={this.props.item._id}
                            id={'up-' + this.props.item._id}
                            onChange={this.props.handleUploadFile}
                        />
                        <label htmlFor={'up-' + this.props.item._id}>
                            <Button variant="text"
                            focusRipple component="span">
                            <img width={150} alt={this.props.item.nom} src={this.state.img} />
                            </Button>
                        </label>
                    </Grid>
                    <Grid item container direction="column">
                        <Grid item>
                            <ListItemText secondary={this.props.item.description}>
                                <Typography style={{ marginRight: 20 }} inline>{this.props.item.nom}</Typography>
                                <Chip label={this.props.item.type} />
                            </ListItemText>
                        </Grid>
                        <Grid item>
                            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.props.handleClickOpenCommande(this.props.item)}>
                                <AddShoppingCartIcon className={classes.leftIcon} />
                                Commander ce plat
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Chip
                            label={
                                <Typography>
                                    {Intl.NumberFormat().format(this.props.item.prix)}
                                </Typography>
                            }
                            color='primary'
                            avatar={<Avatar>Ar</Avatar>}
                            variant='outlined'
                        />
                    </Grid>
                </Grid>
            </ListItem>
        )
}
}
export default withStyles(styles)(CarteListItem)