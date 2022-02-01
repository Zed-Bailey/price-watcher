import * as React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';


import ProductDetail from './ProductDetail';
  
// https://mui.com/components/click-away-listener/
// https://mui.com/components/backdrop/


export default function ProductCard(props) {
    const [open, setOpen] = React.useState(false);
    
    
    const handleOpen = () => {
      setOpen((prev) => !prev);
    }

    const handleClose = () => {
      setOpen(false);
    }
    // {new Date(last_check).toUTCString()}
    const {productInfo, onChanged} = props;
    const { item_name, url, last_check, curr_price } = productInfo;

    return(
      <React.Fragment>
          <Box sx={{minWidth: 300}}>
          <Card variant='outlined'>
            <CardContent>
              <Typography variant='h5' gutterBottom align='left'>{item_name}</Typography>
              <Typography variant='h5' gutterBottom align='left'>$ {curr_price}</Typography>
              <Typography color="text.secondary" component="div" align='left'>last checked: {last_check}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={handleOpen}>Details</Button>
              <a target="_blank" href={url} rel="noreferrer"><Button>Vist</Button></a>
            </CardActions>
          </Card>
        </Box>

        <ProductDetail 
          onClose={handleClose}
          open={open}
          product={props.productInfo}
          onChanged={onChanged}
        />
      </React.Fragment>
    )
  }

// backdrop, click away listener and a card will form the product detail view
