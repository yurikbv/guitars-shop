import React, {Component} from 'react';
import UserLayout from "../../../hoc/user";
import { connect } from "react-redux";

import {update, generateData, isFormValid, populateOptionFields, resetFields} from "../../../utils/Forms/formActions";
import { getBrands, getWoods, addProduct, clearProduct } from "../../../store/actions/product_actions";
import FormField from "../../../utils/Forms/formField";
import FileUpload from "../../../utils/Forms/fileUpload";

class AddProduct extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formdata:{
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product Name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter Name'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
    },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter Description'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter Price'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product Brand',
          name: 'brand_input',
          options: []
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [
            {key: true, value:'Yes'},
            {key: false, value:'No'}
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available, in stock',
          name: 'available_input',
          options: [
            {key: true, value:'Yes'},
            {key: false, value:'No'}
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood material',
          name: 'wood_input',
          options: []
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'Frets',
          name: 'frets_input',
          options: [
            {"key": 20, "value": 20},
            {"key": 21, "value": 21},
            {"key": 22, "value": 22},
            {"key": 24, "value": 24}
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            {key: true, value:'Public'},
            {key: false, value:'Hidden'}
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      images:{
        value: [],
        validation:{
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showLabel: false
      }
    }
  };

  componentDidMount() {
    const formdata = this.state.formdata;

    this.props.dispatch(getBrands()).then(() => {
      const newFormdata = populateOptionFields(formdata, this.props.products.brands, 'brand');
      this.updateFields(newFormdata);
    });

    this.props.dispatch(getWoods()).then(() => {
      const newFormdata = populateOptionFields(formdata, this.props.products.woods, 'wood');
      this.updateFields(newFormdata);
    });
  }

  updateFields = (formdata) => {
    this.setState({formdata})
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'products');
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata,'products');
    this.setState({
      formSuccess: true,
      formError: false,
      formdata: newFormData
    });

    setTimeout(() => {
      this.setState({formSuccess: false});
      this.props.dispatch(clearProduct());
    },3000);
  };

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, 'products');
    let formIsValid = isFormValid(this.state.formdata, 'products');

    if(formIsValid){
      this.props.dispatch(addProduct(dataToSubmit))
          .then(() => {
            if (this.props.products.addProduct.success) {
              this.resetFieldHandler();
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

  imagesHandler = (images) => {
    const newFormdata = {...this.state.formdata};
    newFormdata['images'].value = images;
    newFormdata['images'].valid = true;
    this.setState({formdata: newFormdata});
  };

  render() {

    const {formdata, formError, formSuccess} = this.state;

    return (
        <UserLayout>
          <h1>Add product</h1>
          <form onSubmit={this.submitForm}>

            <FileUpload
              imagesHandler={this.imagesHandler}
              reset={formSuccess}
            />

            <FormField
                id="name"
                formdata={formdata.name}
                change={this.updateForm}
            />

            <FormField
                id="description"
                formdata={formdata.description}
                change={this.updateForm}
            />

            <FormField
                id="price"
                formdata={formdata.price}
                change={this.updateForm}
            />
            <div className="form_devider"/>

            <FormField
                id="brand"
                formdata={formdata.brand}
                change={this.updateForm}
            />

            <FormField
                id="shipping"
                formdata={formdata.shipping}
                change={this.updateForm}
            />

            <FormField
                id="available"
                formdata={formdata.available}
                change={this.updateForm}
            />

            <div className="form_devider"/>

            <FormField
                id="wood"
                formdata={formdata.wood}
                change={this.updateForm}
            />

            <FormField
                id="frets"
                formdata={formdata.frets}
                change={this.updateForm}
            />

            <div className="form_devider"/>

            <FormField
                id="publish"
                formdata={formdata.publish}
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
            <button onClick={this.submitForm}>Add product</button>
          </form>
        </UserLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AddProduct);