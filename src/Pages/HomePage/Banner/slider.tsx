import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./Banner.css"
import 'swiper/css';
import { Link } from "react-router-dom";


const Slider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          {" "}
          <div className="slide slide1 h-[50vh] md:h-[650px] slide-1 rounded-xl flex flex-col justify-center">
            <div className=" ml-5 md:ml-16 space-y-5 border-l-4 border-amber-400 pl-2 md:pl-5">
              <h1 className="text-xl  font-medium text-white">
                Welcome To BookStore
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Explore To Find <br /> Quality full Books{" "}
              </h2>
            </div>

            <div className="md:ml-16 my-5  pl-5">
              <Link to="/all-product">
                <button className="btn btn-outline text-white border-amber-400">
                  Discover Now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide> <div className="slide slide2 h-[50vh] md:h-[650px] slide-1 rounded-xl flex flex-col justify-center">
            <div className=" ml-5 md:ml-16 space-y-5 border-l-4 border-amber-400 pl-2 md:pl-5">
              <h1 className="text-xl  font-medium text-white">
                Welcome To BookStore
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Explore To Find <br /> Quality full Books{" "}
              </h2>
            </div>

            <div className="md:ml-16 my-5  pl-5">
              <Link to="/all-product">
                <button className="btn btn-outline text-white border-amber-400">
                  Discover Now
                </button>
              </Link>
            </div>
          </div></SwiperSlide>
        <SwiperSlide> <div className="slide slide3 h-[50vh] md:h-[650px] slide-1 rounded-xl flex flex-col justify-center">
            <div className=" ml-5 md:ml-16 space-y-5 border-l-4 border-amber-400 pl-2 md:pl-5">
              <h1 className="text-xl  font-medium text-black">
                Welcome To BookStore
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
                Explore To Find <br /> Quality full Books{" "}
              </h2>
            </div>

            <div className="md:ml-16 my-5  pl-5">
              <Link to="/all-product">
                <button className="btn btn-outline text-black border-amber-400">
                  Discover Now
                </button>
              </Link>
            </div>
          </div></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
