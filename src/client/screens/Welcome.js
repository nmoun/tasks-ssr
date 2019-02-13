import React from "react";
import { Link } from "react-router-dom";
import Logo from 'assets/logo.svg';
import ThemedButton from 'components/buttons/ThemedButton'

import "scss/custom.scss";

function Welcome() {
  return (<div className="container-all">
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '40vh', overflow: 'hidden' }}>
      <Logo style={{animation: 'App-logo-spin infinite 20s linear',  height: '80px'}} />
    </div>
    <div className="d-flex flex-column justify-content-start align-items-center">
      <div className="p-2">
        <Link to="/login"><ThemedButton text="Dava"/></Link>
      </div>
      <div className="p-2">
        <Link to="/register"><ThemedButton text="Register"/></Link>
      </div>
    </div>
  </div>);
};
export default Welcome;