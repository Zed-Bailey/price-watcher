import React from 'react';

import Container from '@mui/material/Container';
import ProductCard from '../../components/ProductCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import AddProduct from '../../components/AddProduct';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

// TODO add loading notification
export default function Home() {
    const [products, setProducts] = React.useState([]);
    const [open, setOpen] = React.useState(false);  
    const [isLoading, setIsLoading] = React.useState(true)
    // this will be passed to the dialogs via prop, if an action is taken that
    // will update api, then set this to true and the screen should reload
    const [isChanged, setChanged] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    }

    const handleOpen = () => {
      setOpen((prev) => !prev);
    }
    // this will be passed to the dialogs via prop, if an action is taken that
    // will update api, then this function will be called and the screen should update
    const handleChange = () => {
      setChanged(true);
    }
  
    React.useEffect(() => {
      fetch('http://localhost:8080/private/items', {
        method: "GET",
        credentials : "include"
      })
      .then(resp => resp.json())
      .then(json => {
        setIsLoading(false);
        setProducts(json);
      })

    }, [isLoading]);

    React.useEffect(() => {
      // this will trigger a reload via the useEffect watching it
      setIsLoading(true);
      setChanged(false);
    }, [isChanged]);

    // populate ui with products

    return (
      <div>
        <Container sx={{marginTop:5}}>
          <Button sx={{float: 'right'}} variant="outlined" size='large' endIcon={<Add/>} onClick={handleOpen}>Add</Button>
        </Container>
        
        {isLoading && <Backdrop open={isLoading}> <CircularProgress/> </Backdrop>}

        <Container sx={{marginTop:5}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            products.map(product => {
              const ID  = product.ID;
              return (
                 <Grid item xs={2} sm={4} md={4} key={ID}>
                   <ProductCard productInfo={product} onChanged={handleChange}/>
                 </Grid>
              )
            })
          }
          </Grid>
        </Container>

        <AddProduct 
        onClose={handleClose}
        open={open}
        onChanged={handleChange}
        />
      </div>
    )
}
