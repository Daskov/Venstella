import {NavLink} from "react-router-dom";
import {useState} from "react";
import {DropDown, IconLinks, Navigation, SearchBlock} from "./importar";
import s from './header.module.scss'
import logo from '../../assets/img/svg/header-logo.svg'
import classNames from "classnames";

const Header = ({isNavHidden, setIsNavHidden}) => {
    const [isSearchHidden, setIsSearchHidden] = useState(false)
    const showNav = () => {
        setIsNavHidden(true)
        setIsSearchHidden(false)
    }

    ///////classes
    const headerClass = classNames({
        [s.header]: true,
        [s.active]: isSearchHidden
    })
    const headerTopInnerClass = classNames({
        [s.headerTopInner]: true,
        [s.active]: isNavHidden
    })
    const showSearchBlockCLass = classNames({
        [s.showSearchBlock]: true,
        [s.active]: isSearchHidden
    })

    return (
        <header className={headerClass}>
            <div className="container">
                <div className={headerTopInnerClass}>
                    <div className={s.topHead}>
                        <span className={s.menu}>Меню</span>
                        <span className={s.navClose} onClick={() => setIsNavHidden(false)}/>
                    </div>
                    <Navigation hideNav={() => setIsNavHidden(false)}/>
                    <IconLinks hideNav={() => setIsNavHidden(false)} additionalClass="mobile"/>
                    <DropDown/>
                </div>
            </div>
            <div className={`${s.headerBottom} headerBottom`}>
                <div className="container">
                    <div className={s.headerBottomInner}>
                        <div className={s.burger} onClick={showNav}/>
                        <NavLink to="/" className={s.logo}>
                            <img src={logo} alt="logo"/>
                        </NavLink>
                        <SearchBlock isSearchHidden={isSearchHidden} setIsSearchHidden={setIsSearchHidden}/>
                        <IconLinks hideNav={() => setIsNavHidden(false)} additionalClass="desktop"/>
                        <div className={showSearchBlockCLass} onClick={() => setIsSearchHidden(!isSearchHidden)}/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;