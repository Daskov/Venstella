import ProductItem from "../ProductItem/ProductItem";

const SimilarProducts = ({text, products}) => {

    return (
        <div>
            <h2 className="sectionTitle pageTitle">{text? text : 'Похожие товары'}</h2>
            <div className="productGrid similarProducts">
                {products &&
                products.map(itm => <ProductItem key={itm.id} {...itm} additionalClass={true}/>)}
            </div>
        </div>
    );
};

export default SimilarProducts;