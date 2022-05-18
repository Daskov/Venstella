import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import s from "./help.module.scss";
import AnswerItem from "./AnswerItem/AnswerItem";
import {BreadCrumbs, FixedIcons, Preloader} from "../../components/importar";
import rectangle from '../../assets/img/svg/def-rectangle.svg'
import {fetchData} from "../../utils/API";
import endpoints from "../../utils/endpoints";

const Help = () => {
    const [activeQuestion, setActiveQuestion] = useState(null)
    const [faq, setFaq] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(endpoints.faq)
            .then(data => {
                setFaq(data)
                setIsLoading(false)
            })
    }, [])
    const showAnswer = (index) => setActiveQuestion(index)

    return (
        <>
            <Helmet>
                <title>Помощь</title>
            </Helmet>
            <BreadCrumbs title={{title1: 'Помощь', url1: '/help/'}}/>
            <div className="container">
                {isLoading
                    ? <Preloader/>
                    : <div className={s.help}>
                            <div className={s.imgWrap}>
                                <img src={rectangle} alt="" className={s.rectangle}/>
                                {faq.length > 0 && <img src={faq[0].image} alt="" className={s.image}/>}
                            </div>
                            <div>
                                <h2 className="sectionTitle pageTitle">Помощь</h2>
                                <div className={s.helpGrid}>
                                    {faq.length > 0 && faq[0].faqs.map((itm, index) =>
                                        <AnswerItem activeQuestion={activeQuestion} {...itm} showAnswer={showAnswer}
                                                    index={index} key={index}/>)}
                                </div>
                            </div>
                        </div>
                }
            </div>
            <FixedIcons/>
        </>
    );
};

export default Help;
