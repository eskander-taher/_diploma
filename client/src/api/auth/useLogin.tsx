import useAxios from "../../hooks/useAxios";
import { useMutation } from "react-query";

const useLogin = () => {
  const axios = useAxios();

  const userRequest = (data) => {
    return axios({ url: `api/login/`, data: data, method: "POST" });
  };

  const request = useMutation(userRequest,{
    onSuccess:(data)=>{
      console.log(data)
    }
  });
  return request;
};

export default useLogin;
