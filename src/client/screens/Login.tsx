import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { authenticate, isLoggedIn } from 'service/AuthService'
import ThemedButton from 'components/buttons/ThemedButton'
import Error from 'components/Error'
import { getLabel } from 'labels/LabelProvider'

import 'scss/custom.scss'

class Login extends React.Component<{location: any}, any> {

  private username: React.RefObject<HTMLInputElement>
  private password: React.RefObject<HTMLInputElement>

  constructor(props) {
    super(props)
    this.state = { redirectToReferrer: false }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.username = React.createRef()
    this.password = React.createRef()
  }

  componentDidMount(){
    this.username.current.focus()
  }

  handleSubmit(event) {
    event.preventDefault()
    if(!this.username.current.value || !this.password.current.value){
      this.setState({errorMessage: 'Mandatory credentials'})
      return
    }

    authenticate(this.username.current.value, this.password.current.value)
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
        console.log('err: ' + err)
        this.setState({errorMessage: err.message}) 
      })
  }

  render() {
    const from = this.props.location.state ? this.props.location.state.from : { pathname: '/' }
    const { redirectToReferrer, errorMessage } = this.state
    if (redirectToReferrer)
      return <Redirect
        to={from}
      />
    else
      return (
        <div className="container-all">
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <form onSubmit={this.handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
              <input className="p-2" id="username" name="username" type="text" ref={this.username} placeholder="Username"/>
              <input className="p-2" id="password" name="password" type="password" ref={this.password} placeholder="Password"/>
              <div className="p-2">
                <ThemedButton type="submit" text={getLabel('login.send')}/>
              </div>
            </form>
            <Error message={errorMessage} />
          </div>
        </div>
      )
  }
}

export default Login