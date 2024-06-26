import useAxios from '../../hooks/useAxios';
import { useMutation } from 'react-query';

const useGradeSubmissions = () => {
  const axios = useAxios();

  const gradeSubmissionRequest = (data: any) => {
    console.log(data)
    return axios({
      url: `api/submissions/grade/${data.subId}`,
      data: data.payload,
      method: 'PUT',
    });
  };

  const request = useMutation({
    mutationFn: gradeSubmissionRequest,
  });

  return request;
};

export default useGradeSubmissions;
