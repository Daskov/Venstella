import {Helmet} from "react-helmet";
import s from "./collectionInner.module.scss";
import {BreadCrumbs, FixedIcons, Pagination, Preloader, ProductItem, SimilarProducts} from "../../components/importar";
import {Fragment, useEffect, useState} from "react";
import {fetchData} from "../../utils/API";
import {useRecoilValue} from "recoil";
import {collectionState} from "../../state";
import {useParams} from "react-router-dom";
import endpoints from "../../utils/endpoints";

const CollectionInner = () => {
    const [mainData, setMainData] = useState({
        products: null,
        productsQuantity: null,
        currentPage: 1,
        countSize: 12,
        similarProducts: null
    })
    const {slug} = useParams()
    const collectionTitle = useRecoilValue(collectionState)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(endpoints.collectionDetail + slug + '?page_size=' + mainData.countSize + '&page=' + mainData.currentPage)
            .then(({results, count}) => setMainData(old => {
                setIsLoading(false)
                return {
                    ...old,
                    products: results,
                    productsQuantity: count
                }
            }))
    }, [mainData.currentPage])
    useEffect(() => {
        fetchData(endpoints.similarProducts)
            .then(data => setMainData(old => ({...old, similarProducts: data})))
    }, [])

    return (
        <Fragment>
            <Helmet>
                <title>Коллекции</title>
            </Helmet>
            <BreadCrumbs
                title={{title1: 'Коллекции', url1: '/collection/', title2: collectionTitle, url2: `/collection/${slug}`}}/>
            <div className="container">
                <div className={s.collectionInner}>
                    <div className={s.products}>
                        <h2 className="sectionTitle pageTitle">Коллекция {collectionTitle}</h2>
                        {isLoading
                            ? <Preloader/>
                            : mainData.products.length > 0 &&
                                <Fragment>
                                    <div className="productGrid collectionInnerGrid">
                                        {mainData.products.map(product => <ProductItem key={product.id} innerPage={true}
                                                                                       {...product}/>)}
                                    </div>
                                    <Pagination count={mainData.productsQuantity} countSize={mainData.countSize}
                                                setPage={setMainData} currentPage={mainData.currentPage}/>
                                </Fragment>
                        }
                    </div>
                    <SimilarProducts products={mainData.similarProducts}/>
                </div>
            </div>
            <FixedIcons/>
        </Fragment>
    );
};

export default CollectionInner;