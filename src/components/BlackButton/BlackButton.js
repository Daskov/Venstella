import React from 'react';
import s from "./blackButton.module.scss";

const BlackButton = ({count, setData}) => {
    return (
        <div className={s.moreWrap}>
            <div className={s.more} onClick={() => setData(old => ({...old, count: count + 4}))}>Ещё</div>
        </div>
    );
};

export default BlackButton;