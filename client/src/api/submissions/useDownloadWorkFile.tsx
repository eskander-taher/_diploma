import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

export const useDownloadWorkFile = ({ fileName: String ,options}) => {
  const axios = useAxios();

  const downladWorkRequest = () => {
    return axios({
      method: 'GET',
      url: `/api/submissions/download/${fileName}`,
      responseType: 'blob',
    });
  };

  const request = useQuery({ queryFn: downladWorkRequest, ...options });

  return request;
};
