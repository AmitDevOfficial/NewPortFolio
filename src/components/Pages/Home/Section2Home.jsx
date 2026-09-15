import { useState } from "react";
import "./section2home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { resolveBrandImage } from "../../../data/brandsData";
import { loadBrands } from "../../../utils/brandsStore";

export default function Section2Home() {

    const [brands] = useState(() => loadBrands());

    const settings = {
        infinite: true,
        speed: 8000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        arrows: false,
        pauseOnHover: false,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 576, settings: { slidesToShow: 2 } }
        ]
    };

    return (
        <div className="brandSliderWrap section-spacing">
            <div className="container">
                <span className="socialSubTitle">Trusted technologies I build with</span>
            </div>
            <Slider {...settings} className="slickSliderSectionTwo">
                {brands.map((brand) => (
                    <div key={brand.id}>
                        <img src={resolveBrandImage(brand)} alt={brand.alt} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}
