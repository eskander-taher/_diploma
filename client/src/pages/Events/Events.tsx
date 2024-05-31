import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import EventCard from '../../components/EventCard';


const Events = () => {
  return (
    <DefaultLayout>
     <div className="flex flex-wrap gap-5 flex-col">
        <EventCard />
     </div>
    </DefaultLayout>
  );
};

export default Events;
