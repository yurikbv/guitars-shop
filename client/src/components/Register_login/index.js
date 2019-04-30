import React from 'react';
import MyButton from "../../utils/button";
import Login from "./login";

const RegisterLogin = () => {
  return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <h1>New Customers</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae
                consequatur excepturi, iste placeat quas sequi. Ad facilis, repellat. Aspernatur
                blanditiis corporis dolorum harum iure magnam molestias numquam odit, perferendis quaerat
                quasi quibusdam quisquam sequi similique sint suscipit totam voluptates?</p>
              <MyButton
                type="default"
                title="Create an account"
                linkTo="/register"
                addStyles={{
                  margin: '10px 0 0 0'
                }}
              />
            </div>
            <div className="right">
              <h2>Registered customers</h2>
              <p>If you have an account, please log in.</p>
              <Login/>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RegisterLogin;