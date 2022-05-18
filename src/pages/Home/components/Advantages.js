import React, {Fragment, useEffect, useState} from 'react';
import s from "../home.module.scss";
import {fetchData} from "../../../utils/API";
import endpoints from "../../../utils/endpoints";
import {Preloader} from "../../../components/importar";

const Advantages = () => {
    const [advantages, setAdvantages] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(endpoints.advantages)
            .then(data => {
                setAdvantages(data)
                setIsLoading(false)
            })
    },[])
    return (
        <section className={s.advantages}>
            {isLoading
                ? <Preloader/>
                : <Fragment>
                    <h2 className="sectionTitle">Наши преимущества</h2>
                    <div className={s.advantagesGrid}>
                        {advantages.map(itm =>
                            <Fragment key={itm.title}>
                                <div className={s.advantageItem}>
                                    <img src={itm.icon} alt="" className={s.icon}/>
                                    <h3 className={s.title}>{itm.title}</h3>
                                    <p className={s.description}>{itm.description}</p>
                                </div>
                            </Fragment>)}
                    </div>
                </Fragment>
            }
        </section>
    );
};

export default Advantages;