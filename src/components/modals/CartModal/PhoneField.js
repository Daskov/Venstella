import s from "../modal.module.scss";
import PhoneInput from "react-phone-input-2";
import classNames from "classnames";
import PropTypes from "prop-types";

const PhoneField = ({inputTitle, name, handlePhone, handleBlur, phoneDirty, validPhone, type, error}) => {
    ////// classes
    const titleClass = classNames({
        [s.inputTitle]: true,
        [s.error]: !validPhone && phoneDirty
    })
    return (
        <div>
            <span className={titleClass}>{inputTitle}</span>
            <label className={s.inputLabel}>
                <PhoneInput country={'ru'} onlyCountries={['kg', 'ru']}
                            inputProps={{name: name, placeholder: 'Введите номер телефона', type}}
                            masks={{kg: '(...) ..-..-..', ru: '(...) ...-..-..'}}
                            onChange={phoneVal => handlePhone(phoneVal)} onBlur={handleBlur}/>
            </label>
            <span className={s.errorText}>{error}</span>
        </div>
    );
};

PhoneField.propTypes = {
    inputTitle: PropTypes.string,
    name: PropTypes.string,
    handlePhone: PropTypes.func,
    handleBlur: PropTypes.func,
    phoneDirty: PropTypes.bool,
    validPhone: PropTypes.bool,
    type: PropTypes.string,
    error: PropTypes.string,
}

export default PhoneField;