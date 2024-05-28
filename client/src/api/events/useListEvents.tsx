import { useQuery } from "react-query";
import useAxios from '../../hooks/useAxios';

const useLisrEvents = () => {
  const axios = useAxios();

  const LisrEventsRequest = () => {
    return axios({
      url: `api/events/`,
    });
  };

  const request = useQuery(
    ["events"],
    LisrEventsRequest
  );

  return request;
};

export default useLisrEvents;
