import React, {Component} from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';

import FormField from "../../utils/Forms/formField";
import { update, generateData, isFormValid } from "../../utils/Forms/formActions";

class ResetPassword extends Component {

  state = {
    resetToken: '',
    formError: false,
    formSuccess: false,
    formErrorMessage: '',
    formdata: {
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter new password'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm new password'
        },
        validation:{
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({resetToken})
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'register');
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  };

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, 'reset_password');
    let formIsValid = isFormValid(this.state.formdata, 'reset_password');
    if(formIsValid){
      axios.post('/api/users/reset_password',{
        ...dataToSubmit,
        resetToken: this.state.resetToken
      }).then(response => {
        if(!response.data.success) {
          this.setState({
            formError: true,
            formErrorMessage: response.data.message
          })
        } else {
          this.setState({formError: false, formSuccess: true});
          setTimeout(() => {
            this.props.history.push('/register_login');
          }, 3000)
        }
      })
    } else {
      this.setState({
        formError: true
      })
    }
  };

  render() {

    const { formdata, formError, formSuccess, formErrorMessage } = this.state;

    return (
        <div className="container">
          <form onSubmit={this.submitForm}>
            <h2>Change password</h2>
            <div className="form_block_two">
              <div className="block">
                <FormField
                    id="password"
                    formdata={formdata.password}
                    change={this.updateForm}
                />
              </div>

              <div className="block">
                <FormField
                    id="confirmPassword"
                    formdata={formdata.confirmPassword}
                    change={this.updateForm}
                />
              </div>
            </div>
            <div>
              {formError &&
              <div className="error_label">
                {formErrorMessage}
              </div>
              }
              <button onClick={this.submitForm}>Change</button>
            </div>
          </form>
          <Dialog open={formSuccess}>
            <div className="dialog_alert">
              <div>Alright !!!</div>
              <div>Your password was reset...You will be redirected.</div>
            </div>
          </Dialog>
        </div>
    );
  }
}

export default ResetPassword;