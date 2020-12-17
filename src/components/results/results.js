import './Results.scss';

import Item from '../item/item';

function getQuantityPrices(priceTable) {
    const prices = Object.keys(priceTable);
    var quantityPricesTotal = 0;
    for (var price in prices) {
        var quantityPrices = priceTable[prices[price]];
        quantityPricesTotal = quantityPricesTotal + quantityPrices;
    }
    return quantityPricesTotal
}

function getLimits (max,min,results) {
    var i;
    const step = (max-min)/results;
    var limits = [];
    for (i=0;i<results;i++) {
        limits[i] = {
            "start" : i*step+min,
            "end": i*step+step+min,
        } 
    }
    return limits
}


function PriceBoxes (props) {
    var boxes = []
    const limits = getLimits(parseFloat(props.max),parseFloat(props.min),props.results)
    for (const limit in limits) {
        var key = Math.floor(Math.random() * 101);
        boxes.push(<th key={key}>{limits[limit].start}€ - {limits[limit].end}€</th>);
    }
    return boxes;
}

function Distribution (props) {
    var i;
    var boxes = [];
    const limits = getLimits(parseFloat(props.max),parseFloat(props.min),props.results)
    for (i=0;i<props.results;i++) {
        var distribution = 0;
        const prices = Object.keys(props.priceTable);
        var countPrice = 0;
        for (const price in prices) {
            if (prices[price] >= parseFloat(limits[i].start) && prices[price] <= parseFloat(limits[i].end)) {
                var quantityPrices = props.priceTable[prices[price]];
                countPrice=countPrice+quantityPrices;
                
            }
        }
        const quantityPricesTotal = getQuantityPrices(props.priceTable)
        console.log("-----")
        console.log(countPrice)
        console.log(quantityPricesTotal)
        distribution =  (countPrice / quantityPricesTotal)*100;
        var key = Math.floor(Math.random() * 10000);
        boxes.push(<td key={key}>{parseInt(distribution)}%</td>);
    }
    return boxes;
}

export default function Results (props) {
    if (props.loading) {
        return(
            <div>Buscando resultados…</div>
        )
    }
    else if (props.visibility) {
        return (
            <>
                <table>
                    <tfoot>
                        <td colSpan="10">
                            Haz click en cada rango de precios para ver más detalle
                        </td>
                    </tfoot>
                    <tbody>
                        <tr>
                            <PriceBoxes min={props.min_sale_price} max={props.max_sale_price} results="4" />
                        </tr>
                        <tr>
                            <Distribution min={props.min_sale_price} max={props.max_sale_price} results="4" priceTable={props.priceTable} />
                        </tr>
                    </tbody>
                </table>
    
                <div className="items">
                    <Item label="El más barato" />
                    <Item label="Precio habitual" />
                    <dl>
                        <dt>Precio habitual:</dt>
                            <dd>350€</dd>
                        <dt>Rango de precio habitual:</dt>
                            <dd>300€ - 400€</dd>
                        <dt>Precio más barato:</dt>
                            <dd>30€</dd>
                        <dt>Precio más caro:</dt>
                            <dd>500€</dd>
                    </dl>
                    <Item label="El más caro" />
                </div>
    
            </>
        );
    } else {
        return null
    }

    
}

