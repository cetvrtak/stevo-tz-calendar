import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss';
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
    useEffect(() => {
        console.log('Initializing Swiper');

    }, []);

    return (
        <Swiper
            spaceBetween={80}
            slidesPerView={3}
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