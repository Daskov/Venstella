import s from "./navigation.module.scss";
import {NavLink} from "react-router-dom";

const Navigation = ({hideNav}) => {
    const hideNavigation = () => {
        hideNav()
    }

    return (
        <div className={s.nav}>
            <NavLink onClick={hideNavigation} to="/about/" className={s.navLink}>О нас</NavLink>
            <NavLink onClick={hideNavigation} to="/collection/" className={s.navLink}>Коллекции</NavLink>
            <NavLink onClick={hideNavigation} to="/news/" className={s.navLink}>Новости</NavLink>
        </div>
    );
};

export default Navigation;