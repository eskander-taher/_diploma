import React from 'react'
import useAxios from '../../hooks/useAxios';
import { useMutation } from 'react-query';

const useRegisterModerator = () => {
   const axios = useAxios();
   const registerRequest = (data) => {
     return axios({ url: `api/register/mod`, data: data, method: 'POST' });
   };

   const request = useMutation(registerRequest);
   return request;
}

export default useRegisterModerator