import React from 'react'
import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

export const useGetEvent = (eventId) => {
  const axios = useAxios();

  const LisrEventsRequest = () => {
    return axios({
      url: `api/events/${eventId}`,
    });
  };

  const request = useQuery(['events'], LisrEventsRequest);

  return request;
}
