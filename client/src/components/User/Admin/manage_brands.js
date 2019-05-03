import React, {Component} from 'react';
import { connect } from "react-redux";

import {update, generateData, isFormValid, resetFields} from "../../../utils/Forms/formActions";
import {addBrand, getBrands} from "../../../store/actions/product_actions";
import FormField from "../../../utils/Forms/formField";

class ManageBrands extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formdata:{
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter Brand'
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

  componentDidMount() {
    this.props.dispatch(getBrands());
  }


  showCategoryItems = () => (
      this.props.products.brands &&
        this.props.products.brands.map((brand) => (
            <div className="category_item" key={brand._id}>
              {brand.name}
            </div>
        ))
  );

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'brands');
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formdata,'brands');
    this.setState({
      formSuccess: true,
      formError: false,
      formdata: newFormData
    });

  };

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, 'brands');
    let formIsValid = isFormValid(this.state.formdata, 'brands');

    if(formIsValid){
      this.props.dispatch(addBrand(dataToSubmit, this.props.products.brands))
          .then(response => {
            if(response.payload.success){
              this.resetFieldsHandler();
            } else {
              this.setState({formError: true});
            }
          })
    } else {
      this.setState({
        formError: true
      })
    }
  };

  render() {

    const {formdata, formError, formSuccess} = this.state;

    return (
        <div className="admin_category_wrapper">
          <h1>Brands</h1>
          <div className="admin_two_column">
            <div className="left">
              <div className="brands_container">
                {this.showCategoryItems()}
              </div>
            </div>
            <div className="right">
              <form onSubmit={this.submitForm}>
                <FormField
                    id="name"
                    formdata={formdata.name}
                    change={this.updateForm}
                />
                {formSuccess &&
                <div className="form_success">Success</div>
                }
                {formError &&
                <div className="error_label">
                  Please check your data
                </div>
                }
                <button onClick={this.submitForm}>Add brand</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ManageBrands);