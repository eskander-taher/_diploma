import { useQuery } from "react-query";
import useAxios from "../../hooks/useAxios";

const useLisrSections = () => {
  const axios = useAxios();

  const LisrSectionsRequest = () => {
    return axios({
      url: `api/sections/`,
    });
  };

  const request = useQuery(
    ["sections"],
    LisrSectionsRequest
  );

  return request;
};

export default useLisrSections;
