import React from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import LoadingButton from '@mui/lab/LoadingButton'


class Login extends React.Component {

  state = {
    email: "",
    password: "",
    loginPressed: false,
    errorMessage: ""
  };



  handleEmailInput = (event) => {
    event.persist()
    this.setState({
      email: event.target.value,
    })
  }

  handlePasswordInput = (event) => {
    event.persist()
    this.setState({
      password : event.target.value,
    })
  }

  handleRejectedLogin(response) {
    if(!response.ok){
      this.setState({error : response.json.error, loginPressed: false});
    }
    return response
  }

  handleSuccessfulLogin(response) {
    console.log(response.json())
    // set returned token as cookie
    var token = response.json().data.token;
    var expiry = new Date();
    expiry.setHours = expiry.getHours() + 12;
    document.cookie = "token=" + token + "; expires=" + expiry.toUTCString();
  }


  handleSubmit = (event) => {
    event.preventDefault();
    event.persist()

    this.setState({loginPressed: true})
    var joined = this.state.email + ':' + this.state.password
    var b64 = btoa(joined)
    fetch("http://localhost:8080/login", {
      method: "GET",
      headers: {
        'Authorization': b64
      }
    })
    .then(response => this.handleRejectedLogin(response))
    .then(response => this.handleSuccessfulLogin(response))
  }

  render() {
    return (
      <Container maxWidth="sm">
        <form onSubmit={this.handleSubmit}> 
          <Stack spacing={5}>
            <TextField  label="email" variant="outlined" onChange={this.handleEmailInput} required type='email'/>
            <TextField  label="password" variant="outlined" onChange={this.handlePasswordInput} type='password' required/>
          </Stack>
          
          <span>{this.state.errorMessage}</span>

          <LoadingButton loading={this.state.loginPressed} variant="outlined" type='submit'>Login</LoadingButton>
        </form>
      </Container>
    );
  }
}

export default Login;