import React, { Component } from 'react';
import { Card, CardHeader, CardContent, Typography, CardMedia, ListItem, List, CardActionArea } from '@material-ui/core';
import { app } from '../../constants/base';

var storageRef = app.storage().ref();
class DetailPlat extends Component {
    constructor(props){
        super(props);
        this.state = {
            img : '',
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
        this.getImageUrl(this.props.plat.photo);
        let item = this.props.plat;
        return (
            <ListItem key={item._id}>
                <Card elevation={0}>
                    
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        type="file"
                        name={item._id}
                        id={'menu-' + item._id}
                        onChange={(e) => this.props.handleUploadFile(e, this.props.type, item._id)}
                    />
                    <label htmlFor={'menu-' + item._id}>
                        <CardActionArea variant="text"
                            focusRipple component="span">
                            <CardMedia
                                style={{height: 140,}}
                                // image={item.photo}
                                image={this.state.img}
                                title={item.nom}
                            />
                        </CardActionArea>
                    </label>
                    <CardHeader
                        title={item.nom}
                        subheader={item.prix}
                    />
                    <CardContent>
                        <Typography align="center">
                            {item.description}
                        </Typography>
                    </CardContent>
                </Card>
            </ListItem>
        );
    }
}
function Plat(props) {
    let list = Object.keys(props.list).map((key) => {
        let item = props.list[key];
        return <DetailPlat
            handleUploadFile={props.handleUploadFile}
            type={props.type}
            key={key}
            plat={item} />
    });
    return (
        <List className="listPlat" cols={list.length}>
            {list}
        </List>);
}
export default Plat