import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Typography } from "@material-ui/core";

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
            <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup
                aria-label={props.name}
                name={props.name}
                value={props.selected}
                onChange={props.handleRadioSelection}
            >
                {radio}
            </RadioGroup>
        </FormControl>
    )
}
export default StepperCommandeForm