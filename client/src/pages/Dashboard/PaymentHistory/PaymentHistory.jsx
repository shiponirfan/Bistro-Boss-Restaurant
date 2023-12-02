import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  return (
    <div className="mt-10">
      <SectionTitle heading={"PAYMENT HISTORY"} subHeading={"At a Glance!"} />
      <div className="bg-white p-14 shadow-lg mx-44 my-14">
        <div className="flex justify-evenly pb-8">
          <h1 className="text-4xl font-bold">
            Total Orders: {paymentHistory.length}
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-[#D1A054] text-lg text-white">
                <th>EMAIL</th>
                <th>CATEGORY</th>
                <th>TOTAL PRICE</th>
                <th>PAYMENT DATE</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((item) => (
                <tr key={item._id} className="text-lg font-bold">
                  <th>
                    <h2>{item.email}</h2>
                  </th>
                  <td>
                    <h2>{item.status}</h2>
                  </td>
                  <td>
                    <h2>{item.price}</h2>
                  </td>
                  <th>
                    <h2>{item.date}</h2>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
