import React,{useEffect, useState} from "react"
import {Helmet} from "react-helmet";
import s from './AboutUs.module.scss'
import defaultImage from '../../assets/img/svg/def-img.svg'
import {BreadCrumbs, FixedIcons, Preloader} from "../../components/importar";
import {Fragment} from "react";
import clss from 'classnames'
import {fetchData} from "../../utils/API";
import endpoints from "../../utils/endpoints";

const AboutUs = () => {
    const [aboutData, setAboutData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(endpoints.aboutUs)
            .then(data => {
                setAboutData(data)
                setIsLoading(false)
            })
    },[])

    ////// classes
    const aboutUsCLass = clss({
        [s.aboutUs]: true,
        [s.lessImg]: aboutData && aboutData.images && aboutData.images.length < 3
    })

    return (
        <Fragment>
            <Helmet>
                <title>О нас</title>
            </Helmet>
            <BreadCrumbs title={{title1: 'О нас', url1: '/about/'}}/>
            <div className="container">
                {isLoading
                ? <Preloader/>
                : <div className={aboutUsCLass}>
                        <div className={s.images}>
                            {aboutData.images.map(({image}, index) => <div className={s.image} key={index}>
                                <img src={defaultImage} alt="" className={s.defImg}/>
                                <img src={image} alt="" className={s.imageItm}/>
                            </div>)}
                        </div>
                        <div className={s.right}>
                            <h3 className={s.title}>{aboutData.title}</h3>
                            <p className={s.description}>{aboutData.description}</p>
                        </div>
                    </div>}
            </div>
            <FixedIcons/>
        </Fragment>
    );
};

export default AboutUs;
