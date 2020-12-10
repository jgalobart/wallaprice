import React from 'react';

import './Searchbox.css';

export default class SearchBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

   handleChange(event) {
     this.setState({value: event.target.value});
   }
  
   handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
           Producto a buscar:
           <input type="text" value={this.state.value} onChange={this.handleChange} />
         </label>
         <label>
           Código postal:
           <input type="number" value={this.state.value} onChange={this.handleChange} />
         </label>
          <input type="submit" value="Buscar" />
        </form>
      );
    }
  }
  
  