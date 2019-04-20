import React, { Component } from 'react';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { FormControl, FormLabel, Grid, withStyles, Paper, Chip, TextField, Typography } from "@material-ui/core";
import classNames from 'classnames';
import CancelIcon from '@material-ui/icons/Cancel';
import Select from 'react-select';

const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
  });
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  function Control(props) {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }
  function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };
class StepperNewForm extends Component {
    constructor(props){
        super(props);
    }
    // let radio = Object.keys(props.option).map(function (key) {
    //     let item = props.option[key]
    //     return <FormControlLabel
    //         key={key}
    //         value={key}
    //         control={
    //             <Radio
    //                 color="primary" />
    //         }
    //         label={
    //             <span>
    //                 <Typography>{item.nom}</Typography>
    //                 <FormHelperText>{item.description}</FormHelperText>
    //             </span>
    //         } />
    // });
    render(){
        const { classes, theme } = this.props;
        const selectStyles = {
            input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
            }),
        };
        return (
            <FormControl component="fieldset">
                <Grid container spacing={8}>
                    <Grid item>
                        <FormLabel component="legend">{this.props.label}</FormLabel>
                    </Grid>
                    <Grid item>
                        <Select
                            styles={selectStyles}
                            textFieldProps={{
                            label: 'Label',
                            InputLabelProps: {
                                shrink: true,
                            },
                            }}
                            options={this.props.suggestions}
                            components={components}
                            value={this.state.multi}
                            onChange={this.handleChange('multi')}
                            placeholder="Select multiple countries"
                            isMulti
                        />
                    </Grid>
                </Grid>
            </FormControl>
        )
    }
    
}
export default withStyles(styles, { withTheme: true })(StepperNewForm)