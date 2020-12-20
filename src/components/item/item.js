import './Item.scss';

export default function Item(props) {
    return (
        <div className="item">
            <p className="label">{props.label}</p>
            <img src="https://cdn.wallapop.com/images/10420/8p/3e/__/c10420p525877928/i1533573755.jpg?pictureSize=W320" alt="" />
            <p className="price">{props.card.price} €</p>
            <h2>{props.card.price}</h2>
            <p className="description">{props.card.text}</p>
        </div>
    );
}