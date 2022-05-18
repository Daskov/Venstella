import React, {Fragment, useEffect, useState} from 'react';
import s from "../home.module.scss";
import {BlackButton, CollectionItem, Preloader} from "../../../components/importar";
import {fetchData} from "../../../utils/API";
import endpoints from "../../../utils/endpoints";

const Collection = () => {
    const [collection, setCollection] = useState({
        collection: null,
        count: 4,
        quantity: null
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(endpoints.collection + collection.count)
            .then(({results, count}) => setCollection(old => {
                setIsLoading(false)
                return {...old, collection: results, quantity: count}
            }))
    }, [collection.count])

    return (
        <section className={s.collection}>
            {isLoading
                ? <Preloader/>
                : <Fragment>
                    <h2 className="sectionTitle">Коллекция</h2>
                    <div className="productGrid">
                        {collection.collection.map(itm => <CollectionItem {...itm} key={itm.id}/>)}
                    </div>
                    {collection.collection.length < collection.quantity &&
                    <BlackButton setData={setCollection} count={collection.count}/>}
                </Fragment>
            }
        </section>
    );
};

export default Collection;