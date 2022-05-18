import s from '../modal.module.scss'
import {Formik, Form} from "formik";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {modalState} from "../../../state";
import Field from "./Field";
import cs from "classnames";
import {useState} from "react";
import {feedbackValidate} from "../schema";
import {submitFeedback} from "./index";

const SupportModal = () => {
    const modal = useRecoilValue(modalState)
    const setIsModalHidden = useSetRecoilState(modalState)
    const [error, setError] = useState('')

    const closeModal = () => {
        setIsModalHidden((oldState => ({...oldState, feedback: false})))
    }
    const setSuccess = (success) => {
        setIsModalHidden((oldState => ({...oldState, feedback: !success, success})))
        setError('')
    }

    ////// classes
    const modalClass = cs({
        [s.wrap]: true,
        [s.active]: modal.feedback
    })
    return (
        <div id={s.supportModal} className={modalClass}>
            <div className={s.outerClose} onClick={closeModal}/>
            <div className={s.modal}>
                <div className={s.close} onClick={closeModal}/>
                <h3 className={s.title}>Если у Вас остались вопросы</h3>
                <p className={s.subtitle}>Оставьте заявку и мы обязательно Вам перезвоним</p>
                <Formik
                    initialValues={{
                        name: '',
                        phone_number: '',
                    }}
                    validationSchema={feedbackValidate}
                    onSubmit={values => submitFeedback(values, setSuccess, setError)}
                >
                    {formik => (
                        <Form>
                            <div className={s.fields}>
                                <Field name="name" type="text" placeholder="Как к Вам обращаться?" className={s.person}/>
                                <Field name="phone_number" type="text" placeholder="Номер телефона" className={s.tel} error={error}/>
                                {error && <p className={s.feedbackError}>{error}</p>}
                            </div>
                            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className={s.submit}>Заказать звонок</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SupportModal;