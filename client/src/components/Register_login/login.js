import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FormField from "../../utils/Forms/formField";
import { update, generateData, isFormValid } from "../../utils/Forms/formActions";
import { loginUser } from '../../store/actions/user_actions';

class Login extends Component {

  state = {
    formError: false,
    formSuccess: '',
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
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your Password'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'login');
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  };

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login');

    if(formIsValid){
      this.props.dispatch(loginUser(dataToSubmit))
          .then(response => {
            if(response.payload.loginSuccess){
              console.log(response.payload);
              this.props.history.push('/user/dashboard')
            } else {
              this.setState({formError: true})
            }
          })
      ;
    } else {
      this.setState({
        formError: true
      })
    }
  };

  render() {

    const { formdata, formError } = this.state;

    return (
        <div className="signin_wrapper">
          <form onSubmit={this.submitForm}>
            <FormField
                id="email"
                formdata={formdata.email}
                change={this.updateForm}
            />

            <FormField
                id="password"
                formdata={formdata.password}
                change={this.updateForm}
            />
            {formError &&
              <div className="error_label">
                Please check your data
              </div>
            }
            <button onClick={this.submitForm}>Log in</button>
          </form>
        </div>
    );
  }
}

export default connect()(withRouter(Login));