import React, { Component } from 'react';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { FormLabel, Grid, withStyles, Paper, Chip, TextField, Typography, MenuItem, Avatar, ListItemAvatar, ListItemText } from "@material-ui/core";
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
function Option(props) {
    return (
        <MenuItem
        key={props.data._id}
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
            fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
        >
            <ListItemAvatar>
                <Avatar alt={props.data.nom} src={props.data.photo} />
            </ListItemAvatar>
            <ListItemText inset primary={props.data.nom} />
        </MenuItem>
    );
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
            avatar={<Avatar alt={props.data.nom} src={props.data.photo} />}
            key={props.data._id}
            tabIndex={-1}
            label={props.data.nom}
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
            Aucune option
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
    constructor(props) {
        super(props);
        this.state = {
            horsdoeuvre: null,
            plat: null,
            dessert: null,
        }
    }
    handleChange(value) {
        delete value.prix;
        this.setState({
            [this.props.name]: value,
        });
        this.props.menuState({
            [this.props.name]:value,
        })
    };

    render() {
        const { classes, theme } = this.props;
        const value = this.state[this.props.name];
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
                <Grid container spacing={8} direction="column">
                    <Grid item>
                        <FormLabel component="legend">{this.props.label}</FormLabel>
                    </Grid>
                    <Grid item>
                        <Select
                            name={this.props.name}
                            classes={classes}
                            styles={selectStyles}
                            textFieldProps={{
                                InputLabelProps: {
                                    shrink: true,
                                },
                            }}
                            options={this.props.suggestion}
                            components={components}
                            value={value}
                            onChange={this.handleChange.bind(this)}
                            placeholder={"Sélectionnez les " + this.props.type}
                            isMulti
                            getOptionValue={(option) => (option['_id'])}
                        />
                    </Grid>
                </Grid>
        )
    }

}
export default withStyles(styles, { withTheme: true })(StepperNewForm)