import React from 'react';
import { GridList, GridListTile, Card, CardHeader, CardContent, Typography, CardMedia } from '@material-ui/core';

function Plat(props) {
    let list = Object.keys(props.list).map((key) => {
        let item = props.list[key];
        return <DetailPlat
            key = {key}
            plat={item} />
    });
    return (
        <GridList className="listPlat" cols={list.length}>
            {list}
        </GridList>);
}
function DetailPlat(props) {
    let item = props.plat;
    return (
        <GridListTile key={item._id}>
            <Card elevation={1}>
                <CardHeader
                    title={item.nom}
                    subheader={item.prix}
                />
                <CardContent>
                    <Typography color="textPrimary">
                        {item.description}
                    </Typography>
                </CardContent>
                <CardMedia
                    image={item.photo}
                    title={item.nom}
                />
            </Card>
        </GridListTile>
    );
}
export default Plat