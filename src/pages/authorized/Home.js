import React from 'react';

import Container from '@mui/material/Container';
import ProductCard from '../../components/ProductCard';
import Grid from '@mui/material/Grid';

class Home extends React.Component {
  
  state = {
    products : []
  };
  
  componentDidMount() {
  
    // query api for products
    fetch('http://localhost:8080/private/items', {
      method: "GET",
      credentials :"include"
    })
    .then(resp => resp.json())
    .then(json => {
      console.log(json);
      this.setState({products : json});
    })

    // populate ui with products
  }

  render() {
    return (

      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          this.state.products.map(product => {
            const { ID, item_name, url, last_check, curr_price } = product;
            return (
               <Grid item xs={2} sm={4} md={4} key={ID}>
                 <ProductCard product={product}/>
               </Grid>
            )
          })
        }
        </Grid>
      </Container>
    )
  }
}

export default Home;