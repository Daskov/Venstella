import s from "./newsItem.module.scss";
import {useState} from "react";

const NewsItem = ({title, description, image}) => {
    let limit
    window.innerWidth >= 426 ? limit = 960 : limit = 150

    const fullDescription = description
    const shortDescription = description.slice(0, limit)

    const [hiddenText, setHiddenText] = useState(true)
    const showMore = () => {
        window.innerWidth >= 426 ? setHiddenText(false) : setHiddenText(!hiddenText)
    }

    return (
        <div className={s.item}>
            <img src={image} alt="" className={s.image}/>
            <div>
                <h3 className={s.title}>{title}</h3>
                <p className={s.description}>
                    {hiddenText ? shortDescription : fullDescription}
                    {window.innerWidth >= 426
                        ? hiddenText && fullDescription.length >= limit
                            ? <span className={s.more} onClick={showMore}>...ещё</span> : ''
                        : <span className={s.more} onClick={showMore}>
                            {window.innerWidth >= 426 ? '...ещё' : hiddenText ? 'Читать полностью' : 'Скрыть'}
                          </span>
                    }
                </p>
            </div>
        </div>
    );
};

export default NewsItem;