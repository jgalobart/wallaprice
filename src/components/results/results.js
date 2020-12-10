import './Results.css';

function PriceBoxes (props) {
    var boxes = []
    var i = 0;
    var step = (parseFloat(props.max)-parseFloat(props.min))/10;
    for (i=0;i<10;i++) {
        var start = i*step;
        var end = i*step+step;
        boxes.push(<td>{start}€ - {end}€</td>);
    }
    return boxes;
}

export default function Results () {
    return (
        <table>
            <tr>
                <PriceBoxes min="0" max="1000"/>
            </tr>
        </table>
    );
}

