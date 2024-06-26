import useAxios from "../auth/useAxios";
import { useMutation, useQueryClient } from "react-query";

const useCreateSection = () => {
  const axios = useAxios();

   const quiryClient = useQueryClient();

  const createSectionRequest = (data:any) => {
    return axios({
      url: `api/sections/`,
      method: "POST",
      data: data,
     
    });
  };

  const request = useMutation({
    mutationFn: createSectionRequest,
    onSuccess: () => {
      quiryClient.invalidateQueries({ queryKey: ['sections'] });
    },
  });

  return request;
};

export default useCreateSection;
