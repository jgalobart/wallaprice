import './Item.scss';

export default function Item(props) {
    return (
        <div className="item">
            <p className="label">{props.label}</p>
            <img src={props.card.img} alt={props.card.title} />
            <p className="price">{props.card.price} €</p>
            <h2>{props.card.title}</h2>
            <p className="description">{props.card.description}</p>
        </div>
    );
}