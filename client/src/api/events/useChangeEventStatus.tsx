import useAxios from '../../hooks/useAxios';
import { useMutation } from 'react-query';

const useChangeEventStatus = () => {
  const axios = useAxios();

  const getRequest = (params:any) => {
    return axios({
      url: `api/events/${params}`,
      method: 'PUT',
    });
  };

  const request = useMutation({
    mutationFn: getRequest,
  });

  return request;
};

export default useChangeEventStatus;
