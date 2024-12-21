import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

import 'swiper/css';
import bgimg1 from '../assets/baked-zucchini-rolls-with-cheese-carrot-chicken-breast-flat-lay-top-view_2829-1396.avif';
import bgimg2 from '../assets/baked-zucchini-rolls-with-cheese-carrot-chicken-breast-flat-lay-top-view_2829-7778.avif';
import bgimg3 from '../assets/cabbage-with-sweet-pepper-dark-surface-view_87910-11562.avif';
import bgimg4 from '../assets/chicken-stir-fried-chili-along-with-bell-pepper-tomatoes-carrots_1150-27218.avif';
import bgimg5 from '../assets/close-up-baked-pattypan-squash-stuffed-with-rice-fried-chicken-meat-crispy-fried-bacon-red-bell-pepper-served-with-spinach-leaves-parsley-black-plate-with-f.avif';
import bgimg6 from '../assets/homemade-mexican-chicken-burrito-bowl-with-rice-beans-corn-tomato-zucchini-spinach-taco-salad-lunch-bowl_114579-247.avif';
import bgimg7 from '../assets/summer-vegetable-salad-decorated-with-nasturtium-flowers-healthy-vegetarian-food_75924-21165.avif';
import bgimg8 from '../assets/vegetable-cutlets-vegetarian-cutlets_75924-18446.avif'
 
const Carousel = () => {
    return (
        <div className='container px-6 py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        Pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text='Get Your Web Development Projects Done in minutes'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text='Get Your Graphics Design Projects Done in minutes'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text='Start Your Digital Marketing Campaigns up n running'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg4}
            text='Start Your Digital Marketing Campaigns up n running'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg5}
            text='Start Your Digital Marketing Campaigns up n running'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg6}
            text='Start Your Digital Marketing Campaigns up n running'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg7}
            text='Start Your Digital Marketing Campaigns up n running'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg8}
            text='Start Your Digital Marketing Campaigns up n running'
          />
        </SwiperSlide>
      </Swiper>
    </div>
    );
};

export default Carousel;