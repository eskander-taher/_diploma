import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery, useQueryClient } from 'react-query';

const useGetUserProfile = () => {
  const axios = useAxios();

  const deleteUserRequist = (userId) => {
    return axios({
      url: `api/users/${userId}`,
      method: 'GET',
    });
  };

  const request = useQuery(['user-profile'],deleteUserRequist);

  return request;
};

export default useGetUserProfile;
