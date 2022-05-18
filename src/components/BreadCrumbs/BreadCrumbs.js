import s from "./breadCrumbs.module.scss"
import {NavLink} from "react-router-dom";

const BreadCrumbs = ({title}) => {
    return (
        <div className={s.breadCrumbs}>
            <div className="container">
                <div className={s.breadCrumbsInner}>
                    <NavLink to="/" className={s.link}>Главная</NavLink>
                    <NavLink to={title.url1} className={s.link}>{title.title1}</NavLink>
                    {title.title2 && <NavLink to={title.url2} className={s.link}>{title.title2}</NavLink>}
                </div>
            </div>
        </div>
    );
};

export default BreadCrumbs;