import React, {Component} from 'react';
import { connect } from "react-redux";
import {getProductDetail, clearProductDetail} from "../../store/actions/product_actions";
import PageTop from "../../utils/page_top";
import ProdNfo from "./prodNFO";
import ProdImg from "./prodIMG";

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

  addToCarthandler = (id) => {};

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
                    addToCart={this.addToCarthandler}
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