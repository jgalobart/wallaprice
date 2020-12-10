import './Results.scss';

import Item from '../item/item';

function PriceBoxes (props) {
    var boxes = []
    var i;
    var step = (parseFloat(props.max)-parseFloat(props.min))/10;
    for (i=0;i<10;i++) {
        var start = i*step;
        var end = i*step+step;
        boxes.push(<th>{start}€ - {end}€</th>);
    }
    return boxes;
}

function Distribution (props) {
    var i;
    var boxes = []
    for (i=0;i<10;i++) {
        var distribution = Math.floor(Math.random() * 100);
        boxes.push(<td>{distribution}%</td>);
    }
    return boxes;
}

export default function Results () {
    return (
        <>
            <table>
                <tfoot>
                    <td colspan="10">
                        Haz click en cada rango de precios para ver más detalle
                        </td>
                </tfoot>
                <tbody>
                    <tr>
                        <PriceBoxes min="0" max="1000"/>
                    </tr>
                    <tr>
                        <Distribution />
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
}

