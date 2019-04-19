
import React, { Component } from 'react';
import { Stepper, Typography, Button, Step, StepButton, Grid } from '@material-ui/core';
import StepperCommandeForm from './StepperCommandeForm';

class StepperCommande extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      menu: props.menu,
      completed: {},
      horsdoeuvre: "",
      plat: "",
      dessert: "",
    }
  }
  getSteps() {
    return ['Choix de l\'Hors d\'oeuvre', 'Choix du Plat', 'Choix du Dessert'];
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <StepperCommandeForm
          name="horsdoeuvre"
          label="Que prendriez-vous comme hors d'oeuvre ?"
          option={this.state.menu.horsdoeuvre}
          handleRadioSelection={this.handleRadioSelection.bind(this)}
          selected={this.state.horsdoeuvre} />;
      case 1:
        return <StepperCommandeForm
          name="plat"
          label="Que voudriez-vous comme plat ?"
          option={this.state.menu.plat}
          handleRadioSelection={this.handleRadioSelection.bind(this)}
          selected={this.state.plat} />;
      case 2:
        return <StepperCommandeForm
          name="dessert"
          label="Pour finir, quel sera votre dessert ?"
          option={this.state.menu.dessert}
          handleRadioSelection={this.handleRadioSelection.bind(this)}
          selected={this.state.dessert} />;
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
    this.props.commandeState({
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
    this.props.commandeState({
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
                Vos choix sont enregistrés, vous pouvez soumettre ce menu à la commande !
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
export default StepperCommande