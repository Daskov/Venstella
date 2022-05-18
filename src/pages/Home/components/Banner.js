import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css';
import s from "../home.module.scss";
import {useEffect, useState} from "react";
import {fetchData} from "../../../utils/API";
import endpoints from "../../../utils/endpoints";
import {Preloader} from "../../../components/importar";

const Banners = () => {
    SwiperCore.use([Autoplay, Pagination])
    const [banners, setBanners] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchData(endpoints.banners)
            .then(data => {
                setBanners(data)
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return(
        <div className="mainBannerSwiper">
            {isLoading
                ? <Preloader/>
                : <Swiper autoplay={{delay: 4000, disableOnInteraction: false}}
                          loop={banners.length > 1}
                          pagination={{clickable: true}}
                          spaceBetween={12} speed={1000}
                  >
                    {banners.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <img src={banner.image} alt="" className={s.mainBanner}/>
                        </SwiperSlide>
                    ))}
                  </Swiper>
            }
        </div>
    )
}

export default Banners
