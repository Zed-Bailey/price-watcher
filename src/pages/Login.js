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
    localStorage.setItem("isAuthenticated", true);
    this.props.loginHandler(true);
    window.location.href = "/home";
  }

   handleResponse(response) {
     let data = response;
     // if error occurred reject promise, this will then be handled by the catch block
     if(!data.ok) {
       console.log(data.json());
      return Promise.reject(data.json().error);
     } else {
       this.handleSuccessfulLogin(data.json());
     }
   }


  handleSubmit = (event) => {
    event.preventDefault();
    event.persist()

    this.setState({loginPressed: true})
    // base64 encode the data
    var joined = this.state.email + ':' + this.state.password
    var b64 = btoa(joined)
    // try to log user in
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        'Authorization': b64
      },
      credentials: 'include'
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
          <Typography variant='caption' >{this.state.errorMessage}</Typography>

          <LoadingButton loading={this.state.loginPressed} variant="outlined" type='submit'>Login</LoadingButton>
        </form>
      </Container>
    );
  }
}

export default Login;