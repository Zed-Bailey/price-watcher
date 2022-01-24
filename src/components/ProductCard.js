import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

class ProductCard extends React.Component {

  render() {
    const { ID, item_name, url, last_check, curr_price } = this.props.product;
    
    return(
      <React.Fragment>
        <Box sx={{minWidth: 300}}>
          <Card variant='outlined'>
            <CardContent>
              <Typography variant='h5' gutterBottom align='left'>{item_name}</Typography>
              <Typography variant='h5' gutterBottom align='left'>$ {curr_price}</Typography>
              <Typography color="text.secondary" component="div" align='left'>last checked: {new Date(last_check).toUTCString()}</Typography>
            </CardContent>
            <CardActions>
              <Button>Details</Button>
              <a target="_blank" href={url} rel="noopener"><Button>Vist</Button></a>
            </CardActions>
          </Card>
        </Box>
      </React.Fragment>
    )
  }
}


// backdrop, click away listner and a card will form the product detail view
export default ProductCard;