import {Helmet} from "react-helmet";
import {Fragment, useEffect, useState} from "react";
import s from './cart.module.scss'
import Product from "./Product/Product";
import {BreadCrumbs, CartModal, SuccessModal} from "../../components/importar";
import classNames from "classnames";
import {useRecoilState, useSetRecoilState} from "recoil";
import {cartState, modalState} from "../../state";

const Cart = () => {
    const [visibleCheck, setVisibleCheck] = useState(false)
    const setModal = useSetRecoilState(modalState)
    const [cart, setCart] = useRecoilState(cartState)

    const toggleVisibleCheck = () => setVisibleCheck(!visibleCheck)
    const declination = (value, words) => {
        value = Math.abs(value) % 100;
        const num = value % 10
        if(value > 10 && value < 20) return words[2];
        if(num > 1 && num < 5) return words[1];
        if(num === 1) return words[0];
        return words[2];
    }
    ///// classes
    const orderTopClass = classNames({
        [s.orderTop]: true,
        [s.hide]: !visibleCheck
    })

    return (
        <Fragment>
            <Helmet>
                <title>Корзина</title>
            </Helmet>
            <BreadCrumbs title={{title1: 'Корзина', url1: '/cart/'}}/>
            <div className="container">
                <div className={s.cart}>
                    <div className={s.products}>
                        {cart.products.map((itm, index) => <Product setCart={setCart} key={index} {...itm}/>)}
                    </div>
                    <div className={s.order}>
                        <div className={orderTopClass}>
                            <h4 className={s.orderTitle}>Сумма заказа</h4>
                            <div className={s.params}>
                                <div className={s.param}>
                                    <span className={s.paramTitle}>Общее количество:</span>
                                    <div className={s.paramValue}>
                                        <span>{cart.quantity} </span>
                                        <span>{declination(cart.quantity, ['линейка', 'линейки', 'линеек'])} </span>
                                        <span>({cart.totalQuantity} шт.)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.param}>
                            <span className={s.paramTitle}>Итого к оплате:</span>
                            <span className={s.paramValue}>{cart && cart.totalPrice.toLocaleString()} сом</span>
                        </div>
                        <div className={s.toggleCheck} onClick={toggleVisibleCheck}>{visibleCheck? 'Скрыть' : 'Информация о заказе'}</div>
                        <div className={s.toOrder} onClick={() => setModal(old => ({...old, cart: true}))}>Оформление заказа</div>
                    </div>
                </div>
            </div>
            <CartModal cartProducts={cart.products}/>
            <SuccessModal/>
        </Fragment>
    );
};

export default Cart;