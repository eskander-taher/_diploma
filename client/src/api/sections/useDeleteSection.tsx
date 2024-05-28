import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useDeleteSection = () => {
  const axios = useAxios();

  const quiryClient = useQueryClient();

  const deleteSectionRequist = (sectionId:any) => {
    return axios({
      url: `api/sections/${sectionId}`,
      method: 'DELETE',
    });
  };

  const request = useMutation({
    mutationFn: deleteSectionRequist,
    onSuccess: () => {
      quiryClient.invalidateQueries({ queryKey: ['sections'] });
    },
  });

  return request;
};

export default useDeleteSection;
