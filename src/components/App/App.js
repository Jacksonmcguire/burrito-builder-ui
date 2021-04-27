import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder, removeOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
    .then(data => {
      this.setState({orders: data.orders})
    })
    .catch(err => console.error('Error fetching:', err));  }



  addOrder = (orderInfo) => {
    postOrder(orderInfo)
    .then(() => getOrders()
    .then(data => {
      this.setState({orders: data.orders})
    })
    .catch(err => console.error('Error fetching:', err))
    );
  }

  deleteOrder = (id) => {
    removeOrder(id)
    .then(() => getOrders()
    .then(data => {
      this.setState({orders: data.orders})
    })
    .catch(err => console.error('Error fetching:', err))
    )
  }


  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders} deleteOrder={this.deleteOrder}/>
      </main>
    );
  }
}


export default App;
