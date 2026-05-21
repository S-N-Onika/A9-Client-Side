import React, { useRef } from "react";
import BaseSlider from "react-slick";
import { Link } from "react-router-dom";
import { LuArrowRight, LuChevronLeft, LuChevronRight, LuCirclePlus, LuAward } from "react-icons/lu";

import bannerImg from "../assets/l1.jpg";
import banner1Img from "../assets/l2.jpg";
import banner2Img from "../assets/l3.jpg";
import banner3Img from "../assets/l4.jpg";
import banner4Img from "../assets/l5.webp";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = BaseSlider.default || BaseSlider;

export default function Banner() {
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        fade: true,
        cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
        arrows: false,
    };

    const images = [bannerImg, banner1Img, banner2Img, banner3Img, banner4Img];

    return (
        <section className="relative w-full h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden bg-[#2C1A11] border-b-4 border-[#C29B38]">
            <div
                className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-30 cursor-pointer bg-white/10 hover:bg-[#5C2E16] text-[#C29B38] hover:text-white p-2 md:p-3 rounded-full shadow-lg transition-all hidden md:block"
                onClick={() => sliderRef.current?.slickPrev()}
            >
                <LuChevronLeft size={24} />
            </div>
            <div
                className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-30 cursor-pointer bg-white/10 hover:bg-[#5C2E16] text-[#C29B38] hover:text-white p-2 md:p-3 rounded-full shadow-lg transition-all hidden md:block"
                onClick={() => sliderRef.current?.slickNext()}
            >
                <LuChevronRight size={24} />
            </div>

            <div className="absolute inset-0 z-0">
                <Slider ref={sliderRef} {...settings} className="h-full">
                    {images.map((image, index) => (
                        <div key={index} className="relative h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px] w-full">
                            <img
                                src={image}
                                alt={`Library Slide ${index}`}
                                className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
                            />
                            <div className="absolute inset-0 bg-black/40 z-10" />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="max-w-2xl w-full text-center md:text-left space-y-4 md:space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C29B38]/20 border border-[#C29B38]/40 text-[#C29B38] text-xs uppercase tracking-widest font-bold">
                        <LuAward className="w-4 h-4" />
                        <span>Verified Library Network</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-white drop-shadow-lg leading-tight">
                        Reserve Premium<br className="hidden sm:block" /> Scholar
                        <span className="text-[#C29B38] italic font-normal"> Chambers</span>
                    </h1>

                    <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-md mx-auto md:mx-0 leading-relaxed tracking-wide">
                        Reserve beautifully maintained study rooms designed for deep focus, collaboration, and uninterrupted learning.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2 md:pt-4">
                        <Link
                            to="/rooms"
                            className="group inline-flex items-center justify-center gap-2 bg-[#C29B38] text-[#2C1A11] px-6 py-3 md:px-8 md:py-4 rounded font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#A6822E] hover:-translate-y-1 transition-all active:scale-95"
                        >
                            Explore Rooms
                            <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            to="/AddRoom"
                            className="inline-flex items-center justify-center gap-2 border-2 border-stone-400 hover:border-[#C29B38] text-stone-200 hover:text-white px-6 py-3 md:px-8 md:py-4 rounded font-bold text-xs uppercase tracking-widest transition-all hover:-translate-y-1 active:scale-95"
                        >
                            <LuCirclePlus className="w-4 h-4" />
                            <span>Become a Host</span>
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                .slick-dots { 
                    bottom: 15px; 
                }
                @media (min-width: 768px) {
                    .slick-dots { bottom: 30px; }
                }
                .slick-dots li button:before { 
                    color: #C29B38 !important; 
                    font-size: 8px; 
                    opacity: 0.5; 
                }
                .slick-dots li.slick-active button:before { 
                    color: #C29B38 !important; 
                    opacity: 1; 
                    font-size: 12px;
                }
                .slick-list, .slick-track { height: 100%; }
            `}</style>
        </section>
    );
}
