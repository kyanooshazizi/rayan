import { useQuery } from "@tanstack/react-query";
// import geturl from "../utilsFunction/getUrl";
const useCity_servise = () => {
  const datacity = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await fetch(
        `https://mohaddesepkz.pythonanywhere.com/cities/`
      );
      return response.json();
    },
    refetchOnMount: false,
  });

  const dataservise = useQuery({
    queryKey: ["servise"],
    queryFn: () =>
      fetch(`https://mohaddesepkz.pythonanywhere.com/options/packages/`).then(
        (res) => res.json()
      ),
    refetchOnMount: false,
  });

  return { datacity, dataservise };
};

export default useCity_servise;
