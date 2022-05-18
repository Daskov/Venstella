import {Helmet} from "react-helmet";
import s from "./searchResult.module.scss";
import {BreadCrumbs, FixedIcons, Pagination, Preloader, ProductItem, SimilarProducts} from "../../components/importar";
import {Fragment, useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {searchState} from "../../state";
import {fetchData} from "../../utils/API";
import endpoints from "../../utils/endpoints";

const SearchResult = () => {
    const [{count, searchingProduct, currentPage, products}, setSearch] = useRecoilState(searchState)
    const [similarProducts, setSimilarProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        searchingProduct.length > 0 &&
        fetchData(endpoints.search + searchingProduct + `&page=${currentPage}&page_size=16`)
            .then(({results, count}) => setSearch(old => {
                setIsLoading(false)
                return {...old, count: count, products: results}
            }))
    }, [currentPage, searchingProduct])
    useEffect(() => {
        fetchData(endpoints.similarProducts)
            .then(data => setSimilarProducts(data))
    }, [])

    return (
        <Fragment>
            <Helmet>
                <title>Поиск</title>
            </Helmet>
            <BreadCrumbs title={{title1: 'Результаты поиска', url1: '/search/'}}/>
            <div className="container">
                <div className={s.searchResult}>
                    <h2 className="sectionTitle pageTitle">Результаты поиска по запросу: {searchingProduct}</h2>
                    {isLoading
                        ? <Preloader/>
                        : products.length > 0
                            ? <Fragment>
                                <div className="productGrid collectionInnerGrid">
                                    {products.map((item, index) => <ProductItem innerPage={true} {...item} key={index}/>)}
                                </div>
                                <Pagination count={count} countSize={16}
                                            setPage={setSearch} currentPage={currentPage}/>
                            </Fragment>
                            : <p className={s.notification}>По Вашему запросу ничего не найдено.</p>
                    }
                    <SimilarProducts text="Возможно Вас заинтересует" products={similarProducts}/>
                </div>
            </div>
            <FixedIcons/>
        </Fragment>
    );
};

export default SearchResult;