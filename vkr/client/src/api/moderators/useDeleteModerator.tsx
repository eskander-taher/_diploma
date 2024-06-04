import React from 'react'
import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useDeleteModerator = () => {
 const axios = useAxios();

 const quiryClient = useQueryClient();

 const deleteModeratorsRequist = (moderatorId: any) => {
   return axios({
     url: `api/users/mods/${moderatorId}`,
     method: 'DELETE',
   });
 };

 const request = useMutation({
   mutationFn: deleteModeratorsRequist,
   onSuccess: () => {
     quiryClient.invalidateQueries({ queryKey: ['users'] });
   },
 });

 return request;
}

export default useDeleteModerator