import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


class ProductCard extends React.Component {

  render() {
    return(
      <Card variant='outlined' sx={{ minWidth: 275, marginBottom: 10}} key={this.props.ID}>
        <CardContent>
          <Typography variant='h5' gutterBottom>{this.props.item_name}</Typography>
          <Typography color="text.secondary" component="div">last checked: {new Date(this.props.lastChecked).toUTCString()}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default ProductCard;