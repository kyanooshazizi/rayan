import { useQuery } from "@tanstack/react-query";
const Valuedefult = () => {
  const Valuedefult = useQuery({
    queryKey: ["Valuedefult"],
    queryFn: () =>
      fetch(
        `https://mohaddesepkz.pythonanywhere.com/options/content/value/`
      ).then((res) => res.json()),
    refetchOnMount: false,
  });
  return Valuedefult;
};

export default Valuedefult;
