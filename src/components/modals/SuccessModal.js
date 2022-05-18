import s from "./modal.module.scss";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {modalState} from "../../state";

const SuccessModal = () => {
    const modal = useRecoilValue(modalState)
    const setModal = useSetRecoilState(modalState)
    const closeModal = () => {
        setModal(oldState => ({...oldState, success: false}))
    }
    ///// classes
    const modalWrapClass = classNames({
        [s.wrap]: true,
        [s.active]: modal.success
    })
    const modalClass = classNames({
        [s.modal]: true,
        [s.successModal]: true
    })
    return (
        <div id={s.successModal} className={modalWrapClass}>
            <div className={s.outerClose} onClick={closeModal}/>
            <div className={modalClass}>
                <h3 className={s.title}>Спасибо!</h3>
                <p className={s.subtitle}>Ваша заявка была принята ожидайте, скоро Вам перезвонят</p>
                <NavLink to="/" className={s.submit} onClick={closeModal}>Продолжить покупки</NavLink>
            </div>
        </div>
    );
};

export default SuccessModal;