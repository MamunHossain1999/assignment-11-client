import { Swiper, SwiperSlide } from "swiper/react";

import bgimg1 from '../assets/baked-zucchini-rolls-with-cheese-carrot-chicken-breast-flat-lay-top-view_2829-1396.avif';
import bgimg2 from '../assets/baked-zucchini-rolls-with-cheese-carrot-chicken-breast-flat-lay-top-view_2829-7778.avif';
import bgimg3 from '../assets/cabbage-with-sweet-pepper-dark-surface-view_87910-11562.avif';
import bgimg4 from '../assets/chicken-stir-fried-chili-along-with-bell-pepper-tomatoes-carrots_1150-27218.avif';
import bgimg5 from '../assets/close-up-baked-pattypan-squash-stuffed-with-rice-fried-chicken-meat-crispy-fried-bacon-red-bell-pepper-served-with-spinach-leaves-parsley-black-plate-with-f.avif';
import bgimg6 from '../assets/homemade-mexican-chicken-burrito-bowl-with-rice-beans-corn-tomato-zucchini-spinach-taco-salad-lunch-bowl_114579-247.avif';
import bgimg7 from '../assets/summer-vegetable-salad-decorated-with-nasturtium-flowers-healthy-vegetarian-food_75924-21165.avif';
import bgimg8 from '../assets/vegetable-cutlets-vegetarian-cutlets_75924-18446.avif'


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";



 
const Carousel = () => {
    return (
        <div className="w-11/12 mx-auto pt-14 md:pt-0 md:mt-1">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            loop
            className="h-96 md:h-[500px] lg:h-[400px] object-fill"
          >
           
            <SwiperSlide>
              <div className="relative h-full">
                <img
                  src={bgimg1}
                  alt="Adventure 1"
                  className="object-cover w-full md:h-[500px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    Explore the super star
                  </h2>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full">
                <img
                  src={bgimg2}
                  alt="Adventure 1"
                  className="object-cover w-full md:h-[500px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    Explore the super star
                  </h2>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full">
                <img
                  src={bgimg3}
                  alt="Adventure 1"
                  className="object-cover w-full md:h-[500px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    Explore the super star
                  </h2>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full">
                <img
                  src={bgimg4}
                  alt="Adventure 1"
                  className="object-cover w-full md:h-[500px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    Explore the super star
                  </h2>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full">
                <img
                  src={bgimg5}
                  alt="Adventure 1"
                  className="object-cover w-full md:h-[500px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    Explore the super star
                  </h2>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full">
                <img
                  src={bgimg6}
                  alt="Adventure 1"
                  className="object-cover w-full md:h-[500px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    Explore the super star
                  </h2>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full">
                <img
                  src={bgimg7}
                  alt="Adventure 1"
                  className="object-cover w-full md:h-[500px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    Explore the super star
                  </h2>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full">
                <img
                  src={bgimg8}
                  alt="Adventure 1"
                  className="object-cover w-full md:h-[500px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    Explore the super star
                  </h2>
                </div>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>
      );
};

export default Carousel;