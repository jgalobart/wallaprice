import React, { Suspense } from 'react';
import Results from '../results/results';

import './Searchbox.css';

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        var item = urlParams.get('search') ? urlParams.get('search') : '';
        var cp = urlParams.get('cp') ? urlParams.get('cp') : '';
        var min_sale_price = urlParams.get('min_sale_price') ? urlParams.get('min_sale_price') : 0;
        var max_sale_price = urlParams.get('max_sale_price') ? urlParams.get('max_sale_price') : 100000;
        var loading = min_sale_price>0 ? true : false;
        this.state = {
            item: item,
            cp: cp,
            min_sale_price: min_sale_price,
            max_sale_price: max_sale_price,
            latitude: 40.43786,
            longitude: -2.12345,
            priceTable: [],
            resultsVisibility: false,
            loadingVisibility: loading,
            cards:[],
            };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        if (min_sale_price > 0) {
          this.fetchResults()
        }

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
            //order cards by price
            const cards = data.cards.sort((a, b) => (parseFloat(a.price) > parseFloat(b.price)) ? 1 : -1)

            this.setState({
              priceTable : data.priceTable,
              cards : cards,
              resultsVisibility: true,
              min_sale_price: parseInt(Object.keys(priceTable)[0]),
              max_sale_price: parseInt(Object.keys(priceTable)[Object.keys(priceTable).length-1])
            });
            return priceTable
        } catch(e) {
            console.error(e);
            this.setState({ error: 'Unable to fetch data' });
            return false
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
            loadingVisibility: false,
            min_sale_price: 0,
            max_sale_price: 100000,
        });

   }

   fetchResults() {
    if (this.state.item!=="" && this.state.cp.length===5) {
      this.setState({
        loadingVisibility: true,
      })
      this.getCoords(this.state.cp)
      const url = "https://www.wallaprice.com/.netlify/functions/getContent?search="+encodeURI(this.state.item)+"&latitude="+this.state.latitude+"&longitude="+this.state.longitude+"&min_sale_price="+this.state.min_sale_price+"&max_sale_price="+this.state.max_sale_price;
      do {
        var result = this.getPrices(url)
        console.log("try again");
      }
      while (result === false)
    }
    else {
      alert("Revisa los datos");
    }
   }
  
   handleSubmit(event) {
      event.preventDefault();
      this.fetchResults();
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

            <Results 
              min_sale_price={this.state.min_sale_price} 
              max_sale_price={this.state.max_sale_price} 
              priceTable={this.state.priceTable} 
              visibility={this.state.resultsVisibility} 
              loading={this.state.loadingVisibility}
              cards={this.state.cards}
              item={this.state.item}
              cp={this.state.cp}
              />
          </Suspense>
        </>
      );
    }
  }
  
  