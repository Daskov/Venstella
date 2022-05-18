import {useCallback, useEffect, useState} from "react";
import {contactsState, footerState, modalState} from "../../state";
import {useRecoilValue, useSetRecoilState} from "recoil";
import s from './fixedIcons.module.scss'
import cs from "classnames";

const FixedIcons = () => {
    const contacts = useRecoilValue(contactsState)
    const footer = useRecoilValue(footerState)
    const setModal = useSetRecoilState(modalState)
    const [icon, setIcon] = useState({
        isHidden: false,
        isOnFooter: false,
    })

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    const showSupportModal = useCallback(() => {
        setModal(oldState => ({...oldState, feedback: true}))
        setIcon(old => ({...old, isHidden: false}))
    }, [setModal, icon])

    const setFooter = ([IntersectionObserverEntry]) => {
        IntersectionObserverEntry.isIntersecting
            ? setIcon(old => ({...old, isOnFooter: true}))
            : setIcon(old => ({...old, isOnFooter: false}))
    }
    const options = {
        root: null,
        rootMargin: document.body.clientHeight - (document.body.clientHeight - (footer && footer.clientHeight) + 185) + 'px',
        threshold: 1.0,
    }
    useEffect(() => {
        const observer = new IntersectionObserver(setFooter, options)
        if (footer) observer.observe(footer)

        return () => {
            if (footer) observer.unobserve(footer)
        }
    }, [options])

///////////////// classes
    const iconsWrapClass = cs({
        [s.icons]: true,
        [s.active]: icon.isHidden,
    })
    const callIconsClass = cs({
        [s.callIcons]: true,
        [s.active]: icon.isHidden,
        [s.whiteStroke]: icon.isOnFooter,
    })
    const toUpClass = cs({
        [s.toUp]: true,
        [s.whiteStroke]: icon.isOnFooter,
    })

    return (
        <div className={s.fixedIconsWrap}>
            <div className={s.fixedIcons}>
                <div className={toUpClass} onClick={scrollToTop}/>
                <div className={s.iconsWrap}>
                    <div className={iconsWrapClass}>
                        {contacts &&
                        <a href={contacts.telegram} target="_blank" rel="noreferrer"
                           className={cs(s.icon, s.telegram)}/>}
                        {contacts &&
                        <a href={`https://wa.me/${contacts.whatsapp}`} target="_blank" rel="noreferrer"
                           className={cs(s.icon, s.whatsapp)}/>}
                        <div className={cs(s.icon, s.tel)} onClick={showSupportModal}/>
                    </div>
                    <div className={callIconsClass} onClick={() => setIcon(old => ({...old, isHidden: !old.isHidden}))}>
                        <div className={s.ring}/>
                        <div className={s.ring}/>
                        <div className={s.ring}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FixedIcons;
