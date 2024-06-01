import { useQuery } from "react-query";
import useAxios from '../../hooks/useAxios';

const useEventList = () => {
  const axios = useAxios();

  const LisrEventsRequest = () => {
    return axios({
      url: `api/events/`,
    });
  };

  const request = useQuery(['events'], LisrEventsRequest);

  return request;
};

export default useEventList;
