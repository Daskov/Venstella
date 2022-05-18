import s from "./iconLinks.module.scss";
import { NavLink } from "react-router-dom";
import cs from "classnames";
import { useRecoilState } from "recoil";
import { cartState, favoriteState } from "../../../state";
import { useEffect } from "react";

const IconLinks = ({additionalClass, hideNav}) => {
    const closeNav = () => hideNav();
    const [favorite, setFavorite] = useRecoilState(favoriteState);
    const [cart, setCart] = useRecoilState(cartState);

    useEffect(() => {
        setFavorite(JSON.parse(localStorage.getItem('favorites')))
        setCart(JSON.parse(localStorage.getItem('cart')))
    }, [])

    // classes
    const iconLinks = cs({
        [s.iconLinks]: true,
        [s.mobile]: additionalClass === 'mobile',
        [s.desktop]: additionalClass === 'desktop',
    });

    const favoriteIcon = cs({
        [s.icon]: true,
        [s.active]: favorite && favorite.length > 0
    });

    const cartIcon = cs({
        [s.icon]: true,
        [s.active]: cart && cart.products.length > 0
    });

    return (
        <div className={iconLinks}>
            <NavLink onClick={closeNav} to="/favorites/" className={cs(s.iconLink, s.favorites)}>
                <div className={favoriteIcon}/>
                Избранное
            </NavLink>
            <NavLink onClick={closeNav} to="/cart/" className={cs(s.iconLink, s.cart)}>
                <div className={cartIcon}/>
                Корзина
            </NavLink>
        </div>
    );
};

export default IconLinks;