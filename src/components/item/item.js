import './Item.scss';

export default function Item(props) {
    return (
        <div className="item">
            <p className="label">{props.label}</p>
            <img src="https://cdn.wallapop.com/images/10420/8p/3e/__/c10420p525877928/i1533573755.jpg?pictureSize=W320" alt="" />
            <p className="price">380€</p>
            <h2>Trona Stokke</h2>
            <p>Cama de diseño para bebés marca Stokke modelo Sleepy, color natural (madera). Incluye 3 accesorios originales marca Stokke Sleepy: colchón, Protection Sheet Oval y Protector Blanco (para barandillas), prácticamente no usados. La cama no incluye las ruedas para moverlo. Ideal para bebés de 6 a 18 meses.</p>
        </div>
    );
}