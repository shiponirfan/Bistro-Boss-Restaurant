import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      console.log(result);
      const userInformation = {
        userName: result.user.displayName,
        userEmail: result.user.email,
      };
      axiosPublic.post("/users", userInformation).then((res) => {
        console.log(res.data);
        Swal.fire("Login Success");
        navigate(from, { replace: true });
      });
    });
  };
  return (
    <div>
      <div className="divider"></div>
      <div>
        <button
          onClick={handleGoogleLogin}
          className="btn w-full bg-amber-500 text-white hover:bg-amber-600"
        >
          <FaGoogle />
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
