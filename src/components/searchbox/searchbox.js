import React, { Suspense } from 'react';
import Results from '../results/results';

import './Searchbox.css';

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            cp: '',
            min_sale_price: 0,
            max_sale_price: 10000,
            latitude: 40.43786,
            longitude: -2.12345,
            priceTable: [],
            };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getPrices(url) {
        console.log(url);
        try {
            let response = await fetch(url,{
                method: 'GET',
                mode: 'no-cors',
                /*headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },*/
            });
            let data = await response.text();
            console.log(data);
            console.log("data");
        } catch(e) {
            console.error(e);
            this.setState({ error: 'Unable to fetch artists' });
        }
    }

   handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });

   }
  
   handleSubmit(event) {
        event.preventDefault();
        const latitude="40.43786";
        const longitude="-3.81962";
        const url = "https://es.wallapop.com/search?keywords="+this.state.item+"&latitude="+latitude+"&longitude="+longitude+"&filters_source=search_box"
        this.getPrices(url);
        const priceTable = {
          "10": 1,
          "25": 2,
          "50": 1,
          "1700": 2,
          "1800": 1,
          "2000": 1
        }
        this.setState({
            priceTable : priceTable,
            min_sale_price: parseInt(Object.keys(priceTable)[0]),
            max_sale_price: parseInt(Object.keys(priceTable)[Object.keys(priceTable).length-1])
        });
    }
    
    render() {
      return (
        <>
          <Suspense fallback={<div>Loading...</div>}>
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

            <Results min_sale_price={this.state.min_sale_price} max_sale_price={this.state.max_sale_price} priceTable={this.state.priceTable} />
          </Suspense>
        </>
      );
    }
  }
  
  