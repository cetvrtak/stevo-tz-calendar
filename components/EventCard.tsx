import React from "react";
import './EventCard.scss';

type Event = {
    year: number,
    desc: string,
}

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="evt-card">
            <span className='evt-year'>{event.year}</span>
            <span className='evt-desc'>{event.desc}</span>
        </div>
    )
}

export default EventCard;