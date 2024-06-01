import React from 'react'
import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useListModerators = () => {
  const axios = useAxios();

  const ListModsRequest = () => {
    return axios({
      url: `api/users/mods`,
    });
  };

  const request = useQuery(['mods'], ListModsRequest);

  return request;
}

export default useListModerators