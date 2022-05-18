import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import s from "./productDetail.module.scss";
import { BreadCrumbs, FixedIcons, SimilarProducts, Preloader } from "../../components/importar";
import cs from "classnames";
import {fetchData} from '../../utils/API';
import {NavLink, useParams} from "react-router-dom";
import {addToFavorite, checkId} from "../common/favorite";
import {addToCart, checkCart} from "./index";
import endpoints from "../../utils/endpoints";
import {useSetRecoilState} from "recoil";
import {cartState, favoriteState} from "../../state";

const ProductDetail = () => {
    const {slug} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [productData, setProductData] = useState(null)

    useEffect(() => {
        fetchData(endpoints.productDetail + slug)
            .then(data => setProductData(data))
            .finally(() => setIsLoading(false))
    },[slug])

// popUp
    const [popUp, setPopUp] = useState(false)
    const [activeUrl, setActiveUrl] = useState(null)

    const openPopUp = (url) => {
        setPopUp(true)
        setActiveUrl(url)
    }

// images
    const [activeColor, setActiveColor] = useState(0)
    const imagesObj = productData && productData.color[activeColor]

// favorite
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    const [isFavorite, setIsFavorite] = useState(checkId(favorites, slug))
    const setFavorite = useSetRecoilState(favoriteState)

    useEffect(() => {
        if (!favorites) {
            localStorage.setItem('favorites', '[]')
        }
    }, [])

// cart
    const [isInCart, setIsInCart] = useState(checkCart(imagesObj))
    const setCart = useSetRecoilState(cartState)

    useEffect(() => {
        setIsInCart(checkCart(imagesObj, Number(slug)))
    }, [imagesObj])

// classes
    const colorClass = index => cs({
        [s.color]: true,
        [s.active]: activeColor === index
    })
    const favoriteBtn = cs({
        [s.button] : true,
        [s.favorite] : true,
        [s.active]: isFavorite
    })
    const cartBtn = cs({
        [s.button] : true,
        [s.cart]: !isInCart
    })
    const link = cs({
        [s.cartLink]: true,
        [s.active]: isInCart
    })
    const popUpClass = cs({
        [s.popUp]: true,
        [s.active]: popUp
    })

    if (isLoading) {
        return <Preloader/>
    } else {
        return (
            <Fragment>
                <Helmet>
                    <title>{productData.title}</title>
                </Helmet>
                <BreadCrumbs title={{title1: productData.title, url1: `/product/${slug}`}}/>
                <div className="container">
                    <div className={s.productsDetail}>
                        <div className={s.productGrid}>
                            <div className={s.imagesGrid}>
                                {imagesObj &&
                                imagesObj.product_image.map(({image}, index) => <img src={image} alt=""
                                         className={s.image} onClick={() => openPopUp(image)} key={index}/>)}
                            </div>
                            <div className={s.productInfo}>
                                <h3 className={s.title}>{productData.title}</h3>
                                <div className={s.param}>
                                    <h4 className={s.paramTitle}>Артикул:</h4>
                                    <span className={s.paramValue}>{productData.vendor_code}</span>
                                </div>
                                <div className={s.param}>
                                    <h4 className={s.paramTitle}>Цвет:</h4>
                                    <div className={s.colors}>
                                        {productData &&
                                        productData.color.map((colorObj, index) => (
                                            <div className={colorClass(index)} key={index}
                                                 style={{background: colorObj.color}}
                                                 onClick={() => setActiveColor(index)}/>
                                        ))}
                                    </div>
                                </div>
                                <div className={s.price}>
                                    {productData.new_price
                                        ? <Fragment>
                                            <div className={s.actualPrice}>{parseFloat(productData.new_price).toLocaleString()} р</div>
                                            <div className={s.oldPrice}>{parseFloat(productData.price).toLocaleString()} р</div>
                                        </Fragment>
                                        : <div className={s.actualPrice}>{parseFloat(productData.price).toLocaleString()} р</div>}
                                </div>
                                <div className={cs(s.param, s.infoParam)}>
                                    <h4 className={s.paramTitle}>О товаре:</h4>
                                    <p className={s.paramValue}>{productData.description}</p>
                                </div>
                                <div className={s.params}>
                                    <div className={s.param}>
                                        <h4 className={s.paramTitle}>Размерный ряд:</h4>
                                        <span className={s.paramValue}>{productData.size}</span>
                                    </div>
                                    <div className={s.param}>
                                        <h4 className={s.paramTitle}>Состав ткани:</h4>
                                        <span className={s.paramValue}>{productData.fabric_composition}</span>
                                    </div>
                                    <div className={s.param}>
                                        <h4 className={s.paramTitle}>Количество в линейке:</h4>
                                        <span className={s.paramValue}>{productData.quantity}</span>
                                    </div>
                                    <div className={s.param}>
                                        <h4 className={s.paramTitle}>Материал:</h4>
                                        <span className={s.paramValue}>{productData.material}</span>
                                    </div>
                                </div>
                                <div className={s.buttons}>
                                    <button onClick={() => addToCart(productData, slug, setIsInCart, imagesObj, Number(slug), setCart)}
                                            className={cartBtn} disabled={isInCart}>
                                        {isInCart? 'Перейти в корзину' : 'Добавить в корзину'}
                                        <NavLink to="/cart/" className={link}/>
                                    </button>
                                    <button onClick={() => addToFavorite(isFavorite, setIsFavorite, productData, slug, setFavorite)}
                                            className={favoriteBtn}/>
                                </div>
                            </div>
                        </div>
                        <SimilarProducts products={productData.similar_products}/>
                    </div>
                </div>
                <div className={popUpClass}>
                    <div className={s.close} onClick={() => setPopUp(false)}/>
                    <div className={s.outerClose} onClick={() => setPopUp(false)}/>
                    <img src={activeUrl} alt="" className={s.popUpImg}/>
                </div>
                <FixedIcons/>
            </Fragment>
        )
    }
};

export default ProductDetail;
