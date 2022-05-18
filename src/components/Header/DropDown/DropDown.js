import s from "./dropDown.module.scss";
import {useEffect, useRef, useState} from "react";
import {useRecoilValue} from "recoil";
import {contactsState} from "../../../state";
import cs from 'classnames'

const DropDown = () => {
    const [isPhoneHidden, setIsPhoneHidden] = useState(false)
    const {contact} = useRecoilValue(contactsState)

    const phonesRef = useRef()
    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(phonesRef.current)) {
            setIsPhoneHidden(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
    },[])

    //////// classes
    const phoneListClass = cs({
        [s.phoneNumList]: true,
        [s.active]: isPhoneHidden
    })

    return (
        <div ref={phonesRef} className={`${s.headerRight}`}>
            <span className={s.contactUs}>Свяжитсь с нами:</span>
            <div className={s.dropDown} onClick={() => setIsPhoneHidden(!isPhoneHidden)}>
                <span className={s.telTitle}>Тел:</span>
                <div className={s.currentNum}>{contact && contact.length > 0 && contact[0].phone}</div>
            </div>
            <div className={phoneListClass}>
                {contact && contact.map(({phone}) => <a key={phone} href={`tel: ${phone}`}
                                                        className={s.phoneNum}>{phone}</a>)}
            </div>
        </div>
    );
};

export default DropDown;
