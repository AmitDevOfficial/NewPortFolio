import React from "react";
import "./section2home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import brand01 from "../images/sliderImg/brand-big-01.png";
import brand02 from "../images/sliderImg/brand-big-02.png";
import brand03 from "../images/sliderImg/brand-big-03.png";
import brand04 from "../images/sliderImg/brand-big-04.png";
import brand05 from "../images/sliderImg/brand-big-05.png";
import brand06 from "../images/sliderImg/brand-big-06.png";


export default function Section2Home() {

    const settings = {
        infinite: true,
        speed: 8000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        arrows: false
    };

    return (
        <div className="#" style={{ width: "100%", margin: "auto" }}>
            <Slider {...settings} className="slickSliderSectionTwo">
               
                    <div>
                        <img src={brand01} alt="Slide 1" />
                    </div>
                    <div>
                        <img src={brand02} alt="Slide 1" />
                    </div>
                    <div>
                        <img src={brand03} alt="Slide 1" />
                    </div>
                    <div>
                        <img src={brand04} alt="Slide 1" />
                    </div>
                    <div>
                        <img src={brand05} alt="Slide 1" />
                    </div>
                    <div>
                        <img src={brand06} alt="Slide 1" />
                    </div>
               
            </Slider>
        </div>
    )
}

