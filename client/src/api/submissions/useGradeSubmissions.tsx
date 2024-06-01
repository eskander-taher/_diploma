import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useMutation } from 'react-query';

const useGradeSubmissions = () => {
  const axios = useAxios();

  const gradeSubmissionRequest = (data: any) => {
    return axios({
      url: `api/submissions/${data.subId}/grade`,
      method: 'POST',
      data: data,
    });
  };

  const request = useMutation({
    mutationFn: gradeSubmissionRequest,
  });

  return request;
};

export default useGradeSubmissions;
