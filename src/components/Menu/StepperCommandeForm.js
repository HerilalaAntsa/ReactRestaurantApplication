import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Typography, Grid } from "@material-ui/core";

function StepperCommandeForm(props) {
    let radio = Object.keys(props.option).map(function (key) {
        let item = props.option[key]
        return <FormControlLabel
            key={key}
            value={key}
            control={
                <Radio
                    color="primary" />
            }
            label={
                <span>
                    <Typography>{item.nom}</Typography>
                    <FormHelperText>{item.description}</FormHelperText>
                </span>
            } />
    });
    return (
        <FormControl component="fieldset">
            <Grid container spacing={8}>
                <Grid item>
                    <FormLabel component="legend">{props.label}</FormLabel>
                </Grid>
                <Grid item>
                    <RadioGroup
                        aria-label={props.name}
                        name={props.name}
                        value={props.selected}
                        onChange={props.handleRadioSelection}
                    >
                        {radio}
                    </RadioGroup>
                </Grid>
            </Grid>
        </FormControl>
    )
}
export default StepperCommandeForm