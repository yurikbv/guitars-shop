import React, {Component} from 'react';
import { connect } from "react-redux";
import PageTop from "../../utils/page_top";
import { getBrands, getWoods, getProductsToShop } from "../../store/actions/product_actions";
import CollapseCheckbox from "../../utils/collapseCheckbox";
import CollapseRadio from "../../utils/collapseRadio";
import { frets, price } from "../../utils/Forms/fixed_categories";

class Shop extends Component {

  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand:[],
      frets:[],
      wood: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());

    this.props.dispatch(getProductsToShop(
        this.state.skip,
        this.state.limit,
        this.state.filters
    ))
  }

  handlePrice = (value) => {
    const data = price;
    let array = [];
    for(let key in data){
      if(data[key]._id === parseInt(value,10)){
        array = data[key].array
      }
    }
    return array;
  };

  handleFilters = (filter, category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filter;

    if(category === 'price'){
      newFilters[category] = this.handlePrice(filter);
    }

    this.setState({filters: newFilters});
  };


  render() {

    const {brands, woods} = this.props.products;

    return (
        <div>
          <PageTop title="Browse products"/>
          <div className="container">
            <div className="shop_wrapper">
              <div className="left">
                <CollapseCheckbox
                  initState={true}
                  title="Brands"
                  list={brands}
                  handleFilres={(filters) => this.handleFilters(filters,'brand')}
                />
                <CollapseCheckbox
                    initState={false}
                    title="Frets"
                    list={frets}
                    handleFilres={(filters) => this.handleFilters(filters,'frets')}
                />
                <CollapseCheckbox
                    initState={false}
                    title="Wood"
                    list={woods}
                    handleFilres={(filters) => this.handleFilters(filters,'wood')}
                />
                <CollapseRadio
                    initState={true}
                    title="Price"
                    list={price}
                    handleFilres={(filters) => this.handleFilters(filters,'price')}
                />
              </div>
              <div className="right">

              </div>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
};

export default connect(mapStateToProps)(Shop);