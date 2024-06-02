import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useVeriftyModerator = () => {
  const axios = useAxios();

  const quiryClient = useQueryClient();

  const deleteModeratorsRequist = (moderatorId: any) => {
    return axios({
      url: `api/verify-mod/${moderatorId}`,
      method: 'PUT',
    });
  };

  const request = useMutation({
    mutationFn: deleteModeratorsRequist,
    onSuccess: () => {
      quiryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return request;
};

export default useVeriftyModerator;
