import React from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'

class Login extends React.Component {

  // navigation hook
  // navigation = useNavigate();

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



  handleSuccessfulLogin(data) {
    // set returned token as cookie
    var token = data.token;
    var expiry = new Date();
    expiry.setHours = expiry.getHours() + 12;
    document.cookie = "token=" + token + "; expires=" + expiry.toUTCString() + "; SameSite=Strict";
    localStorage.setItem("isAuthenticated", true);
    window.location.href = "/home";
  }

   handleResponse(response) {
     let data = response;
     // if error occurred reject promise, this will then be handled by the catch block
     if(!data.ok) {
      return Promise.reject(data.json().error);
     } else {
       this.handleSuccessfulLogin(data.json());
     }
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
    .then(response => this.handleResponse(response))
    .catch(error => {
      this.setState({error : error, loginPressed: false});
    })
  }

  render() {
    // TODO fix error messages not showing above login button
    return (
      <Container maxWidth="sm" >
        <form onSubmit={this.handleSubmit}> 
          <Stack spacing={5}>
            <TextField  label="email" variant="outlined" onChange={this.handleEmailInput} required type='email'/>
            <TextField  label="password" variant="outlined" onChange={this.handlePasswordInput} type='password' required/>
          </Stack>
          <br/>
          <span><Typography variant='caption' >{this.state.errorMessage}</Typography> </span>

          <LoadingButton loading={this.state.loginPressed} variant="outlined" type='submit'>Login</LoadingButton>
        </form>
      </Container>
    );
  }
}

export default Login;