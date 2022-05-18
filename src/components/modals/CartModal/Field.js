import s from "../modal.module.scss";
import {useField} from "formik";
import classNames from "classnames";

const Field = ({inputTitle, ...props}) => {
    const [field, meta] = useField(props)

    ///// classes
    const titleClass = classNames({
        [s.inputTitle]: true,
        [s.error]: meta.touched && meta.error
    })
    return (
        <div>
            <span className={titleClass}>{inputTitle}</span>
            <label className={s.inputLabel}>
                <input {...field} {...props} autoComplete="off" className={s.input}/>
            </label>
        </div>
    );
};

export default Field;