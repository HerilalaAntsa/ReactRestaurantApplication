
import React, { Component } from 'react';
import { Stepper, Typography, Button, Step, StepButton, Grid } from '@material-ui/core';
import StepperNewForm from './StepperNewForm';

class StepperNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: {},
      horsdoeuvre: {},
      plat: {},
      dessert: {},
    }
  }
  getSteps() {
    return ['Choix de l\'Hors d\'oeuvre', 'Choix du Plat', 'Choix du Dessert'];
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <StepperNewForm
          suggestion={this.props.horsdoeuvre}
          name="horsdoeuvre"
          label="Que choisiriez-vous comme hors d'oeuvre ?"
          handleRadioSelection={this.handleRadioSelection.bind(this)} />;
      case 1:
        return <StepperNewForm
          suggestion={this.props.plat}
          name="plat"
          label="Que voudriez-vous comme plat ?"
          handleRadioSelection={this.handleRadioSelection.bind(this)} />;
      case 2:
        return <StepperNewForm
          suggestion={this.props.dessert}
          name="dessert"
          label="Pour finir, quel sera les desserts ?"
          handleRadioSelection={this.handleRadioSelection.bind(this)}
          />;
      default:
        return '&Eacute;tape inconnue';
    }
  }

  handleNext() {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      const steps = this.getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      activeStep,
      completed,
    });
  }

  handleBack() {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }))
  }

  handleReset() {
    this.props.menuState({
      horsdoeuvre: undefined,
      plat: undefined,
      dessert: undefined,
    })
    this.setState({
      activeStep: 0,
      completed: {},
      horsdoeuvre: "",
      plat: "",
      dessert: "",
    });
  }
  handleRadioSelection(e) {
    this.props.menuState({
      [e.target.name]: e.target.value,
    });
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };
  totalSteps() {
    return this.getSteps().length;
  }
  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }
  render() {
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={this.handleStep(index)} completed={this.state.completed[index]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography>
                Vos choix sont enregistrés, vous pouvez enregister ce menu!
                </Typography>
              <Button onClick={this.handleReset.bind(this)}>
                Annuler et reprendre
                </Button>
            </div>
          ) : (
              <Grid container spacing={16}>
                <Grid item>
                  {this.getStepContent(activeStep)}
                </Grid>
                <Grid item>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack.bind(this)}
                  >
                    Retour
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext.bind(this)}
                  >
                    Valider
                  </Button>
                </Grid>
              </Grid>
            )}
        </div>
      </div>
    );
  }
}
export default StepperNew