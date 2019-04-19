import React from 'react';
import { Card, CardHeader, CardContent, Typography, CardMedia, ListItem, List } from '@material-ui/core';

function DetailPlat(props) {
    let item = props.plat;
    return (
        <ListItem key={item._id}>
            <Card elevation={0}>
                <CardMedia
                    style={{height: 140,}}
                    // image={item.photo}
                    image={item.photo}
                    title={item.nom}
                />
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
function Plat(props) {
    let list = Object.keys(props.list).map((key) => {
        let item = props.list[key];
        return <DetailPlat
            key={key}
            plat={item} />
    });
    return (
        <List className="listPlat" cols={list.length}>
            {list}
        </List>);
}
export default Plat