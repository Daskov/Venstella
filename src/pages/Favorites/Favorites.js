import {Helmet} from "react-helmet";
import s from './favorites.module.scss'
import {BreadCrumbs, FixedIcons, ProductItem} from "../../components/importar";
import {Fragment, useEffect} from "react";
import {useRecoilState} from "recoil";
import {favoriteState} from "../../state";

const Favorites = () => {
    const [favorites, setFavorites] = useRecoilState(favoriteState)

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem('favorites')))
    }, [])

    return (
        <Fragment>
            <Helmet>
                <title>Избранное</title>
            </Helmet>
            <BreadCrumbs title={{title1: 'Избранное', url1: '/favorites/'}}/>
            <div className="container">
                <h2 className="sectionTitle pageTitle">Избранное</h2>
                <h3 className={s.subtitle}>Товаров в избранном: {favorites.length}</h3>
                <div className={s.favorites}>
                    <div className="productGrid collectionInnerGrid">
                        {favorites &&
                        favorites.map(itm => <ProductItem key={itm.id} innerPage={true} {...itm}/>)}
                    </div>
                </div>
            </div>
            <FixedIcons/>
        </Fragment>
    );
};

export default Favorites;