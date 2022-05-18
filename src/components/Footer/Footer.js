import s from './footer.module.scss'
import logo from '../../assets/img/svg/footer-logo.svg'
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {contactsState, footerState} from "../../state";
import {useEffect, useRef} from "react";

const Footer = () => {
    const contactData = useRecoilValue(contactsState)
    const setFooter = useSetRecoilState(footerState)
    const footerRef = useRef(null)

    useEffect(() => {
        setFooter(footerRef.current)
    }, [])

    ////////////// classes
    const iconLinkClass = classNames({
        [s.link]: true,
        [s.iconLink]: true
    })

    return (
        <footer className={s.footer} ref={footerRef}>
            <div className="container">
                <div className={s.footerInner}>
                    <img src={logo} alt="" className={s.logo}/>
                    <div>
                        <h3 className={s.columnTitle}>Компания</h3>
                        <NavLink to="/about/" className={s.link}>О нас</NavLink>
                        <NavLink to="/news/" className={s.link}>Новости</NavLink>
                        <NavLink to="/help/" className={s.link}>Помощь</NavLink>
                        <NavLink to="/public_offer/" className={s.link}>Публичная оферта</NavLink>
                    </div>
                    <div>
                        <h3 className={s.columnTitle}>Контакты</h3>
                        {contactData.contact &&
                        contactData.contact.map(({phone}) => (
                            <a key={phone} href={`tel: ${phone}`} className={classNames(s.tel, iconLinkClass)}>{phone}</a>
                        ))}
                        {contactData.email &&
                        <a href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${contactData.email}`}
                           target="_blank" rel="noreferrer"
                           className={classNames(s.email, iconLinkClass)}>{contactData.email}</a>}
                    </div>
                    <div>
                        <h3 className={s.columnTitle}>Мы в социальных сетях:</h3>
                        {contactData.instagram &&
                        <a href={contactData.instagram} target="_blank" rel="noreferrer"
                           className={classNames(s.instagram, iconLinkClass)}>Instagram</a>}
                        {contactData.telegram &&
                        <a href={contactData.telegram} target="_blank" rel="noreferrer"
                           className={classNames(s.telegram, iconLinkClass)}>Telegram</a>}
                        {contactData.whatsapp &&
                        <a href={`https://wa.me/${contactData.whatsapp}`} target="_blank" rel="noreferrer"
                           className={classNames(s.whatsapp, iconLinkClass)}>Whatsapp</a>}
                    </div>
                </div>
                <div className={s.projectAuthor}>
                    Developed by
                    <a href="https://sunrisestudio.pro/" target="_blank" rel="noreferrer"> Sunrise Studio</a> 2021
                </div>
            </div>
        </footer>
    );
};

export default Footer;