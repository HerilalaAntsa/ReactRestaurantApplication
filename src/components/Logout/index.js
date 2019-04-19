import React, { Component } from 'react';
import { app } from '../../constants/base';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Dialog, DialogContent } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { Redirect } from 'react-router-dom'

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loading: false
    }
  }
  toggleLoading(newloading) {
    this.setState({
      loading: newloading,
    });
  }

  componentWillMount() {
    this.toggleLoading(true);
    app.auth().signOut().then((user) => {
      this.setState({ redirect: false });

      this.props.enqueueSnackbar("Déconnecté",
        {
          variant: 'default',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      this.toggleLoading(false);
    })
  }

  render() {
    return (
      <div>
        <Dialog open={this.state.loading} onClose={() => { }} aria-labelledby="Déconnexion...">
          <DialogContent>
            <CircularProgress size={68} />
          </DialogContent>
        </Dialog>
        <Redirect to='/' />
      </div>
    )
  }
}

export default withSnackbar(Logout);