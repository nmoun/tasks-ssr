import React from 'react'
import Welcome from 'screens/Welcome'
import {isLoggedIn} from 'service/AuthService'

export default function withAuthentication(WrappedComponent){
  const WithAuthentication = ( props ) => {
    if(isLoggedIn()){
      return <WrappedComponent {...props} />
    } else {
      return <Welcome />
    }
  };

  return WithAuthentication
}

