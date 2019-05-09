import React, {Component} from 'react';
import axios from 'axios';

import FormField from "../../utils/Forms/formField";
import { update, generateData, isFormValid } from "../../utils/Forms/formActions";
class ResetUser extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your Email'
        },
        validation:{
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'reset_password');
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
      axios.post('/api/users/reset_user',dataToSubmit).then((response) => {
        if(response.data.success){
          this.setState({formSuccess: true})
        } else this.setState({formSuccess: false,formError: true});
      })
    } else {
      this.setState({
        formError: true
      })
    }
  };

  render() {

    const { formdata, formError, formSuccess } = this.state;

    return (
        <div className="container">
          <h1>Reset Password</h1>
          <form onSubmit={this.submitForm}>
            <FormField
                id="email"
                formdata={formdata.email}
                change={this.updateForm}
            />
            <div>
              {formSuccess &&
                <div className="form_success">
                  Done, check your email
                </div>
              }
              {formError &&
              <div className="error_label">
                Please check your data
              </div>}

              <button onClick={this.submitForm}>Send email to reset password</button>
            </div>
          </form>
        </div>
    );
  }
}

export default ResetUser;