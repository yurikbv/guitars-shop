import React, {Component} from 'react';
import { connect } from "react-redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';



import UserLayout from "../../hoc/user";
import {getCartItems, onSuccessBuy, removeCartItem} from "../../store/actions/user_actions";
import UserProductBlock from "../../utils/User/product_block";
import Paypal from "../../utils/paypal";

class UserCart extends Component {

  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user.userData;

    if( user.cart && user.cart.length > 0) {

      user.cart.forEach(item => {
        cartItems.push(item.id);
      });

      this.props.dispatch(getCartItems(cartItems, user.cart))
          .then(() => {
            if(this.props.user.cartDetail.length > 0) {
              this.calculateTotal(this.props.user.cartDetail);
            }
          })
    }
  }

  calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.forEach(cart => {
      total += parseInt(cart.price,10) * cart.quantity;
    });
    this.setState({
      showTotal: true,
      total
    })
  };

  removeFromCart = id => {
    this.props.dispatch(removeCartItem(id))
        .then(() => {
          if(this.props.user.cartDetail.length <= 0){
            this.setState({showTotal: false})
          } else this.calculateTotal(this.props.user.cartDetail);
        });
  };

  showNoItemMessage = () => (
      <div className="cart_no_items">
        <FontAwesomeIcon icon={faFrown}/>
        <div>You have no items</div>
      </div>
  );

  transactionError = err => {
    console.log(JSON.stringify(err));
  };

  transactionCanceled = data => {
    console.log(JSON.stringify(data));
  };

  transactionSuccess = (data) => {
    this.props.dispatch(onSuccessBuy({
      cartDetail: this.props.user.cartDetail,
      paymentData: data
    })).then(() => {
      if(this.props.user.successBuy){
        this.setState({
          showTotal: false,
          showSuccess: true
        });
      }
    });
  };

  render() {

    const {showTotal, total, showSuccess} = this.state;

    return (
        <UserLayout>
          <div>
            <h1>My Cart</h1>
            <div className="user_cart">
              <UserProductBlock
                  products={this.props.user}
                  type="cart"
                  removeItem={this.removeFromCart}
              />
              {showTotal ?
                  <div>
                    <div className="user_cart_sum">
                      <div>
                        Total amount: $ {total}
                      </div>
                    </div>
                  </div>
                  : showSuccess
                      ? <div className="cart_success">
                        <FontAwesomeIcon icon={faSmile}/>
                        <div>Your Order is now compete</div>
                      </div>
                      : this.showNoItemMessage()
              }
            </div>
            {showTotal &&
              <div className="paypal_button_container">
                <Paypal
                    toPay={total}
                    transactionError={this.transactionError}
                    transactionCancel={this.transactionCanceled}
                    onSuccess={this.transactionSuccess}
                />
              </div>
            }
          </div>
        </UserLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserCart);