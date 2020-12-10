import './Results.css';

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
        </>
    );
}

