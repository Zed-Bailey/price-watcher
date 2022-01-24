import React from 'react';

import Container from '@mui/material/Container';
import ProductCard from '../../components/ProductCard';

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
      <br></br>

      {
        this.state.products.map(product => {
          const { ID, item_name, url, last_check, curr_price } = product;
          return (
             <ProductCard item_name={item_name} ID={ID} lastChecked={last_check}/>
          )
        })
      }
      </Container>
    )
  }
}

export default Home;