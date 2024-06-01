import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import EventCard from '../../components/EventCard';
import useEventList from '../../api/events/useEventList';

const Events = () => {
  const { data, isLoading, error } = useEventList();
  console.log(data);
  return (
    <DefaultLayout>
      <div className="flex flex-wrap gap-5 flex-col">
        {isLoading ? (
          <></>
        ) : (
          data?.data?.map((event) => {
            return <EventCard {...event} key={event} />;
          })
        )}
      </div>
    </DefaultLayout>
  );
};

export default Events;
