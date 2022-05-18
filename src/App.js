import {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import cs from "classnames";
import './assets/fonts/Montserrat/stylesheet.css'
import './assets/scss/App.scss';
import {
    AboutUs, Cart, Collection, CollectionInner, Favorites, Help, Home, News, ProductDetail, PublicOffer,
    SearchResult} from "./pages/importar";
import {Footer, Header, SuccessModal, SupportModal} from "./components/importar";
import {fetchData} from "./utils/API";
import {useSetRecoilState} from "recoil";
import {contactsState} from "./state";
import endpoints from "./utils/endpoints";

function App() {
    const [isNavHidden, setIsNavHidden] = useState(false)

    const setContactsData = useSetRecoilState(contactsState)
    const cart = JSON.parse(localStorage.getItem('cart'))
    useEffect(() => {
        if (!cart) {
            const cartState = {
                totalPrice: 0,
                quantity: 0,
                totalQuantity: 0,
                products: []
            }
            localStorage.setItem('cart', JSON.stringify(cartState))
        }
        fetchData(endpoints.contacts)
            .then(data => setContactsData(data))
    },[])

    return (
        <div className={cs('App', {['showLayer']: isNavHidden})}>
            <Header isNavHidden={isNavHidden} setIsNavHidden={setIsNavHidden}/>
            <div className="main">
                <Route path="/" component={Home} exact/>
                <Route path="/about/" component={AboutUs} exact/>
                <Route path="/collection/" component={Collection} exact/>
                <Route path="/collection/:slug" component={CollectionInner} exact/>
                <Route path="/product/:slug" component={ProductDetail} exact/>
                <Route path="/news/" component={News} exact/>
                <Route path="/help/" component={Help} exact/>
                <Route path="/search/" component={SearchResult} exact/>
                <Route path="/favorites/" component={Favorites} exact/>
                <Route path="/cart/" component={Cart} exact/>
                <Route path="/public_offer/" component={PublicOffer} exact/>
            </div>
            <SupportModal/>
            <SuccessModal/>
            <Footer/>
        </div>
    );
}

export default App;
