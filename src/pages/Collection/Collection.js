import {Helmet} from "react-helmet";
import s from './collection.module.scss'
import {BreadCrumbs, CollectionItem, FixedIcons, Pagination, Preloader} from "../../components/importar";
import {Fragment, useEffect, useState} from "react";
import {fetchData} from "../../utils/API";
import endpoints from "../../utils/endpoints";

const Collection = () => {
    const [collection, setCollection] = useState({
        collection: null,
        quantity: null,
        currentPage: 1,
        countSize: 8
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(endpoints.collection + collection.countSize + '&page=' + collection.currentPage)
            .then(({results, count}) => setCollection(old => {
                setIsLoading(false)
                return {
                    ...old,
                    quantity: count,
                    collection: results
                }
            }))
    }, [collection.currentPage])

    return (
        <Fragment>
            <Helmet>
                <title>Коллекции</title>
            </Helmet>
            <BreadCrumbs title={{title1: 'Коллекции', url1: '/collection/'}}/>
            <div className="container">
                <div className={s.collection}>
                    <h2 className="sectionTitle pageTitle">Коллекции</h2>
                    {isLoading
                        ? <Preloader/>
                        : collection.collection.length > 0 &&
                            <Fragment>
                                <div className={s.collectionGrid}>
                                    {collection.collection.map(itm => <CollectionItem key={itm.id} {...itm}
                                                                                      additionalClass={true} innerPage={true}/>)}
                                </div>
                                <Pagination count={collection.quantity} countSize={collection.countSize}
                                            setPage={setCollection} currentPage={collection.currentPage}/>
                            </Fragment>
                    }
                </div>
            </div>
            <FixedIcons/>
        </Fragment>
    );
};

export default Collection;