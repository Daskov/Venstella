import s from "./sliderItem.module.scss";
import {Fragment} from "react";

const SliderItem = ({image, slider}) => {
    return (
        <Fragment>
            {slider && <div className={s.sliderThumb}/>}
            <img src={image} alt="" className={s.image}/>
        </Fragment>
    );
};

export default SliderItem;