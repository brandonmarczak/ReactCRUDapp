import React, { Component } from 'react';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import './App.css';
import {Button, Jumbotron} from 'react-bootstrap';

const products = [
  {
    name: "Apple",
    price: 1.55
  },
  {
    name: "Orange",
    price: 1.25
  }
];

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };
    
    this.onDelete= this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
  
  componentWillMount() {
   const products =  this.getProducts();
   
   this.setState({ products });
  }
  
  getProducts() {
    return this.state.products;
  }
  
  onAdd(name, price) {
    const products = this.getProducts();
    
    products.push({
      name,
      price
    });
    this.setState({ products });
  }
  
  onDelete(name){
    const products = this.getProducts();
    
    const filteredProducts = products.filter(product => {
      return product.name !== name;
    });
    this.setState({ products: filteredProducts });
  }
  
  onEditSubmit(name, price, originalName) {
    let products = this.getProducts();
    
    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }
      return product;
    });
    this.setState({ products });
  }
  
  onClick() {
    alert("Ah! You clicked me!");
  }
  
  render() {
    return (
      <div className="App">
      <Jumbotron>
  <h1>Hello, world!</h1>
  <p>
    This is a simple React CRUD Application, simply ADD, EDIT, or REMOVE a product!
  </p>
  <p>
    <Button onClick={this.onClick} bsStyle="primary">Click it!</Button>
  </p>
</Jumbotron>;
      
      <AddProduct onAdd={this.onAdd} />
      {
        this.state.products.map(product => {
          return (
          <ProductItem key={product.name} {...product} onDelete={this.onDelete}  onEditSubmit={this.onEditSubmit}/>
          );
        })
      }
      </div>
    );
  }
}

export default App;