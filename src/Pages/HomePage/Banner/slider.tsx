import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = () => {
  const slides = [
    {
      id: 1,
      bgClass: "bg-gradient-to-r from-blue-900 to-blue-700",
      titleColor: "text-white",
      subtitleColor: "text-amber-300",
      buttonStyle: "btn-outline text-white border-amber-400 hover:bg-amber-400 hover:text-gray-900",
      image: "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
    },
    {
      id: 2,
      bgClass: "bg-gradient-to-r from-purple-900 to-indigo-800",
      titleColor: "text-white",
      subtitleColor: "text-amber-300",
      buttonStyle: "btn-outline text-white border-amber-400 hover:bg-amber-400 hover:text-gray-900",
      image: "url('https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80')"
    },
    {
      id: 3,
      bgClass: "bg-gradient-to-r from-amber-100 to-amber-50",
      titleColor: "text-gray-900",
      subtitleColor: "text-white",
      buttonStyle: "btn-outline text-white border-white hover:bg-white hover:text-black",
      image: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80')"
    }
  ];

  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={'fade'}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className={`h-[60vh] md:h-[80vh] w-full bg-cover bg-center flex items-center relative ${slide.bgClass}`}
              style={{ backgroundImage: slide.image }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Content */}
              <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl space-y-6 border-l-4 border-amber-400 pl-6 transition-all duration-700 transform translate-y-10 swiper-slide-active:translate-y-0">
                  <h1 className={`text-2xl md:text-3xl font-medium ${slide.titleColor} opacity-0 swiper-slide-active:opacity-100 transition-opacity duration-500 delay-200`}>
                    Welcome To Book Haven
                  </h1>
                  <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight ${slide.subtitleColor} opacity-0 swiper-slide-active:opacity-100 transition-opacity duration-500 delay-300`}>
                    Discover Your Next <br /> Favorite Read
                  </h2>
                  <div className="opacity-0 swiper-slide-active:opacity-100 transition-opacity duration-500 delay-500">
                    <Link to="/all-product">
                      <button className={`btn px-8 py-3 text-lg font-semibold rounded-none transition-all duration-300 ${slide.buttonStyle}`}>
                        Explore Collection
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-next hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition-all duration-300 right-4"></div>
        <div className="swiper-button-prev hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition-all duration-300 left-4"></div>
      </Swiper>

      {/* Custom Pagination */}
      <style>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255,255,255,0.5);
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: #f59e0b;
          width: 30px;
          border-radius: 4px;
        }
        .swiper-slide-active h1,
        .swiper-slide-active h2,
        .swiper-slide-active div {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      <style>{`
        :global(.swiper-pagination-bullet) {
          width: 12px;
          height: 12px;
          background: rgba(255,255,255,0.5);
          opacity: 1;
          transition: all 0.3s;
        }
        :global(.swiper-pagination-bullet-active) {
          background: #f59e0b;
          width: 30px;
          border-radius: 4px;
        }
        :global(.swiper-slide-active h1),
        :global(.swiper-slide-active h2),
        :global(.swiper-slide-active div) {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default Slider;