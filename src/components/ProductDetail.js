import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

export default function ProductDetail(props) {
  const { onClose, open, product, onChanged } = props;
  const { ID, item_name, url } = product;

  const [NewName, setName] = React.useState(item_name);
  const [NewUrl, setUrl]  = React.useState(url);

  // TODO add error handling to these responses
  const deleteItem = () => {
    fetch("http://localhost:8080/private/items/" + ID, 
    {
      method:"DELETE",
      credentials: "include"
    }).then(resp => console.log(resp));
    onChanged();
    onClose();
  };

  const updateItem = () => {
    fetch("http://localhost:8080/private/items/" + ID, 
    {
      method:"PATCH",
      credentials: "include",
      body : JSON.stringify({
        "item_name" : NewName,
        "url" : NewUrl
      })
    }).then(resp => console.log(resp));
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
      
      <DialogTitle>Edit</DialogTitle>
        

      <DialogContent >
        <TextField label="Item Name" variant="outlined" defaultValue={NewName} margin='normal' onChange={handleNameUpdate}/>
        <br></br>
        <TextField label="Item URL" variant="outlined" defaultValue={NewUrl} margin='normal' onChange={handleUrlUpdate}/>
      </DialogContent>

      
      <DialogActions >
        <Stack direction="row" justifyContent={'flex-start'} spacing={3} alignItems={'center'}>
          <Button onClick={deleteItem} color='error' variant='outlined'>Delete</Button>
          <Button onClick={updateItem} color='primary' variant='contained'>Update</Button>
        </Stack>
      </DialogActions>


    </Dialog>
  );
}