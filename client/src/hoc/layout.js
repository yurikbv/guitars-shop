import React, {Component} from 'react';
import { connect } from "react-redux";
import Header from "../components/Header_footer/Header";
import Footer from "../components/Header_footer/Footer";
import {getSiteData} from "../store/actions/site_actions";

class Layout extends Component {

  componentDidMount() {
    if (Object.keys(this.props.site).length === 0){
      this.props.dispatch(getSiteData());
    }
  }

  render() {
    return (
        <div>
          <Header/>
          <div className="page_container">
            {this.props.children}
          </div>
          <Footer data={this.props.site}/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(Layout);