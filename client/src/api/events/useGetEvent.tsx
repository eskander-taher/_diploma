import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

export const useGetEvent = (eventId) => {
  const axios = useAxios();
  console.log(eventId);

  const LisrEventsRequest = () => {
    return axios({
      url: `api/events/${eventId}`,
    });
  };

  const request = useQuery({
    queryKey: ['events',eventId],
    queryFn: LisrEventsRequest,
  });

  return request;
};
