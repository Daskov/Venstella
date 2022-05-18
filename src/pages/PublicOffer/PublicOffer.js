import {Helmet} from "react-helmet";
import s from './publicOffer.module.scss'
import {BreadCrumbs, FixedIcons, Preloader} from "../../components/importar";
import {Fragment, useEffect, useState} from "react";
import {fetchData} from "../../utils/API";
import endpoints from "../../utils/endpoints";

const PublicOffer = () => {
    const [text, setText] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(endpoints.publicOffer)
            .then(data => {
                setText(data[0])
                setIsLoading(false)
            })
    }, [])

    const createMarkup = () => {
        if (text) {
            return {__html: text.text}
        }
    }

    return (
        <Fragment>
            <Helmet>
                <title>Публичная оферта</title>
            </Helmet>
            <BreadCrumbs title={{title1: 'Публичная оферта', url1: '/public_offer/'}}/>
            <div className="container">
                <h2 className="sectionTitle pageTitle">Публичная оферта</h2>
                {isLoading
                    ? <Preloader/>
                    : <div className={s.content} dangerouslySetInnerHTML={createMarkup()}/>
                }
            </div>
            <FixedIcons/>
        </Fragment>
    );
};

export default PublicOffer;