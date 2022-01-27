import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

export default function AddProduct(props) {
  const { onClose, open, onChanged } = props;
  const [url, setUrl] = React.useState("");
  const [name, setName] =  React.useState("");

  const createNewItem = () => {
    fetch(
      "http://localhost:8080/private/items", {
        method: "POST",
        credentials : "include",
        body: JSON.stringify({
          "url" : url,
          "item_name": name
        })
      }
    ).then(resp => console.log(resp.json()));
    onChanged();
    onClose();
  };

  const handleNameUpdate = (e) =>  {
    setName(e.target.value);
  }

  const handleUrlUpdate = (e) => {
    setUrl(e.target.value);
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Create</DialogTitle>
        <DialogContent >
          <TextField label="Item Name" variant="outlined" defaultValue={name} margin='normal' onChange={handleNameUpdate}/>
          <br></br>
          <TextField label="Item URL" variant="outlined" defaultValue={url} margin='normal' onChange={handleUrlUpdate}/>
        </DialogContent>
  
        
        <DialogActions >
          <Stack direction="row" justifyContent={'flex-start'} spacing={3} alignItems={'center'}>
            <Button onClick={createNewItem} color='primary' variant='contained'>Create</Button>
          </Stack>
        </DialogActions>
  
    </Dialog>
  );
}