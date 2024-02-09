import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const index = () => {
  const x = Array(3).fill(0);
  console.log(x)
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <Slider {...settings}>
        {x.map((item, index) => {
          return <div key={index} className="bg-[#fff] h-[400px] rounded-[30px]">
            <div className="w-full h-[200px] bg-bgcolor rounded-t-[30px]"></div>
            <div className="w-full h-[200px]"></div>
          </div>
        })}
      </Slider>
    </div>
  );
};

export default index;
