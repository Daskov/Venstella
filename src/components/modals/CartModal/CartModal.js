import { useState } from "react";
import { Formik, Form } from "formik";
import s from '../modal.module.scss'
import 'react-phone-input-2/lib/style.css'
import '../reset.scss'
import Field from "./Field";
import Checkbox from "./Checkbox";
import PhoneField from "./PhoneField";
import { cartValidate } from "../schema";
import cs from "classnames";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartState, modalState } from "../../../state";
import { submitCartForm } from "./index";

const CartModal = ({cartProducts}) => {
    const [modal, setModal] = useRecoilState(modalState)
    const closeModal = () => setModal(old => ({...old, cart: false}))
    const [flag, setFlag] = useState({
        validPhone: false,
        phoneDirty: false,
    })
    const handleFlag = (flag, value) => {
        setFlag(old => ({...old, [flag]: value}))
    }

    const [phoneField, setPhoneField] = useState('')
    const handlePhone = (phoneVal) => {
        setPhoneField(phoneVal)
        handleFlag('phoneDirty', true)
        phoneVal.length > 10 ? handleFlag('validPhone', true) : handleFlag('validPhone', false)
    }
    const handleBlur = () => {
        handleFlag('phoneDirty', true)
    }

    const setIsModalHidden = useSetRecoilState(modalState)
    const [error, setError] = useState('')
    const setCart = useSetRecoilState(cartState)
    const setSuccess = (success) => {
        setIsModalHidden((oldState => ({...oldState, cart: !success, success})))
        if (success) {
            const initialVal = {
                products: [],
                quantity: 0,
                totalPrice: 0,
                totalQuantity: 0,
            }
            setCart(initialVal)
            localStorage.setItem('cart', JSON.stringify(initialVal))
        }
    }

    const modalClass = cs({
        [s.wrap]: true,
        [s.active]: modal.cart
    })

    return (
        <div id={s.cartModal} className={modalClass}>
            <div className={s.outerClose} onClick={closeModal}/>
            <div className={s.modal}>
                <div className={s.close} onClick={closeModal}/>
                <h3 className={s.title} onClick={() => handleFlag('validPhone', false)}>Оформление заказа</h3>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        country: '',
                        city: '',
                        checkbox: false,
                    }}
                    validationSchema={cartValidate}
                    onSubmit={values => submitCartForm(values, phoneField, setSuccess, setError)}
                >
                    {formik => (
                        <Form>
                            <div className={s.fields}>
                                <Field inputTitle="Ваше имя" name="firstName" type="text" placeholder="Например Иван"/>
                                <Field inputTitle="Ваше фамилия" name="lastName" type="text"
                                       placeholder="Например Иванов"/>
                                <Field inputTitle="Электронная почта" name="email" type="email"
                                       placeholder="example@mail.com"/>
                                <PhoneField phoneDirty={flag.phoneDirty} validPhone={flag.validPhone}
                                            handleBlur={handleBlur} error={error}
                                            handlePhone={handlePhone} inputTitle="Ваш номер телефона" name="phone"
                                            type="text"/>
                                <Field inputTitle="Страна" name="country" type="text" placeholder="Введите страну"/>
                                <Field inputTitle="Город" name="city" type="text" placeholder="Введите город"/>
                            </div>
                            <Checkbox name="checkbox" type="checkbox"/>
                            <button disabled={!(formik.isValid && formik.dirty && flag.validPhone) || cartProducts.length === 0}
                                    onClick={() => handleFlag('phoneDirty', true)} type="submit" className={s.submit}>
                                Заказать
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CartModal;