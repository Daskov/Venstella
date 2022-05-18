import s from './colectionItem.module.scss'
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import {useSetRecoilState} from "recoil";
import {collectionState} from "../../state";

const CollectionItem = ({additionalClass, innerPage, image, title, id}) => {
    const setCollectionName = useSetRecoilState(collectionState)

    ////// classes
    const collectionItemClass = classNames({
        [s.collectionItem] : true,
        [s.pageCollectionItem] : additionalClass
    })

    return (
        <div className={collectionItemClass}>
            <div className={s.imageWrap}>
                <img src={image} alt="" className={s.image}/>
                <h3 className={s.imageTitle}>{title}</h3>
            </div>
            <NavLink to={innerPage? `${id}` : `collection/${id}`} className={s.collectionMore} onClick={() => setCollectionName(title)}>
                Смотреть все
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.2517 9.42698L6.94666 1.48718C6.61557 1.17094 6.07941 1.17094 5.74832 1.48718C5.41723 1.8037 5.41723 2.31681 5.74832 2.63305L13.4542 10L5.74832 17.367C5.41723 17.6833 5.41723 18.1964 5.74832 18.5126C5.91387 18.6709 6.13053 18.75 6.34749 18.75C6.56444 18.75 6.78111 18.6709 6.94666 18.5126L15.2517 10.5729C15.5828 10.2563 15.5828 9.74319 15.2517 9.42698Z"
                        fill="white"/>
                </svg>
            </NavLink>
        </div>
    );
};

export default CollectionItem;