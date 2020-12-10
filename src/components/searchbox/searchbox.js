import React from 'react';

import './Searchbox.css';

export default class SearchBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          item: '',
          cp: '',
        };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

   handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

   }
  
   handleSubmit(event) {
      event.preventDefault();
      const url = "https://es.wallapop.com/search?keywords="+"{this.state.search}"+"&latitude=41.57133&longitude=2.10903&filters_source=search_box"
      console.log(url);
    }
    
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
           Producto a buscar:
           <input type="text" name="item" value={this.state.item} onChange={this.handleChange} />
         </label>
         <label>
           Código postal:
           <input type="number" name="cp" value={this.state.cp} onChange={this.handleChange} />
         </label>
          <input type="submit" value="Buscar" />
        </form>
      );
    }
  }
  
  