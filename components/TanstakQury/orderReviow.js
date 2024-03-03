import { useQuery } from "react-query";
import { setCookie, getCookie } from "cookies-next";
const useorderReviow = () => {
  const {data:orderReviw,isError:error_orderReviw,isLoading:isloadorderReviw} = useQuery(
        "preOrder",
        () => {
          return fetch(
            `https://mohaddesepkz.pythonanywhere.com/orders/${getCookie(
              "code"
            )}/${getCookie("id_business")}/`,
            {
              headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
              },
            }
          ).then((res) => res.json());
        },
        {
          onSuccess: (data) => {
            console.log("sss", data);
          },
        }
      );
  
  

  return {orderReviw,error_orderReviw,isloadorderReviw};
};

export default useorderReviow;