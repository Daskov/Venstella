import {Helmet} from "react-helmet";
import {Advantages, Banners, Collection, FixedIcons, NewProducts, TrendProducts} from "../../components/importar";

const Home = () => {
    return (
        <div className="container">
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <Banners/>
            <TrendProducts/>
            <NewProducts/>
            <Collection/>
            <Advantages/>
            <FixedIcons/>
        </div>
    )
};

export default Home;
