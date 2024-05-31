import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useParams } from 'react-router-dom';
import { useGetEvent } from '../../api/events/useGetEvent';

const Event = () => {
  const { eventId } = useParams();

  const { data, isLoading, error } = useGetEvent(eventId);
  return (
    <DefaultLayout>
      event
      <Link
        to={`/events/${eventId}/add-submission`}
        className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        create submission
      </Link>
    </DefaultLayout>
  );
};

export default Event;
