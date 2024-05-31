import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useParams } from 'react-router-dom';
import { useGetEvent } from '../../api/events/useGetEvent';
import {useQuery} from 'react-query'
const Event = () => {
  const { eventId } = useParams();

  const { data, isLoading, error } = useGetEvent(eventId);

  console.log(data)
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <></>
        ) : (
          <>
            <div className=" bg-white rounded-md shadow-md p-4">
              <h1 className="text-3xl  text-primary font-semibold text-center">
                {data.data.name}
              </h1>
              {data.data.description}
            </div>
          </>
        )}
        {data.data.status !== 'going' ? (
          <div className="inline-flex items-center justify-center rounded-md bg-graydark py-4 px-10 text-center font-medium text-white text-xl">
            {data.data.status}
          </div>
        ) : (
          <Link
            to={`/events/${eventId}/add-submission`}
            className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            create submission
          </Link>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Event;
