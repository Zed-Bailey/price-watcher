import React from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'


export default function Signup(props) {
  const { changeLoginStatus } = props
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signupPressed, setSignupPressed] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const  handleEmailInput = (event) => {
    event.persist();
    setEmail(event.target.value);
  }

  const  handlePasswordInput = (event) => {
    event.persist();
    setPassword(event.target.value);
  }

  const handleSuccessfulLogin = () => {
    localStorage.setItem("isAuthenticated", true);
    changeLoginStatus(true);
    window.location.href = "/home";
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    event.persist()

    // this.setState({loginPressed: true})
    setSignupPressed(true);
    // base64 encode the data
    var joined = email + ':' + password
    var b64 = btoa(joined)
    // try to log user in
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        'Authorization': b64
      },
      credentials: 'include'
    })
    .then(async (response) => {
      if (response.ok) {
        handleSuccessfulLogin();
      } else {
        setSignupPressed(false);
        let data = await response.json()
        console.log(data.error);
        setErrorMessage(data.error);
      }
    })
   
  }

    // TODO fix error messages not showing above login button
  return (
    <Container maxWidth="sm" sx={{marginTop:5}}>
      <Typography variant='h2' sx={{marginBottom: 5}}>Signup</Typography>
      <form onSubmit={handleSubmit}> 
        <Stack spacing={5}>
          <TextField  label="email" variant="outlined" onChange={handleEmailInput} required type='email'/>
          <TextField  label="password" variant="outlined" onChange={handlePasswordInput} type='password' required/>
        </Stack>
        <br/>
        <Typography variant='body2' color='red' >{errorMessage}</Typography>
        <br></br>
        <LoadingButton loading={signupPressed} variant="outlined" type='submit'>Sign up</LoadingButton>
      </form>
    </Container>
  );
}
