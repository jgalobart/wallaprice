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
            resultsVisibility: false,
            loadingVisibility: false,
            };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getPrices(url) {
        try {
            let response = await fetch(url,{
                method: 'GET',
            });
            let data = await response.text();
            data = JSON.parse(data);
            //let data = await JSON.parse(response);
            const priceTable = data.priceTable;
            delete priceTable[""];
            this.setState({
              priceTable : data.priceTable,
              resultsVisibility: true,
              min_sale_price: parseInt(Object.keys(priceTable)[0]),
              max_sale_price: parseInt(Object.keys(priceTable)[Object.keys(priceTable).length-1])
            });
            return priceTable
        } catch(e) {
            console.error(e);
            this.setState({ error: 'Unable to fetch data' });
        }
    }

    async getCoords(cp) {
      try {
          const url = "https://www.wallaprice.com/.netlify/functions/getCoords?cp="+cp;
          let response = await fetch(url,{
              method: 'GET',
          });
          let data = await response.text();
          data = JSON.parse(data);
          //let data = await JSON.parse(response);
          const coords = data.coords;
          this.setState({
            latitude: coords.lat,
            longitude: coords.lon,
          });
          return coords
      } catch(e) {
          console.error(e);
          this.setState({ error: 'Unable to fetch data' });
      }
  }

   handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            resultsVisibility: false,
        });

   }
  
   handleSubmit(event) {
        event.preventDefault();
        if (this.state.item!=="" && this.state.cp.length===5) {
          this.setState({
            loadingVisibility: true,
          })
          this.getCoords(this.state.cp)
          const url = "https://www.wallaprice.com/.netlify/functions/getContent?search="+encodeURI(this.state.item)+"&latitude="+this.state.latitude+"&longitude="+this.state.longitude;
          this.getPrices(url);
        }
        else {
          alert("Revisa los datos");
        }

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

            <Results min_sale_price={this.state.min_sale_price} max_sale_price={this.state.max_sale_price} priceTable={this.state.priceTable} visibility={this.state.resultsVisibility} loading={this.state.loadingVisibility}/>
          </Suspense>
        </>
      );
    }
  }
  
  