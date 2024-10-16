import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import './YearSwiper.scss';
import EventCard from './EventCard';

type Event = {
    year: number,
    desc: string,
}

interface YearSwiperProps {
    events: Event[];
}

const YearSwiper: React.FC<YearSwiperProps> = ({ events }) => {
    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={80}
            slidesPerView={3}
            navigation
        >
            {events.map((e) => (
                <SwiperSlide key={e.year}>
                    <EventCard event={e} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default YearSwiper;