import React from 'react'
import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useVeriftyModerator = () => {
   const axios = useAxios();

   const quiryClient = useQueryClient();

   const deleteModeratorsRequist = (moderatorId: any) => {
     return axios({
       url: `api/users/mods/${moderatorId}/verify`,
       method: 'PACH',
     });
   };

   const request = useMutation({
     mutationFn: deleteModeratorsRequist,
     onSuccess: () => {
       quiryClient.invalidateQueries({ queryKey: ['moderators'] });
     },
   });

   return request;
}

export default useVeriftyModerator