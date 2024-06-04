import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useListSubmissionsByMod = (id: any) => {
  const axios = useAxios();

  const ListSubmissionRequest = () => {
    return axios({
      url: `api/submissions/mod/${id}`,
    });
  };

  const request = useQuery(['submissions'], ListSubmissionRequest);

  return request;
};

export default useListSubmissionsByMod;
