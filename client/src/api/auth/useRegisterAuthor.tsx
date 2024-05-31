import React from 'react'
import useAxios from '../../hooks/useAxios';
import { useMutation } from 'react-query';

const useRegisterAuthor = () => {
  const axios = useAxios();
  const registerRequest = (data:any) => {
    return axios({
      url: `api/register/author`,
      data: data,
      method: 'POST',
    });
  };

  const request = useMutation(registerRequest);
  return request;
}

export default useRegisterAuthor