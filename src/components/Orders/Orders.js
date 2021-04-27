import React from 'react';
import './Orders.css';

const Orders = ({orders, deleteOrder}) => {
  

const orderEls = orders.map((order) => {
    const handleDelete = () => { 
      deleteOrder(order.id)
    }
    return (
      <div className="order" key={order.name + order.ingredients[0]}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li key={'ingredient' + index}>{ingredient}</li>
          })}
        </ul>
        <button onClick={handleDelete}>🗑</button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;