import React, {Component} from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {

  render() {

    const onSuccess = (payment) => {
      this.props.onSuccess(payment);
    };

    const onCancel = (data) => {
      this.props.transactionCancel(data);
    };

    const onError = (err) => {
      this.props.transactionError(err);
    };

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;

    const client = {
      sandbox: 'AfbWzEYLcabqwh84YPMJ1Dxjx0GiqlIitCS0mRGUj8TxlE2jejO7ovBHxwiHgjaEIWs8NQDXDpgVi2aX',
      production: ''
    };

    return (
        <div>
          <PaypalExpressBtn
              env={env}
              client={client}
              currency={currency}
              total={total}
              onError={onError}
              onCancel={onCancel}
              onSuccess={onSuccess}
              style={{
                size: 'large',
                color: 'blue',
                shape: 'rect',
                label:'checkout'
              }}
          />
        </div>
    );
  }
}

export default Paypal;