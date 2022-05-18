import {Helmet} from "react-helmet";
import s from './news.module.scss'
import NewsItem from "./NewsItem/NewsItem";
import {BreadCrumbs, FixedIcons, Preloader} from "../../components/importar";
import {Fragment, useEffect, useState} from "react";
import {fetchData} from "../../utils/API";
import endpoints from "../../utils/endpoints";

const News = () => {
    const [news, setNews] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(endpoints.news)
            .then(data => {
                setNews(data)
                setIsLoading(false)
            })
    }, [])

    return (
        <Fragment>
            <Helmet>
                <title>Новости</title>
            </Helmet>
            <BreadCrumbs title={{title1: 'Новости', url1: '/news/'}}/>
            <div className="container">
                <h2 className="sectionTitle pageTitle">Новости </h2>
                <div className={s.newsGrid}>
                    {isLoading
                        ? <Preloader/>
                        : news.map(item => <NewsItem key={item.id} {...item}/>)
                    }
                </div>
            </div>
            <FixedIcons/>
        </Fragment>
    );
};

export default News;