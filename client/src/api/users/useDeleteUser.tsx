import React from 'react'
import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useDeleteUser = () => {
   const axios = useAxios();

   const quiryClient = useQueryClient();

   const deleteUserRequist = (userId) => {
     return axios({
       url: `api/users/${userId}`,
       method: 'DELETE',
     });
   };

   const request = useMutation({
     mutationFn: deleteUserRequist,
     onSuccess: () => {
       quiryClient.invalidateQueries({ queryKey: ['users'] });
     },
   });

   return request;
}

export default useDeleteUser