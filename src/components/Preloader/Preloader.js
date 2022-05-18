import React from 'react';
import s from './preloader.module.scss'

const Preloader = () => {
    return (
        <div className={s.preloader}>
            Загрузка...
        </div>
    );
};

export default Preloader;
