import s from "../modal.module.scss";
import {useField} from "formik";
import classNames from "classnames";

const Field = ({className, error, ...props}) => {
    const [field, meta] = useField(props)

    ///// classes
    const titleClass = classNames({
        [s.inputLabel]: true,
        [className]: true,
        [s.iconLabel]: true,
        [s.error]: meta.touched && meta.error
    })

    return (
        <label className={titleClass}>
            <input className={s.input} {...field} {...props}/>
        </label>
    );
};

export default Field;