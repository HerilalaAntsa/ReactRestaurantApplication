import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepperCommandeForm from './StepperCommandeForm';
import { StepButton } from '@material-ui/core';

class StepperCommande extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      menu: props.menu,
      commande: {},
      completed: {},
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
        refFunction={(input)=>this.horsdoeuvre = input}/>;
    case 1:
      return <StepperCommandeForm
        name="plat"
        label="Que voudriez-vous comme plat ?"
        option={this.state.menu.plat}
        refFunction={(input)=> this.plat = input} />;
    case 2:
      return <StepperCommandeForm
        name="dessert"
        label="Pour finir, quel sera votre dessert ?"
        option={this.state.menu.dessert}
        refFunction={(input)=> this.dessert = input} />;
    default:
      return '&Eacute;tape inconnue';
  }
}

  totalSteps = () => this.getSteps().length;

  handleNext (){
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = this.getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleBack () {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleStep (step) {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

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
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton onClick={this.handleStep(index)} completed={this.state.completed[index]}>
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography>
                Vos choix sont enregistrés, vous pouvez soumettre ce menu à la commande !
                </Typography>
              <Button onClick={this.handleReset.bind(this)}>
                Annuler et reprendre
                </Button>
            </div>
          ) : (
              <div>
                {this.getStepContent(activeStep)}
                <div>
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
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default StepperCommande;