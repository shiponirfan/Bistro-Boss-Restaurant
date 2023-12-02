import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();

  const { data: menu = [], isPending: menuLoading, refetch } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/food-menu");
      return res.data;
    },
  });

  return [menu, menuLoading, refetch];
};

export default useMenu;
