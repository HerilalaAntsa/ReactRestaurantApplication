import React, { Component } from 'react';
import { Stepper, Typography, Button, Step, StepLabel } from '@material-ui/core';

function getSteps() {
  return ['Choix de l\'Hors d\'oeuvre', 'Choix du Plat', 'Choix du Dessert'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Que prendriez-vous comme Hors d\'oeuvre ?';
    case 1:
      return 'Que voudriez-vous comme Plat ?';
    case 2:
      return 'Pour finir, quel sera votre Dessert ?';
    default:
      return '&Eacute;tape inconnue';
  }
}

class StepperCommande extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      menu: props.menu
    }
  }

  handleNext(){
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack(){
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset(){
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography>
                All steps completed - you&apos;re finished
                </Typography>
              <Button onClick={this.handleReset}>
                Annuler et reprendre
                </Button>
            </div>
          ) : (
              <div>
                <Typography>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                  >
                    Retour
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
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
export default StepperCommande