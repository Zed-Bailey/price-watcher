import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';


export default function ProductDetail(props) {
  const { onClose, open } = props;



  return (
    <Dialog onClose={onClose} open={open}>
        <DialogContent>
          <Typography>Hello!</Typography>
        </DialogContent>
        
        <DialogActions>
          <Stack direction="row" spacing={5}>
            <Button onClick={onClose}>Update</Button>
            <Button color='error' variant='outlined'>Delete</Button>
          </Stack>
        </DialogActions>
    </Dialog>
  );
}