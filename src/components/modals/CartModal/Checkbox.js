import s from "../modal.module.scss";
import {useField} from "formik";
import {NavLink} from "react-router-dom";
import classNames from "classnames";

const Checkbox = (props) => {
    const [checkbox, meta] = useField(props)

    ///////classes
    const checkboxClass = classNames({
        [s.checkbox]: true,
        [s.error]: !meta.value && meta.touched
    })
    return (
        <div className={s.agreement}>
            <label className={s.checkMark}>
                <input {...checkbox} {...props} className={s.checkInput}/>
                <span className={checkboxClass}/>
            </label>
            <p className={s.agreementText}>
                Согласен с условиями<NavLink to="/public_offer/" target="_blank" className={s.agreementLink}> публичной оферты</NavLink>
            </p>
        </div>
    );
};

export default Checkbox;