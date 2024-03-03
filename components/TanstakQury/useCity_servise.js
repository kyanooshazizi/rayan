import { useQuery } from "react-query";
// import geturl from "../utilsFunction/getUrl";
const useCity_servise = () => {
  const {data:datacity,isError:error_city,isLoading:loadcity,error} = useQuery(
    "cities",
     () =>  fetch(
        `https://mohaddesepkz.pythonanywhere.com/cities/`
      ).then(res=>res.json())
  );
  const {data:dataservise,isError:error_service,isLoading:loadservice} = useQuery(
    "service",
     () =>  fetch(
        `https://mohaddesepkz.pythonanywhere.com/options/packages/`
      ).then(res=>res.json())
  );
  

  return { datacity, dataservise,error_city,error_service,loadcity,loadservice,error};
};

export default useCity_servise;
