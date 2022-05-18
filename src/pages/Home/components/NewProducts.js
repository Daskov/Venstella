import React, {Fragment, useEffect, useState} from 'react';
import s from "../home.module.scss";
import {BlackButton, Preloader, ProductItem} from "../../../components/importar";
import {fetchData} from "../../../utils/API";
import endpoints from "../../../utils/endpoints";

const NewProducts = () => {
    const [products, setProducts] = useState({
        products: null,
        count: 4,
        quantity: null,
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(endpoints.newProducts + products.count)
            .then(({results, count}) => setProducts(oldData => {
                setIsLoading(false)
                return {...oldData, products: results, quantity: count}
            }))
    }, [products.count])

    return (
        <section className={s.productSection}>
            {isLoading
                ? <Preloader/>
                : <Fragment>
                    <h2 className="sectionTitle">Новинки</h2>
                    <div className="productGrid">
                        {products.products.map(product => <ProductItem key={product.id} {...product}/>)}
                    </div>
                    {products.products.length < products.quantity &&
                    <BlackButton setData={setProducts} count={products.count}/>}
                </Fragment>
            }
        </section>
    );
};

export default NewProducts;