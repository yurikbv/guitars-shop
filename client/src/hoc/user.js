import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const links = [
  {
    name:'My account',
    linkTo:'/user/dashboard'
  },
  {
    name:'User Information',
    linkTo:'/user/user_profile'
  },
  {
    name:'My Cart',
    linkTo:'/user/cart'
  },
  ];

const admin = [
  {
    name:'Site info',
    linkTo:'/admin/site_info'
  },
  {
    name:'Add product',
    linkTo:'/admin/add_product'
  },
  {
    name:'Manage categories',
    linkTo:'/admin/manage_categories'
  }
];

const UserLayout = (props) => {

  const generateLinks = links => (
      links.map((link, i) => (
          <Link to={link.linkTo} key={i}>{link.name}</Link>
      ))
  );

  return (
      <div className="container">
        <div className="user_container">
          <div className="user_left_nav">
            <h2>My Account</h2>
            <div className="links">
              {generateLinks(links)}
            </div>
            {props.user.isAdmin &&
              <div>
                <h2>Admin</h2>
                <div className="links">
                  {generateLinks(admin)}
                </div>
              </div>
            }
          </div>
          <div className="user_right">
            {props.children}
          </div>
        </div>
      </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user.userData
  }
}

export default connect(mapStateToProps)(UserLayout);