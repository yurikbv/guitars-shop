import React, {Component} from 'react';
import { connect } from "react-redux";
import FormField from "../../utils/Forms/formField";
import {update, generateData, isFormValid, populateFields} from "../../utils/Forms/formActions";
import {clearUpdateUser, updateUserProfile} from "../../store/actions/user_actions";

class UpdatePersonalInfo extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your Name'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter your Last Name'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
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

  componentDidMount() {
    const newformData = populateFields(this.state.formdata,this.props.user.userData);
    this.setState({
      formdata: newformData
    })
  }


  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'update_user');
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  };

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, 'update_user');
    let formIsValid = isFormValid(this.state.formdata, 'update_user');

    if(formIsValid){
     this.props.dispatch(updateUserProfile(dataToSubmit))
         .then(() => {
           if(this.props.user.updateUser.success){
             this.setState({formSuccess: true}, () => {
               setTimeout(() => {
                 this.props.dispatch(clearUpdateUser());
                 this.setState({formSuccess: false})
               },3000)
             })
           }
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
        <div>
          <form onSubmit={this.submitForm}>
            <h2>Personal information</h2>
            <div className="form_block_two">
              <div className="block">
                <FormField
                    id="name"
                    formdata={formdata.name}
                    change={this.updateForm}
                />
              </div>

              <div className="block">
                <FormField
                    id="lastname"
                    formdata={formdata.lastname}
                    change={this.updateForm}
                />
              </div>
            </div>
            <div>
              <FormField
                id="email"
                formdata={formdata.email}
                change={this.updateForm}
            />
            </div>
            <div>
              {formSuccess &&
                <div className="form_success">
                  Success
                </div>
              }
              {formError &&
              <div className="error_label">
                Please check your data
              </div>
              }
              <button onClick={this.submitForm}>Update personal info</button>
            </div>
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UpdatePersonalInfo);