import React from 'react'
import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useListSubmissions = () => {
 const axios = useAxios();

 const LisrSubmissionRequest = () => {
   return axios({
     url: `api/submissions/`,
   });
 };

 const request = useQuery(['submissions'], LisrSubmissionRequest);

 return request;
}

export default useListSubmissions