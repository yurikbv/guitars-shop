import React, {Component} from 'react';
import { connect } from "react-redux";
import {getProductDetail, clearProductDetail} from "../../store/actions/product_actions";
import PageTop from "../../utils/page_top";
import ProdNfo from "./prodNFO";
import ProdImg from "./prodIMG";
import {addToCart} from "../../store/actions/user_actions";

class ProductPage extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id))
        .then(response => {
          if(!this.props.products.productDetail) {
            this.props.history.push('/');
          }
        })
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCartHandler = (id) => {
    this.props.dispatch(addToCart(id));
  };

  render() {

    const { productDetail } = this.props.products;

    return (
        <div>
          <PageTop title="Product detail"/>
           <div className="container">
             {productDetail &&
              <div className="product_detail_wrapper">
                <div className="left">
                  <div style={{width: '500px'}}>
                    <ProdImg
                      detail={productDetail}
                    />
                  </div>
                </div>
                <div className="right">
                  <ProdNfo
                    detail={productDetail}
                    addToCart={this.addToCartHandler}
                  />
                </div>
              </div>
             }
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

export default connect(mapStateToProps)(ProductPage);