import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if (e.target.name === 'submit' && (this.state.name !== '' && this.state.ingredients.length >= 1)) {
      this.clearInputs();
      const orderInfo = {name: this.state.name, ingredients: this.state.ingredients}
      this.props.addOrder(orderInfo)
    } else if (e.target.name === 'submit') {
      this.setState({...this.state, error: 'you must give a name and at least one ingredient to place an order'})
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: [], error: ''});
  }

  handleIngredientChange = (e) => {
    console.log(e.target.name)
    if (!this.state.ingredients.includes(e.target.name)) {
    this.setState({...this.state, ingredients: [...this.state.ingredients, e.target.name]})
  }
  } 

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={this.handleNameChange}
          required
        />
        { ingredientButtons }
        
        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        { this.state.error && <p>{this.state.error}</p>}

        <button onClick={e => this.handleSubmit(e)} name="submit">
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
