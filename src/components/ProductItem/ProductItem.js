import {useEffect, useState, Fragment} from "react";
import {NavLink} from "react-router-dom";
import s from './productItem.module.scss'
import SliderItem from "./SliderItem/SliderItem";
import classNames from "classnames";
import {addToFavorite, checkId} from "../../pages/common/favorite";
import PropTypes from "prop-types";
import {useSetRecoilState} from "recoil";
import {favoriteState} from "../../state";

const ProductItem = ({
                         additionalClass,
                         innerPage,
                         title,
                         size,
                         price,
                         new_price,
                         color,
                         id,
                         discount}) => {
    const favorites = JSON.parse(localStorage.getItem('favorites'))

    const setFavorites = useSetRecoilState(favoriteState)
    useEffect(() => {
        if (!favorites) {
            localStorage.setItem('favorites', '[]')
        }
    }, [])

    const [active, setActive] = useState(() => checkId(favorites, id))
    const favorite = {
        title, size, price, color, id, new_price
    }

    const [activeColor, setActiveColor] = useState(0)
    const imagesObj = color && color.find((_, index) => index === activeColor)

    ///// classes
    const productItemClass = classNames({
        [s.productItem]: true,
        [s.similarProductItem]: additionalClass,
        [s.innerPageItm]: innerPage
    })
    const favoriteClass = classNames({
        [s.favorite]: true,
        [s.active]: active
    })
    const colorClass = (index) => classNames({
        [s.color]: true,
        [s.active]: activeColor === index
    })
    return (
        <div className={productItemClass}>
            <div className={s.images}>
                <div className={favoriteClass} onClick={() => addToFavorite(active, setActive, favorite, id, setFavorites)}/>
                {discount && <div className={s.discount}><span>{discount}%</span></div>}
                <NavLink to={`/product/${id}`} className={s.imagesWrap}>
                    {imagesObj && imagesObj.product_image.map(({image}, index) => (
                        <SliderItem slider={imagesObj.product_image.length > 1} key={index} image={image}/>
                    ))}
                </NavLink>
            </div>
            <div className={s.info}>
                <div className={s.infoHeader}>
                    <h3 className={s.title}>{title}</h3>
                    <div className={s.price}>
                        {new_price
                            ? <Fragment>
                                <div className={s.oldPrice}>{parseFloat(price).toLocaleString()} р</div>
                                <div className={s.actualPrice}>{parseFloat(new_price).toLocaleString()} р</div>
                            </Fragment>
                            : <div className={s.actualPrice}>{parseFloat(price).toLocaleString()} р</div>}
                    </div>
                </div>
                <div className={s.size}>Размер: {size}</div>
                <div className={s.colors}>
                    {color && color.map((colorObj, index) => (
                        <div className={colorClass(index)} key={index} style={{background: colorObj.color}}
                             onClick={() => setActiveColor(index)}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    additionalClass: PropTypes.bool,
    innerPage: PropTypes.bool,
    title: PropTypes.string,
    size: PropTypes.string,
    price: PropTypes.string,
    new_price: PropTypes.string,
    color: PropTypes.array,
    id: PropTypes.number,
    discount: PropTypes.number
}

export default ProductItem;
