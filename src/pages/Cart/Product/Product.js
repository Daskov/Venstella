import s from "./product.module.scss";
import {NavLink} from "react-router-dom";
import {decrement, deleteFromCart, increment, onBlur} from "./index";
import cs from "classnames";
import {Fragment, useEffect, useState} from "react";
import PropTypes from 'prop-types';

const Product = ({
                     title,
                     image,
                     size,
                     actualPrice,
                     price,
                     quantity,
                     id,
                     color,
                     setCart }) => {
    const [active, setActive] = useState(false)
    const [newQuantity, setNewQuantity] = useState(quantity)
    const newPrice = actualPrice ? actualPrice : price

    const countHandler = (e) => {
        if (e.target.value === String(0) || e.target.value.length === 0) {
            setNewQuantity(1)
        }else {
            setNewQuantity(Number(e.target.value))
        }
    }
    useEffect(() => {
        setNewQuantity(quantity)
    }, [quantity])

    return (
        <div className={s.product}>
            <div className={s.delete} onClick={() => deleteFromCart(color, newPrice, quantity, id, setCart)}/>
            <NavLink to={`/product/${id}`} className={s.image}><img src={image} alt=""/></NavLink>
            <div>
                <h3 className={s.title}>{title}</h3>
                <div className={s.size}>Размер: {size}</div>
                <div className={cs(s.size, s.color)}>Цвет: <span style={{background: color}} className={s.colorItem}/></div>
                <div className={s.price}>
                    {actualPrice
                        ? <Fragment>
                            <span className={s.actualPrice}>{actualPrice.toLocaleString()} р</span>
                            <span className={s.oldPrice}>{price.toLocaleString()} р</span>
                        </Fragment>
                        : <span className={s.actualPrice}>{price.toLocaleString()} р</span>}
                </div>
                <div className={s.counter}>
                    <div className={cs(s.counterBtn, {[s.active]: active})}
                         onClick={() => decrement(color, newPrice, quantity, setActive, id, setCart)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6.97599V5.98799V5H6.90569H0.000768052C0 6 3.33357e-05 5.43911 3.33357e-05 5.98799C3.33357e-05 6.53688 0.000958221 6.5 0.000768052 6.97599H4.86796H12Z" fill="#979797"/>
                        </svg>
                    </div>
                    <input className={s.count} type="number" value={newQuantity} onInput={countHandler}
                           onBlur={() => onBlur(color, newPrice, newQuantity, quantity, id, setCart)}/>
                    <div className={s.counterBtn} onClick={() => increment(color, newPrice, quantity, setActive, id, setCart)}>+</div>
                </div>
            </div>
        </div>
    );
};

Product.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string,
    actualPrice: PropTypes.number,
    price: PropTypes.number,
    quantity: PropTypes.number,
    id: PropTypes.number,
    color: PropTypes.string,
    setCart: PropTypes.func,
}

export default Product;