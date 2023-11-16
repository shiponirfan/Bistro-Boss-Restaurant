import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCarts = () => {
  const axios = useAxiosSecure();
  const {user} = useAuth();

  const {refetch, data: carts = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/v1/carts?email=${user.email}`);
      return res.data;
    },
  });

  return [carts, refetch];
};

export default useCarts;
