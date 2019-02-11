import React from 'react'
import { Redirect } from 'react-router-dom'
import { authenticate, isLoggedIn } from 'service/AuthService'
import ThemedButton from 'components/buttons/ThemedButton'
import Error from 'components/Error'

import "scss/custom.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.username.focus()
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.username.value || !this.password.value){
      this.setState({errorMessage: "Mandatory credentials"})
      return;
    }

    authenticate(this.username.value, this.password.value)
      .then((response) => {
        if(response.status === 400){
          response
            .json()
            .then((responseJson) => {
              this.setState({errorMessage: responseJson.message})
            })
        } 

        if (isLoggedIn()) {
          this.setState({ redirectToReferrer: true })
        }
      })
      .catch((err) => {
        console.log("err: " + err)
        this.setState({errorMessage: err.message}) 
      })
  }

  render() {
    const from = this.props.location.state ? this.props.location.state.from : { pathname: '/' }
    const { redirectToReferrer, errorMessage } = this.state;
    if (redirectToReferrer)
      return <Redirect
        to={from}
      />
    else
      return (
        <div className="container-all">
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <form onSubmit={this.handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
              <input className="p-2" id="username" name="username" type="text" ref={el => {this.username = el}} placeholder="Username"/>
              <input className="p-2" id="password" name="password" type="password" ref={el => {this.password = el}} placeholder="Password"/>
              <div className="p-2">
                <ThemedButton type="submit" text="Send"/>
              </div>
            </form>
            <Error message={errorMessage} />
          </div>
        </div>
      );
  }
}

export default Login