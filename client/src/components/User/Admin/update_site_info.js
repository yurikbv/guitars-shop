import React, {Component} from 'react';
import { connect } from "react-redux";

import FormField from "../../../utils/Forms/formField";
import { update, generateData, isFormValid, populateFields } from "../../../utils/Forms/formActions";
import {getSiteData, updateSiteData} from "../../../store/actions/site_actions";

class UpdateSiteInfo extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Address',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter the site address'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'Working hours',
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter the site working hours'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'Phone number',
          name: 'phone_input',
          type: 'text',
          placeholder: 'Enter the phone number'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Shop Email',
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter the site email'
        },
        validation:{
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      }
    }
  };

  componentDidMount() {
    this.props.dispatch(getSiteData()).then(() => {
      const newFormData = populateFields(this.state.formdata, this.props.site[0]);
      this.setState({formdata: newFormData})
    })
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
    let dataToSubmit = generateData(this.state.formdata, 'update_user');
    let formIsValid = isFormValid(this.state.formdata, 'update_user');

    if(formIsValid){
     this.props.dispatch(updateSiteData(dataToSubmit)).then(()=> {
       this.setState({formSuccess: true}, () => {
         setTimeout(() => {this.setState({formSuccess: false})},2000)
       })
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
            <h1>Site Info</h1>
            <FormField
                id="address"
                formdata={formdata.address}
                change={this.updateForm}
            />
            <FormField
                id="hours"
                formdata={formdata.hours}
                change={this.updateForm}
            />
            <FormField
                id="phone"
                formdata={formdata.phone}
                change={this.updateForm}
            />
            <FormField
                id="email"
                formdata={formdata.email}
                change={this.updateForm}
            />
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
              <button onClick={this.submitForm}>Update site info</button>
            </div>
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    site: state.site.siteData
  }
}

export default connect(mapStateToProps)(UpdateSiteInfo);