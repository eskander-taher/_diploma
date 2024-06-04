import React from 'react'
import { useMutation, useQueryClient } from 'react-query';
import useAxios from '../../hooks/useAxios';

const useCreateSubmissions = () => {
 const axios = useAxios();

 const quiryClient = useQueryClient();

 const createSubmissionRequest = (data: any) => {
   return axios({
     url: `api/submissions/`,
     method: 'POST',
     data: data,
     headers: {
       'Content-Type': 'multipart/form-data',
     },
   });
 };

 const request = useMutation({
   mutationFn: createSubmissionRequest,
   onSuccess: () => {
     quiryClient.invalidateQueries({ queryKey: ['submissions'] });
   },
 });

 return request;
}

export default useCreateSubmissions